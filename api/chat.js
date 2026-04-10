const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'phi3:latest';
const TIMEOUT_MS = 28_000; // stay under serverless limits

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { question, message, prompt, materials, lang } = req.body || {};
  const input =
    [question, message, prompt].find((v) => typeof v === 'string' && v.trim()) || '';

  if (!input) {
    return res.status(400).json({ error: 'question/message/prompt is required' });
  }

  // Keep input bounded for predictable latency and payload size in serverless mode.
  const trimmedMessage = input.trim().slice(0, 2000);
  const langHint =
    typeof lang === 'string' && lang.trim()
      ? `Answer in language "${lang.trim()}". `
      : '';
  const materialsText = Array.isArray(materials)
    ? materials
        .filter((item) => typeof item === 'string' && item.trim())
        .slice(0, 10)
        .join('\n')
    : '';
  const fullPrompt = materialsText
    ? `${langHint}Контекст:\n${materialsText}\n\nВопрос:\n${trimmedMessage}`
    : `${langHint}${trimmedMessage}`;

  const ollamaUrl = `${OLLAMA_BASE_URL.replace(/\/$/, '')}/api/generate`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const ollamaRes = await fetch(ollamaUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: fullPrompt,
        // Non-streaming response keeps serverless response handling simple and stable.
        stream: false,
      }),
    });

    clearTimeout(timeoutId);

    if (!ollamaRes.ok) {
      const errText = await ollamaRes.text();
      console.error('Ollama API error:', ollamaRes.status, errText);
      return res.status(502).json({ error: 'Upstream Ollama API error' });
    }

    const data = await ollamaRes.json();
    const answer =
      data?.response ||
      data?.message?.content ||
      data?.message ||
      data?.content ||
      '';

    if (typeof answer !== 'string' || !answer.trim()) {
      return res.status(502).json({ error: 'Empty response from Ollama' });
    }

    return res.status(200).json({
      ok: true,
      answer: answer.trim(),
      response: answer.trim(),
      message: answer.trim(),
      content: answer.trim(),
    });
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      console.error('api/chat: request timed out');
      return res.status(504).json({ error: 'Request timed out. Please try again.' });
    }
    console.error('api/chat error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

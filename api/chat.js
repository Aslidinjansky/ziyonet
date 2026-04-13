const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';
const TIMEOUT_MS = 28_000; // stay under serverless limits

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!GEMINI_API_KEY) {
    return res.status(503).json({ error: 'GEMINI_API_KEY is not configured on server' });
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
        // Limit context items to keep prompt size bounded.
        .slice(0, 10)
        .join('\n')
    : '';
  const fullPrompt = materialsText
    ? `${langHint}Контекст:\n${materialsText}\n\nВопрос:\n${trimmedMessage}`
    : `${langHint}${trimmedMessage}`;

  const geminiUrl = `${GEMINI_API_BASE}/models/${encodeURIComponent(
    GEMINI_MODEL,
  )}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: fullPrompt }],
          },
        ],
      }),
    });

    clearTimeout(timeoutId);

    if (!geminiRes.ok) {
      let upstreamMessage = '';
      try {
        const errData = await geminiRes.json();
        upstreamMessage = errData?.error?.message || '';
      } catch {
        upstreamMessage = await geminiRes.text();
      }
      const status = geminiRes.status >= 400 && geminiRes.status < 500 ? geminiRes.status : 502;
      return res
        .status(status)
        .json({ error: upstreamMessage || `Gemini request failed (HTTP ${geminiRes.status})` });
    }

    const data = await geminiRes.json();
    const parts = data?.candidates?.[0]?.content?.parts;
    const answer =
      (Array.isArray(parts)
        ? parts
            .map((part) => (typeof part?.text === 'string' ? part.text : ''))
            .join('')
            .trim()
        : '') ||
      data?.response ||
      data?.message?.content ||
      data?.message ||
      data?.content ||
      '';

    if (typeof answer !== 'string' || !answer.trim()) {
      return res.status(502).json({ error: 'Empty response from Gemini' });
    }
    const normalizedAnswer = answer.trim();

    return res.status(200).json({
      ok: true,
      answer: normalizedAnswer,
      response: normalizedAnswer,
      message: normalizedAnswer,
      content: normalizedAnswer,
    });
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      return res.status(504).json({ error: 'Request timed out. Please try again.' });
    }
    return res.status(500).json({ error: 'Failed to connect to Gemini API' });
  }
}

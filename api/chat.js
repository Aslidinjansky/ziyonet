/**
 * api/chat.js – Gemini proxy (Vercel/Node serverless function)
 *
 * POST /api/chat
 * Body: { message: string }
 * Response: { reply: string }
 *
 * Free-tier model: gemini-1.5-flash
 *   • 15 requests/min, 1 000 000 tokens/min, 1 500 requests/day (as of 2024)
 *   • Get a key at https://aistudio.google.com/app/apikey
 */

const GEMINI_MODEL = 'gemini-1.5-flash';
const GEMINI_API_BASE =
  'https://generativelanguage.googleapis.com/v1beta/models';
const TIMEOUT_MS = 28_000; // stay well under Vercel's 30 s function limit

/** Concise system context to keep token usage low */
const SYSTEM_INSTRUCTION =
  'Ты — AI-ассистент образовательной платформы ZIYONET. ' +
  'Отвечай кратко, по существу, на русском или таджикском языке — ' +
  'в зависимости от языка вопроса. Не выходи за рамки учебной тематики.';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is not configured on the server.',
      setup:
        'Get a free key at https://aistudio.google.com/app/apikey and add ' +
        'GEMINI_API_KEY=<your-key> to your .env file.',
    });
  }

  const { message } = req.body || {};
  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'message is required' });
  }

  // Trim to avoid oversized payloads (free-tier rate limits)
  const trimmedMessage = message.trim().slice(0, 1000);

  const geminiUrl = `${GEMINI_API_BASE}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        contents: [{ parts: [{ text: trimmedMessage }] }],
        generationConfig: {
          maxOutputTokens: 512,
          temperature: 0.7,
        },
      }),
    });

    clearTimeout(timeoutId);

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('Gemini API error:', geminiRes.status, errText);
      if (geminiRes.status === 429) {
        return res.status(429).json({ error: 'Rate limit reached. Try again in a moment.' });
      }
      return res.status(502).json({ error: 'Upstream Gemini API error' });
    }

    const data = await geminiRes.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    return res.status(200).json({ reply });
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

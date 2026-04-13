import { useState } from 'react';
import { useLang } from '../context/LangContext';

const CLIENT_TIMEOUT_MS = 30_000;

function useGemini() {
  const { t, lang } = useLang();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasKey = Boolean(import.meta.env.VITE_GEMINI_API_KEY);

  const sendMessage = async (question, materials = []) => {
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          question,
          message: question,
          prompt: question,
          materials,
          lang,
        }),
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        let backendError = '';
        try {
          const errData = await res.json();
          backendError = errData?.error || '';
        } catch {
          backendError = (await res.text()) || '';
        }
        throw new Error(backendError || `${t.chat.error} (HTTP ${res.status})`);
      }

      const data = await res.json();
      const text =
        data?.answer ||
        data?.response ||
        data?.message?.content ||
        data?.message ||
        data?.content ||
        '';
      if (typeof text !== 'string' || !text.trim()) {
        throw new Error(t.chat.errorEmptyResponse || t.chat.error);
      }
      return text.trim();
    } catch (err) {
      clearTimeout(timeoutId);
      const message =
        err?.name === 'AbortError'
          ? t.chat.errorTimeout
          : err?.message || t.chat.error;
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error, hasKey };
}

export default useGemini;

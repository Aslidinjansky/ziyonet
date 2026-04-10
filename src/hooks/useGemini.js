import { useState } from 'react';
import { useLang } from '../context/LangContext';

const CLIENT_TIMEOUT_MS = 30_000;

function useGemini() {
  const { t, lang } = useLang();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasKey, setHasKey] = useState(true); // assume available until server says otherwise

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
          // Keep both aliases for compatibility with existing and migrated backends.
          message: question,
          materials,
          lang,
        }),
      });

      clearTimeout(timeoutId);

      if (res.status === 503) {
        setHasKey(false);
      }
      if (!res.ok) {
        let backendError = '';
        try {
          const errData = await res.json();
          backendError = errData?.error || '';
        } catch {
          backendError = '';
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
      if (err.name === 'AbortError') {
        setError(t.chat.errorTimeout);
      } else {
        setError(err.message || t.chat.error);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error, hasKey };
}

export default useGemini;

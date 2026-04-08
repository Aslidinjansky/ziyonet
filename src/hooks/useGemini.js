import { useState } from 'react';
import { useLang } from '../context/LangContext';

const CLIENT_TIMEOUT_MS = 30_000;

function useGemini() {
  const { t } = useLang();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasKey, setHasKey] = useState(true); // assume available until server says otherwise

  const sendMessage = async (message) => {
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ message }),
      });

      clearTimeout(timeoutId);

      if (res.status === 503) {
        setHasKey(false);
        return null;
      }
      if (res.status === 429) {
        setError(t.chat.errorRateLimit);
        return null;
      }
      if (res.status === 504) {
        setError(t.chat.errorTimeout);
        return null;
      }
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      return data.reply ?? '';
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        setError(t.chat.errorTimeout);
      } else {
        setError(t.chat.error);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error, hasKey };
}

export default useGemini;

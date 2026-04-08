import { useState } from 'react';

function useGemini() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasKey, setHasKey] = useState(true); // assume available until the server says otherwise

  const sendMessage = async (message) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      if (res.status === 503) {
        // Server reported that GEMINI_API_KEY is not configured
        setHasKey(false);
        return null;
      }
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      return data.reply ?? '';
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error, hasKey };
}

export default useGemini;

import { useState } from 'react';
import { useLang } from '../context/LangContext';
import useGemini from '../hooks/useGemini';

function ChatPage() {
  const { t } = useLang();
  const { sendMessage, loading, error, hasKey } = useGemini();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput('');
    setHistory((prev) => [...prev, { role: 'user', text }]);
    const reply = await sendMessage(text);
    if (reply != null) {
      setHistory((prev) => [...prev, { role: 'assistant', text: reply }]);
    } else if (hasKey) {
      setHistory((prev) => [
        ...prev,
        { role: 'assistant', text: t.chat.error },
      ]);
    }
  };

  return (
    <main className="chat-page">
      <h1>{t.chat.title}</h1>
      {!hasKey && (
        <div className="chat-page__no-key">⚠️ {t.chat.noKey}</div>
      )}
      <div className="chat-page__history">
        {history.map((msg, i) => (
          <div key={i} className={`chat-page__msg chat-page__msg--${msg.role}`}>
            <span className="chat-page__msg-label">
              {msg.role === 'user' ? '👤' : '🤖'}
            </span>
            <span>{msg.text}</span>
          </div>
        ))}
        {loading && (
          <div className="chat-page__msg chat-page__msg--assistant">
            <span className="chat-page__msg-label">🤖</span>
            <span>{t.chat.thinking}</span>
          </div>
        )}
        {error && !loading && (
          <div className="chat-page__error">{error}</div>
        )}
      </div>
      <form className="chat-page__form" onSubmit={handleSend}>
        <input
          className="chat-page__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.chat.placeholder}
          disabled={loading || !hasKey}
        />
        <button type="submit" disabled={loading || !hasKey}>
          {t.chat.send}
        </button>
      </form>
    </main>
  );
}

export default ChatPage;

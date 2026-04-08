import { useState, useRef, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import useGemini from '../hooks/useGemini';

function ChatPage() {
  const { t } = useLang();
  const { sendMessage, loading, error, hasKey } = useGemini();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const historyEndRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, loading]);

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
      {/* Header */}
      <div className="chat-header">
        <div className="chat-header__icon">🤖</div>
        <div className="chat-header__info">
          <h1>{t.chat.title}</h1>
          <p>{t.chat.subtitle}</p>
        </div>
      </div>

      {/* No-key warning */}
      {!hasKey && (
        <div className="chat-no-key">
          <div className="chat-no-key__icon">🔑</div>
          <div className="chat-no-key__body">
            <strong>{t.chat.noKeyTitle}</strong>
            <p>{t.chat.noKey}</p>
            <ol className="chat-no-key__steps">
              <li>{t.chat.noKeyStep1} <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="chat-no-key__link">Google AI Studio →</a></li>
              <li>{t.chat.noKeyStep2}</li>
              <li>{t.chat.noKeyStep3}</li>
            </ol>
          </div>
        </div>
      )}

      {/* Message history */}
      <div className="chat-history">
        {history.length === 0 && !loading && (
          <div className="chat-history__empty">
            <div className="chat-history__empty-icon">💬</div>
            <p className="chat-history__empty-text">{t.chat.emptyHint}</p>
          </div>
        )}

        {history.map((msg, i) => (
          <div key={i} className={`chat-msg chat-msg--${msg.role}`}>
            <div className="chat-msg__avatar">
              {msg.role === 'user' ? '👤' : '🤖'}
            </div>
            <div className="chat-msg__bubble">{msg.text}</div>
          </div>
        ))}

        {loading && (
          <div className="chat-typing">
            <div className="chat-typing__avatar">🤖</div>
            <div className="chat-typing__bubble">
              <span className="chat-typing__dot" />
              <span className="chat-typing__dot" />
              <span className="chat-typing__dot" />
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="chat-error-msg">⚠️ {error}</div>
        )}

        <div ref={historyEndRef} />
      </div>

      {/* Input form */}
      <form className="chat-form" onSubmit={handleSend}>
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={hasKey ? t.chat.placeholder : t.chat.placeholderDisabled}
          disabled={loading || !hasKey}
          autoComplete="off"
        />
        <button
          type="submit"
          className="chat-send-btn"
          disabled={loading || !hasKey || !input}
        >
          {loading ? '⏳' : '➤'} {t.chat.send}
        </button>
      </form>
    </main>
  );
}

export default ChatPage;

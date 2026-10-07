import React, { useState } from 'react';
import { MapPin, RefreshCcw, X, ThumbsUp, ThumbsDown, SendHorizontal, ChevronDown } from 'lucide-react';

export default function ChatbotModal({
  isOpen,
  onClose,
  selectedCity = 'Bangalore',
  onOpenCityModal,
  onOpenLoginModal
}) {
  if (!isOpen) return null;

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      name: 'Rocket Singh',
      text: 'Hi Pal 👋\nI’m Rocket Singh. How can I help you today?',
      quickPicks: [
        'I want to place a new order',
        'I need help with an existing order',
        'Something else'
      ],
      time: '12:45 AM'
    }
  ]);

  const [inputVal, setInputVal] = useState('');

  const handleReset = () => {
    setMessages([
      {
        id: 1,
        sender: 'bot',
        name: 'Rocket Singh',
        text: 'Hi Pal 👋\nI’m Rocket Singh. How can I help you today?',
        quickPicks: [
          'I want to place a new order',
          'I need help with an existing order',
          'Something else'
        ],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleQuickPick = (pick) => {
    // If user clicks quick pick
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'user', text: pick, time: now },
      {
        id: Date.now() + 1,
        sender: 'bot',
        name: 'Rocket Singh',
        text: 'Please login or provide your WhatsApp number so our gear specialist can help you directly!',
        time: now
      }
    ]);
  };

  return (
    <div className="sp-chatbot-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="sp-chatbot-container" onClick={(e) => e.stopPropagation()}>
        {/* 1. Header (Deep Brand Blue with Logo, Online Status, City, Reset, Close) */}
        <div className="sp-chatbot-header">
          <div className="sp-chatbot-brand">
            <div className="sp-chatbot-logo">
              {/* White "Share" + Neon Lime "Pal" SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="76" height="24" fill="#fff" viewBox="0 0 86 27">
                <path
                  fill="#FFFFFF"
                  fillRule="evenodd"
                  d="M2.3 18.159h5.787c.173 1.14 1.544 1.962 3.262 1.962 1.775 0 2.886-.707 2.886-1.746 0-.765-.39-1.212-2.352-1.818l-2.18-.664c-3.478-1.054-5.325-2.93-5.325-5.773 0-4.243 3.666-7.014 8.717-7.014 5.368 0 8.644 2.454 8.673 6.581h-5.585c-.043-1.241-1.212-2.064-2.944-2.064-1.602 0-2.64.722-2.64 1.703 0 .837.576 1.415 2.25 1.905l2.28.664c3.738 1.082 5.355 2.641 5.355 5.643 0 4.387-3.753 7.115-9.251 7.115-5.614 0-8.919-2.381-8.933-6.494m17.816 6.133 4.43-20.825h5.687L28.66 10.77h.115c1.184-1.732 2.973-2.728 5.181-2.728 2.916 0 4.85 1.775 4.85 4.416a9.7 9.7 0 0 1-.217 1.948l-2.078 9.886h-5.672l1.89-9.005c.073-.376.102-.679.102-.982 0-1.097-.91-1.905-2.165-1.905-1.371 0-2.555 1.04-2.872 2.54l-1.977 9.352zm28.73 0h5.714l3.392-15.933h-5.585l-.549 2.57h-.274c-.505-1.704-2.294-2.8-4.59-2.8-4.574 0-7.965 4.416-7.965 10.347 0 3.738 2.034 6.047 5.31 6.047 2.006 0 3.594-.823 4.763-2.482h.26zm1.702-8.948c0 2.57-1.587 4.835-3.406 4.835-1.342 0-2.236-1.068-2.236-2.684 0-2.7 1.53-4.878 3.434-4.878 1.342 0 2.208 1.068 2.208 2.727m5.056 8.948 3.42-15.933h5.586l-.462 2.31h.115c.722-1.487 2.136-2.54 3.854-2.54.909 0 1.558.13 2.193.418l-1.082 4.95c-.736-.346-1.429-.592-2.396-.592-1.89 0-3.261 1.054-3.738 3.248l-1.76 8.139zm13.466-6.898c0 4.589 2.973 7.288 7.533 7.288 3.037 0 5.725-1.882 7.18-4.844-6.297.382-9.34-2.32-9.34-2.32s5.225.941 10.253-.404q.123-.617.182-1.267c.47-5.161-2.502-7.892-6.774-7.892-5.426 0-9.034 3.983-9.034 9.439m5.657-2.944h5.397c.03-.073.044-.303.044-.462 0-1.213-.953-2.078-2.324-2.078-1.486 0-2.742 1.024-3.117 2.54"
                  clipRule="evenodd"
                />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="46" height="24" viewBox="0 0 51 27" fill="#9EFF00">
                <path
                  fill="#9EFF00"
                  fillRule="evenodd"
                  d="M4.786 3.106h8.14c5.075 0 7.917 2.679 7.917 6.682 0 5.477-3.84 8.93-10 8.93H7.791l-1.25 5.863H.247l1.07-5.06c6.5-1.309 10.317-6.29 10.317-6.29l2.168 1.84 1.601-8.78-8.404 3.004 2.04 1.731s-2.377 3.315-7.047 5.296zm31.4 21.475h-5.892l.49-2.322h-.267c-1.206 1.712-2.843 2.56-4.911 2.56-3.378 0-5.477-2.381-5.477-6.236 0-6.116 3.498-10.67 8.215-10.67 2.366 0 4.212 1.131 4.733 2.887h.282l.566-2.649h5.76zm-7.648-4.242c1.875 0 3.512-2.336 3.512-4.985 0-1.711-.893-2.813-2.277-2.813-1.965 0-3.542 2.248-3.542 5.03 0 1.667.923 2.768 2.307 2.768M42.825 3.106l-4.569 21.475h5.893l4.57-21.475z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="sp-chatbot-status">
              <span className="sp-chatbot-status-dot"></span>
              <span>Online</span>
            </div>
          </div>

          <div className="sp-chatbot-actions">
            {/* City Selector */}
            <button
              type="button"
              className="sp-chatbot-city-btn"
              onClick={onOpenCityModal}
              title="Change City"
            >
              <MapPin size={14} />
              <span>{selectedCity}</span>
              <ChevronDown size={13} />
            </button>

            {/* Reload / Clear Session */}
            <button
              type="button"
              className="sp-chatbot-icon-btn"
              onClick={handleReset}
              title="New chat, clears history"
              aria-label="Refresh Chat"
            >
              <RefreshCcw size={15} />
            </button>

            {/* Close Chatbot */}
            <button
              type="button"
              className="sp-chatbot-icon-btn"
              onClick={onClose}
              title="Close chat"
              aria-label="Close Chat"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* 2. Login Alert Notice Banner */}
        <div className="sp-chatbot-notice-bar">
          <span>Please login to continue chatting.</span>
          <button
            type="button"
            className="sp-chatbot-notice-login-btn"
            onClick={onOpenLoginModal}
          >
            Login
          </button>
        </div>

        {/* 3. Messages Chat Area */}
        <div className="sp-chatbot-messages-area">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`sp-chatbot-msg-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}
            >
              {msg.sender === 'bot' ? (
                <div className="sp-chatbot-bot-card">
                  {/* Speech Bubble Arrow */}
                  <span className="sp-chatbot-bubble-tail"></span>

                  <div className="sp-chatbot-bubble-content">
                    <p className="sp-chatbot-lead">Hi Pal 👋</p>
                    <p className="sp-chatbot-body-text">
                      I’m Rocket Singh. How can I help you today?
                    </p>
                  </div>

                  {/* Quick Picks Buttons */}
                  {msg.quickPicks && (
                    <div className="sp-chatbot-quickpicks-wrap">
                      <span className="sp-chatbot-qp-heading">Quick picks</span>
                      <div className="sp-chatbot-qp-list">
                        {msg.quickPicks.map((pick, i) => (
                          <button
                            key={i}
                            type="button"
                            className="sp-chatbot-qp-btn"
                            onClick={() => handleQuickPick(pick)}
                          >
                            {pick}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Timestamp & Feedback Actions */}
                  <div className="sp-chatbot-msg-footer">
                    <span className="sp-chatbot-time">{msg.time}</span>
                    <div className="sp-chatbot-feedback">
                      <button type="button" className="sp-chatbot-fb-btn" aria-label="Thumbs Up">
                        <ThumbsUp size={13} />
                      </button>
                      <button type="button" className="sp-chatbot-fb-btn" aria-label="Thumbs Down">
                        <ThumbsDown size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="sp-chatbot-user-card">
                  <p className="sp-chatbot-user-text">{msg.text}</p>
                  <span className="sp-chatbot-user-time">{msg.time}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 4. Bottom Input Bar */}
        <div className="sp-chatbot-input-bar">
          <input
            type="text"
            className="sp-chatbot-input-field"
            placeholder="Login required to use chatbot"
            disabled
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <button
            type="button"
            className="sp-chatbot-send-btn"
            disabled
            aria-label="Send Message"
          >
            <SendHorizontal size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

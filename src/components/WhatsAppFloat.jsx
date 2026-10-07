import React from 'react';

export default function WhatsAppFloat() {
  const handleClick = () => {
    window.open(
      'https://api.whatsapp.com/send?phone=+917619220543&text=Hi%20SharePal,%20I%20have%20a%20query%20regarding%20renting%20gaming%20gadgets',
      '_blank'
    );
  };

  return (
    <div
      className="sp-chat-float-wrapper"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      title="Chat with Us on WhatsApp"
      aria-label="Chat Support"
    >
      {/* Optional Hover Badge */}
      <div className="sp-chat-tooltip">Chat with Us</div>

      {/* Official SharePal Floating Dual Chat Bubbles SVG */}
      <svg
        className="sp-chat-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        width="100%"
        height="100%"
      >
        <defs>
          <filter id="spChatShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#0F172A" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* 1. Green Chat Bubble (Back Left) */}
        <g className="sp-bubble-green" transform="translate(195, 185) scale(1.05)" filter="url(#spChatShadow)">
          <path
            fill="#9DFF00"
            d="M-64.811,87.93 C-61.463,86.698 -57.744,86.993 -54.632,88.737 C-37.995,98.235 -19.155,103.196 0.002,103.123 C59.238,103.123 107.285,56.976 107.285,0 C107.285,-56.976 59.238,-103.124 0.002,-103.124 C-59.234,-103.124 -107.285,-56.98 -107.285,0 C-107.303,16.958 -102.987,33.638 -94.747,48.459 C-93.016,51.487 -92.592,55.089 -93.574,58.436 L-104.771,94.929 C-105.468,97.198 -104.194,99.601 -101.925,100.298 C-101.039,100.57 -100.088,100.548 -99.215,100.236 L-64.811,87.93 Z"
          />
        </g>

        {/* 2. Blue Chat Bubble (Front Right) with 3 Animated Dots */}
        <g className="sp-bubble-blue" transform="translate(295, 290) scale(1.15)" filter="url(#spChatShadow)">
          <path
            fill="#1845E7"
            d="M64.8,87.773 C61.457,86.548 57.746,86.843 54.638,88.581 C37.995,98.066 19.156,103.018 0,102.945 C-59.24,102.945 -107.287,56.879 -107.287,0.002 C-107.287,-56.875 -59.24,-102.946 0,-102.946 C59.24,-102.946 107.287,-56.896 107.287,0.002 C107.303,16.932 102.988,33.583 94.753,48.375 C93.017,51.404 92.592,55.011 93.576,58.361 L104.748,94.764 C105.444,97.033 104.168,99.435 101.899,100.131 C101.015,100.402 100.067,100.381 99.196,100.07 L64.8,87.773 Z"
          />

          {/* 3 Animated Typing Indicator Dots */}
          <circle className="sp-chat-dot sp-dot-1" cx="-45" cy="0" r="16" fill="#FFFFFF" />
          <circle className="sp-chat-dot sp-dot-2" cx="0" cy="0" r="16" fill="#FFFFFF" />
          <circle className="sp-chat-dot sp-dot-3" cx="45" cy="0" r="16" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
}

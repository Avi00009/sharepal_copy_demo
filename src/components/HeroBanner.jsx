import React from 'react';

export default function HeroBanner() {
  return (
    <div className="sp-hero-banner-container">
      <section className="sp-hero-banner" aria-label="Gaming Consoles Hero">
        {/* Left Text Content */}
        <div className="sp-hero-content">
          <h1 className="sp-hero-title">Gaming Consoles</h1>

          <p className="sp-hero-subtitle">
            Rent the latest gaming gadgets from <span style={{ fontStyle: 'italic', fontWeight: 800 }}>SharePal</span> PS5, Xbox, Oculus VR, Racing Wheel on rent.
          </p>

          <div className="sp-hero-platforms">
            {/* Xbox */}
            <div className="sp-platform-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.84 15.65c-1.07.6-2.43.95-3.84.95-1.41 0-2.77-.35-3.84-.95-.36-.2-.68-.45-.96-.73 1.34-1.35 3.01-2.22 4.8-2.22s3.46.87 4.8 2.22c-.28.28-.6.53-.96.73zm3.11-3.23c-.7-1.12-2.31-2.29-4.22-3.15.54-.48 1.15-1.15 1.77-2.06 1.48 1.36 2.37 3.2 2.45 5.21zm-13.9 0c.08-2.01.97-3.85 2.45-5.21.62.91 1.23 1.58 1.77 2.06-1.91.86-3.52 2.03-4.22 3.15z"/>
              </svg>
              <span>XBOX</span>
            </div>

            {/* PlayStation */}
            <div className="sp-platform-badge">
              <svg width="18" height="15" viewBox="0 0 24 20" fill="currentColor">
                <path d="M8.7 15.7c.3.2.7.3 1.2.3.8 0 1.5-.4 1.5-1.2 0-.8-.5-1.1-1.3-1.4l-.7-.3c-1.4-.5-2.2-1.3-2.2-2.7 0-1.7 1.4-2.8 3.3-2.8 1.1 0 2 .3 2.6.7l-.6 1.4c-.5-.3-1.1-.6-1.9-.6-.9 0-1.6.4-1.6 1.2 0 .7.5 1.1 1.4 1.4l.7.3c1.5.5 2.2 1.4 2.2 2.8 0 1.9-1.5 2.9-3.4 2.9-1.2 0-2.3-.4-3-.9l.7-1.5zm11.2-5.3h-4.3v10h-2V7.6h6.3v2.8z"/>
              </svg>
              <span>PS5</span>
            </div>

            {/* Meta */}
            <div className="sp-platform-badge">
              <svg width="17" height="15" viewBox="0 0 24 20" fill="currentColor">
                <path d="M12 4.5C7.3 4.5 3.5 7.9 3.5 12c0 2.4 1.3 4.5 3.3 5.8l-.8 1.7c-2.5-1.6-4.2-4.4-4.2-7.5C1.8 6.8 6.4 2.5 12 2.5s10.2 4.3 10.2 9.5c0 3.1-1.7 5.9-4.2 7.5l-.8-1.7c2-1.3 3.3-3.4 3.3-5.8 0-4.1-3.8-7.5-8.5-7.5z"/>
              </svg>
              <span>Meta</span>
            </div>
          </div>
        </div>

        {/* Right Decorative Collage */}
        <div className="sp-hero-graphic-wrap">
          <img
            src="https://images.sharepal.in/super-categories/gaming-right.webp"
            alt="Gaming Gadgets and Consoles"
            className="sp-hero-graphic-img"
          />
        </div>
      </section>
    </div>
  );
}

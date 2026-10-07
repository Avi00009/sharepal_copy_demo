import React from 'react';
import { ShieldCheck, Truck, Gamepad2, Sparkles } from 'lucide-react';

export default function HeroBanner({ selectedCity = 'Bangalore' }) {
  return (
    <div className="sp-container">
      <section className="sp-hero-banner" aria-label="Gaming Consoles Hero">
        {/* Left Decorative Image */}
        <img
          src="https://images.sharepal.in/super-categories/gaming-left.webp"
          alt=""
          className="sp-hero-decor-left"
          aria-hidden="true"
        />

        {/* Right Decorative Image */}
        <img
          src="https://images.sharepal.in/super-categories/gaming-right.webp"
          alt=""
          className="sp-hero-decor-right"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="sp-hero-content">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(158, 255, 0, 0.15)', color: '#9EFF00', padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.75rem', border: '1px solid rgba(158, 255, 0, 0.3)' }}>
            <Sparkles size={14} />
            <span>TOP RATED RENTALS IN {selectedCity.toUpperCase()}</span>
          </div>

          <h1 className="sp-hero-title">Gaming Consoles</h1>

          <h2 className="sp-hero-subtitle" style={{ fontWeight: 400, fontSize: '1rem' }}>
            Rent the latest gaming gadgets from PS5, Xbox, Oculus VR, Racing Wheel on rent.
          </h2>

          <div className="sp-hero-badges">
            <span className="sp-hero-pill">
              <ShieldCheck size={14} color="#9EFF00" />
              <span>Zero Security Deposit</span>
            </span>
            <span className="sp-hero-pill">
              <Truck size={14} color="#9EFF00" />
              <span>Free Doorstep Delivery</span>
            </span>
            <span className="sp-hero-pill">
              <Gamepad2 size={14} color="#9EFF00" />
              <span>100+ Games Included</span>
            </span>
            <span className="sp-hero-pill">
              <Sparkles size={14} color="#9EFF00" />
              <span>100% Sanitized & Tested</span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

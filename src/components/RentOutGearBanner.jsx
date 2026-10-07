import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function RentOutGearBanner() {
  return (
    <div className="sp-rent-out-banner" role="region" aria-label="Rent Out Your Gear">
      {/* Background Graphic Accents */}
      <div className="sp-rent-out-bg-glow" />

      {/* Left Gear Collage Images */}
      <div className="sp-rent-out-gears left">
        <img
          src="https://images.sharepal.in/categories/cameras/drones/dji-mini-3-pro/dji-mini-3-pro-drone-on-rent-sharepal-1.webp"
          alt="DJI Drone"
          className="sp-gear-float-img drone"
          loading="lazy"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <img
          src="https://images.sharepal.in/categories/gaming-consoles/gaming-accessories/logitech-G29-driving-force-racing-wheel/logitech-g29-racing-wheel-on-rent-sharepal-1.webp"
          alt="Racing Wheel"
          className="sp-gear-float-img wheel"
          loading="lazy"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* Center Copy & Action */}
      <div className="sp-rent-out-content">
        <span className="sp-rent-out-sub">
          Got gear you <span className="sp-underline-wavy">dont use anymore?</span>
        </span>
        <h2 className="sp-rent-out-title">
          Rent Out Your Gear on SharePal
        </h2>
        <a
          href="https://sharepal.in/lend"
          target="_blank"
          rel="noopener noreferrer"
          className="sp-rent-out-btn"
        >
          <span>Lend With Us</span>
          <ArrowUpRight size={16} strokeWidth={2.5} />
        </a>
      </div>

      {/* Right Gear Collage Images */}
      <div className="sp-rent-out-gears right">
        <img
          src="https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-controller/ps5-dualsense-wireless-controller-white-on-rent-sharepal-1.webp"
          alt="PS5 Controller"
          className="sp-gear-float-img controller"
          loading="lazy"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <img
          src="https://images.sharepal.in/categories/cameras/dslr-cameras/canon-eos-200d-ii/canon-eos-200d-ii-dslr-camera-on-rent-sharepal-1.webp"
          alt="DSLR Camera"
          className="sp-gear-float-img camera"
          loading="lazy"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>
    </div>
  );
}

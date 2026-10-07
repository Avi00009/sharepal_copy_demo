import React from 'react';
import { ArrowRight, Globe2, Wallet, Mouse } from 'lucide-react';

export default function SharePalHomeHero({ activeCategory, onSelectCategory }) {
  const scrollToContent = () => {
    const el = document.getElementById('sp-catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 850, behavior: 'smooth' });
    }
  };

  return (
    <section className="sp-home-hero-section" aria-label="SharePal Homepage Hero">
      {/* 1. Concentric Radial Wave Rings SVG Background */}
      <div className="sp-hero-ripple-bg" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 888"
          fill="none"
          className="sp-ripple-svg"
        >
          <defs>
            <radialGradient
              id="ripple_gradient"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(720 444) rotate(90) scale(444 720)"
            >
              <stop stopColor="#8A2BE2" stopOpacity="0.22" />
              <stop offset="0.5" stopColor="#4C187C" stopOpacity="0.12" />
              <stop offset="1" stopColor="#E2E8F0" stopOpacity="0.02" />
            </radialGradient>
          </defs>
          {/* Concentric expanding wave circles */}
          {[120, 200, 290, 390, 500, 620, 750, 890, 1040].map((radius, idx) => (
            <circle
              key={idx}
              cx="720"
              cy="380"
              r={radius}
              stroke="url(#ripple_gradient)"
              strokeWidth={idx % 2 === 0 ? "2.5" : "1.5"}
              strokeDasharray={idx > 4 ? "6 6" : "none"}
              className="sp-ripple-circle"
              style={{ animationDelay: `${idx * 0.4}s` }}
            />
          ))}
        </svg>
      </div>

      {/* 2. Floating 3D Gear Items around Hero */}
      <div className="sp-floating-gears-layer" aria-hidden="true">
        {/* Floating Item 1: GoPro Action Camera (Top-Left) */}
        <div className="sp-floating-item item-gopro">
          <img
            src="https://images.sharepal.in/super-categories/camera-left.webp"
            alt="GoPro Action Camera"
            className="sp-float-img"
          />
        </div>

        {/* Floating Item 2: PSVR2 / VR Headset (Top-Center) */}
        <div className="sp-floating-item item-vr">
          <img
            src="https://images.sharepal.in/super-categories/gaming-right.webp"
            alt="VR Gaming Headset"
            className="sp-float-img"
          />
        </div>

        {/* Floating Item 3: Professional DSLR Camera (Top-Right) */}
        <div className="sp-floating-item item-dslr">
          <img
            src="https://images.sharepal.in/super-categories/camera-right.webp"
            alt="DSLR Camera"
            className="sp-float-img"
          />
        </div>

        {/* Floating Item 4: Trekking Backpack (Far-Left) */}
        <div className="sp-floating-item item-backpack">
          <img
            src="https://images.sharepal.in/super-categories/outdoor-left.webp"
            alt="Trekking Gear Backpack"
            className="sp-float-img"
          />
        </div>

        {/* Floating Item 5: PS5 Console (Center-Left) */}
        <div className="sp-floating-item item-ps5">
          <img
            src="https://images.sharepal.in/super-categories/gaming-left.webp"
            alt="PlayStation 5 Console"
            className="sp-float-img"
          />
        </div>

        {/* Floating Item 6: Camping Tent (Far-Right) */}
        <div className="sp-floating-item item-tent">
          <img
            src="https://images.sharepal.in/super-categories/outdoor-right.webp"
            alt="Camping Tent"
            className="sp-float-img"
          />
        </div>
      </div>

      {/* 3. Hero Center Content */}
      <div className="sp-container sp-home-hero-center">
        {/* Title */}
        <div className="sp-hero-headline-wrap">
          <h1 className="sp-hero-main-title">
            &ldquo;Own the{' '}
            <span className="sp-highlight-experience">
              Experience
              {/* Lime hand-drawn loop */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 337 74"
                fill="none"
                className="sp-lime-loop-svg"
              >
                <path
                  stroke="#9EFF00"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  d="M4 18c320-38 350 42 160 50C-40 76-2 18 4 18"
                />
              </svg>
            </span>
            <br />
            <span className="sp-rent-gear-wrap">
              Rent the Gear&rdquo;
              {/* Blue hand-drawn underline */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 160 18"
                fill="none"
                className="sp-blue-underline-svg"
              >
                <path
                  d="M4 12C45 4 105 14 156 8"
                  stroke="#1D4ED8"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Planet & Pocket Pills */}
          <div className="sp-hero-subtags">
            <div className="sp-subtag-pill">
              <Globe2 size={16} color="#059669" />
              <span>
                Good for our <strong style={{ color: '#4C187C' }}>Planet</strong>
              </span>
            </div>
            <span className="sp-subtag-divider" />
            <div className="sp-subtag-pill">
              <Wallet size={16} color="#2563EB" />
              <span>
                Good for your <strong style={{ color: '#4C187C' }}>Pocket</strong>
              </span>
            </div>
          </div>

          {/* New Launch Announcement Button */}
          <div>
            <button
              type="button"
              className="sp-hero-launch-btn"
              onClick={scrollToContent}
            >
              <span>New Launch - Luna &amp; Pocket 4 &amp; 4p</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* 4. Four Core Category Cards Grid */}
        <div className="sp-four-cards-grid">
          {/* Card 1: Photography */}
          <div
            className={`sp-category-hero-card card-photography ${activeCategory === 'photography' ? 'selected' : ''}`}
            onClick={() => onSelectCategory('photography')}
            role="button"
            tabIndex={0}
          >
            <div className="sp-card-text">
              <h3 className="sp-cat-card-title">Photography</h3>
              <p className="sp-cat-card-desc">
                Rent GoPro, Insta360 , DJI, DSLR Cameras &amp; more
              </p>
            </div>
            <div className="sp-cat-card-thumb">
              <img
                src="https://images.sharepal.in/super-categories/Category+Card+Image.webp"
                alt="Photography Cameras"
              />
            </div>
            <div className="sp-card-bottom-bar bar-orange" />
          </div>

          {/* Card 2: Gaming (Active) */}
          <div
            className={`sp-category-hero-card card-gaming ${activeCategory === 'gaming' ? 'selected' : ''}`}
            onClick={() => onSelectCategory('gaming')}
            role="button"
            tabIndex={0}
          >
            <div className="sp-card-text">
              <h3 className="sp-cat-card-title">Gaming</h3>
              <p className="sp-cat-card-desc">
                Rent PS5, Xbox, Racing Wheel &amp; more
              </p>
            </div>
            <div className="sp-cat-card-thumb">
              <img
                src="https://images.sharepal.in/super-categories/Category%20Card%20Image%20(1).webp"
                alt="Gaming Consoles"
              />
            </div>
            <div className="sp-card-bottom-bar bar-purple" />
          </div>

          {/* Card 3: Outdoor */}
          <div
            className={`sp-category-hero-card card-outdoor ${activeCategory === 'outdoor' ? 'selected' : ''}`}
            onClick={() => onSelectCategory('outdoor')}
            role="button"
            tabIndex={0}
          >
            <div className="sp-card-text">
              <h3 className="sp-cat-card-title">Outdoor</h3>
              <p className="sp-cat-card-desc">
                Rent Trekking Jacket, Riding Boots, Camping Tents &amp; more
              </p>
            </div>
            <div className="sp-cat-card-thumb">
              <img
                src="https://images.sharepal.in/super-categories/Category+Card+Image+(3).webp"
                alt="Outdoor Trekking Gear"
              />
            </div>
            <div className="sp-card-bottom-bar bar-green" />
          </div>

          {/* Card 4: Entertainment */}
          <div
            className={`sp-category-hero-card card-entertainment ${activeCategory === 'entertainment' ? 'selected' : ''}`}
            onClick={() => onSelectCategory('entertainment')}
            role="button"
            tabIndex={0}
          >
            <div className="sp-card-text">
              <h3 className="sp-cat-card-title">Entertainment</h3>
              <p className="sp-cat-card-desc">
                Rent Projectors, Speakers, VR, Mics &amp; more
              </p>
            </div>
            <div className="sp-cat-card-thumb">
              <img
                src="https://images.sharepal.in/super-categories/Category+Card+Image+(5).webp"
                alt="Entertainment Audio Visual"
              />
            </div>
            <div className="sp-card-bottom-bar bar-pink" />
          </div>
        </div>

        {/* 5. Scroll Down Indicator */}
        <div
          className="sp-scroll-down-indicator"
          onClick={scrollToContent}
          role="button"
          tabIndex={0}
        >
          <span>Scroll down</span>
          <div className="sp-mouse-icon">
            <div className="sp-mouse-dot" />
          </div>
          <span>to view more</span>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Copy, Check, Sparkles, Tag, Gamepad2, ShieldCheck, Flame, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

const offers = [
  {
    id: 1,
    tag: "WEEKEND SPECIAL",
    tagColor: "#9EFF00",
    tagBg: "rgba(158, 255, 0, 0.2)",
    icon: <Gamepad2 size={22} color="#9EFF00" />,
    title: "PS5 + 100 Blockbuster Games Combo",
    subtitle: "Rent for 4+ days and enjoy an effective rate of just ₹200/day + Free Doorstep Delivery!",
    code: "GAMEON20",
    discount: "20% OFF",
    bgGradient: "linear-gradient(135deg, #3B0764 0%, #6B21A8 50%, #4C187C 100%)",
    accentColor: "#9EFF00",
    image: "https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-with-100-games-with-1-controller/ps5-with-100-games-with-1-controller-on-rent-sharepal-1.webp"
  },
  {
    id: 2,
    tag: "ZERO DEPOSIT GUARANTEE",
    tagColor: "#34D399",
    tagBg: "rgba(52, 211, 153, 0.2)",
    icon: <ShieldCheck size={22} color="#34D399" />,
    title: "₹0 Security Deposit Across Bangalore",
    subtitle: "No credit card hold, no security money locked. Hassle-free instant digital KYC verification.",
    code: "ZERODEPOSIT",
    discount: "₹0 DEPOSIT",
    bgGradient: "linear-gradient(135deg, #064E3B 0%, #047857 50%, #3B0764 100%)",
    accentColor: "#34D399",
    image: "https://images.sharepal.in/sub-category-card/ps5-console-on-rent-sharepal.webp"
  },
  {
    id: 3,
    tag: "TRENDING TOURNAMENT",
    tagColor: "#FBBF24",
    tagBg: "rgba(251, 191, 36, 0.2)",
    icon: <Flame size={22} color="#FBBF24" />,
    title: "FC25 + 2 DualSense Controllers Combo",
    subtitle: "Challenge your friends to thrilling matches. Full squad ready to plug & play from ₹165/day.",
    code: "FC25BLITZ",
    discount: "FROM ₹165/DAY",
    bgGradient: "linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4C187C 100%)",
    accentColor: "#FBBF24",
    image: "https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-with-fc25/ps5-with-fc25-with-100-games-with-2-controllerS-on-rent-sharepal-1.webp"
  },
  {
    id: 4,
    tag: "WELCOME PAL OFFER",
    tagColor: "#F472B6",
    tagBg: "rgba(244, 114, 182, 0.2)",
    icon: <Gift size={22} color="#F472B6" />,
    title: "Flat ₹250 OFF on Your First Order",
    subtitle: "First time renting with SharePal? Enjoy instant flat savings on any gaming console bundle.",
    code: "FIRSTPAL250",
    discount: "FLAT ₹250 OFF",
    bgGradient: "linear-gradient(135deg, #831843 0%, #9D174D 50%, #4C187C 100%)",
    accentColor: "#F472B6",
    image: "https://images.sharepal.in/categories/gaming-consoles/big-screen-gaming/products/ps5-with-2-controllers-with-projector-on-rent+.webp"
  }
];

export default function OfferBannerCarousel({ onSelectSubcat, onOpenDateModal }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Auto-slide every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % offers.length);
  };

  const copyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.4 }
    });
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  const currentOffer = offers[currentIndex];

  return (
    <div className="sp-container" style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
      <div
        className="sp-offer-carousel-wrap"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Banner Slide */}
        <div
          className="sp-offer-slide"
          style={{ background: currentOffer.bgGradient }}
        >
          {/* Left Column: Text & Code */}
          <div className="sp-offer-info">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: currentOffer.tagBg,
                  color: currentOffer.tagColor,
                  padding: '3px 10px',
                  borderRadius: '999px',
                  fontSize: '0.725rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  border: `1px solid ${currentOffer.tagColor}40`
                }}
              >
                {currentOffer.icon}
                {currentOffer.tag}
              </span>

              <span
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontWeight: 700
                }}
              >
                {currentOffer.discount}
              </span>
            </div>

            <h3 className="sp-offer-title">{currentOffer.title}</h3>
            <p className="sp-offer-subtitle">{currentOffer.subtitle}</p>

            {/* Code pill & CTA */}
            <div className="sp-offer-actions">
              <button
                type="button"
                className="sp-offer-coupon-btn"
                onClick={() => copyCode(currentOffer.code)}
                title="Click to copy coupon code"
              >
                <Tag size={14} color={currentOffer.accentColor} />
                <span>{currentOffer.code}</span>
                {copiedCode === currentOffer.code ? (
                  <Check size={14} color="#10B981" />
                ) : (
                  <Copy size={14} color="rgba(255, 255, 255, 0.7)" />
                )}
                {copiedCode === currentOffer.code && (
                  <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 800 }}>COPIED!</span>
                )}
              </button>

              <button
                type="button"
                className="sp-offer-cta-btn"
                onClick={() => {
                  window.scrollTo({ top: 700, behavior: 'smooth' });
                }}
              >
                <span>Claim Deal</span>
                <Sparkles size={14} />
              </button>
            </div>
          </div>

          {/* Right Column: Hero Graphic */}
          <div className="sp-offer-graphic-wrap">
            <img
              src={currentOffer.image}
              alt=""
              className="sp-offer-img"
              loading="lazy"
            />
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          type="button"
          className="sp-offer-arrow left"
          onClick={handlePrev}
          aria-label="Previous Offer"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          className="sp-offer-arrow right"
          onClick={handleNext}
          aria-label="Next Offer"
        >
          <ChevronRight size={20} />
        </button>

        {/* Indicator Dots */}
        <div className="sp-offer-dots">
          {offers.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`sp-offer-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

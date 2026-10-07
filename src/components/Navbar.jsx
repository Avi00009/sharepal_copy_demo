import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, CalendarPlus, ChevronDown, Search, ShoppingBag, User } from 'lucide-react';
import SharePalLogo from './SharePalLogo';

export default function Navbar({
  selectedCity,
  onOpenCityModal,
  deliveryDate,
  pickupDate,
  billableDays,
  onOpenDateModal,
  cartCount,
  onOpenCart,
  onOpenSearch,
  currentUser,
  onOpenLoginModal
}) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;

      // When near top of the page, always show header
      if (currentScrollY <= 60) {
        setIsHidden(false);
        document.body.classList.remove('header-hidden');
        lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
        ticking = false;
        return;
      }

      const diff = currentScrollY - lastScrollY;
      // Ignore micro-jitters
      if (Math.abs(diff) > 6) {
        if (diff > 0 && currentScrollY > 70) {
          // Scrolling down: hide header
          setIsHidden(true);
          document.body.classList.add('header-hidden');
        } else if (diff < 0) {
          // Scrolling up: reveal header
          setIsHidden(false);
          document.body.classList.remove('header-hidden');
        }
        lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('header-hidden');
    };
  }, []);

  const formatOrdinalDate = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    const day = d.getDate();
    const month = d.toLocaleDateString('en-IN', { month: 'short' });
    const getSuffix = (n) => {
      if (n >= 11 && n <= 13) return 'th';
      switch (n % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    return `${day}${getSuffix(day)} ${month}`;
  };

  const deliveryFormatted = formatOrdinalDate(deliveryDate);
  const pickupFormatted = formatOrdinalDate(pickupDate);

  return (
    <header className={`sp-header ${isHidden ? 'sp-header--hidden' : ''}`}>
      <div className="sp-container">
        {/* Desktop View */}
        <div className="sp-header-inner" style={{ display: 'none' }} id="sp-desktop-header">
          {/* Logo */}
          <div className="sp-logo-wrapper">
            <a href="#" className="sp-logo-badge" title="SharePal Home">
              <SharePalLogo height={26} />
            </a>
          </div>

          {/* Middle Pills: City + Dates */}
          <div className="sp-header-center">
            {/* City Button */}
            <button
              type="button"
              className="sp-city-btn"
              onClick={onOpenCityModal}
              title="Change City"
            >
              <MapPin size={15} color="#0F172A" />
              <span>{selectedCity}</span>
              <ChevronDown size={14} color="#0F172A" />
            </button>

            {/* Dates Trigger */}
            <div
              className="sp-dates-trigger"
              onClick={onOpenDateModal}
              title="Select Rental Dates"
            >
              <div className="sp-date-item">
                <CalendarPlus size={15} color="#0F172A" />
                <span>
                  {deliveryFormatted ? `Delivery Date: ${deliveryFormatted}` : 'Delivery Date'}
                </span>
              </div>

              <div className="sp-date-item">
                <CalendarPlus size={15} color="#0F172A" />
                <span>
                  {pickupFormatted ? `Pickup Date: ${pickupFormatted}` : 'Pickup Date'}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              className="sp-btn-select-dates"
              onClick={onOpenDateModal}
              title="Select Rental Dates"
            >
              <CalendarPlus size={15} color="#FFFFFF" strokeWidth={2.4} />
              <span>Select</span>
            </button>
          </div>

          {/* Header Right */}
          <div className="sp-header-right">
            <button
              type="button"
              className="sp-icon-btn"
              onClick={onOpenSearch}
              title="Search Gear"
              aria-label="Search"
            >
              <Search size={22} />
            </button>

            <button
              type="button"
              className="sp-icon-btn"
              onClick={onOpenCart}
              title="View Cart"
              aria-label="Cart"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && <span className="sp-cart-badge">{cartCount}</span>}
            </button>

            <button
              type="button"
              className="sp-user-login-btn"
              onClick={onOpenLoginModal}
              title={currentUser ? "View Profile & Bookings" : "Sign in / Register"}
            >
              <div className="sp-user-avatar" style={{ fontWeight: 700, fontSize: '0.8rem' }}>
                {currentUser ? (
                  currentUser.name.charAt(0).toUpperCase()
                ) : (
                  <User size={18} />
                )}
              </div>
              <span style={{ fontSize: '0.85rem' }}>
                {currentUser ? `Hi, ${currentUser.name.split(' ')[0]}` : 'Hi, Login'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile View */}
        <div id="sp-mobile-header" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <a
              href="#"
              style={{
                background: '#1945E8',
                borderRadius: '8px',
                padding: '6px 14px',
                display: 'inline-flex',
                alignItems: 'center',
                boxShadow: '0 4px 12px rgba(25, 69, 232, 0.35)',
                textDecoration: 'none'
              }}
              title="SharePal Home"
            >
              <SharePalLogo height={20} />
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={onOpenCityModal}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: '#7C3AED',
                  color: '#FFFFFF',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <MapPin size={13} color="#FFFFFF" />
                <span>{selectedCity}</span>
                <ChevronDown size={13} color="#FFFFFF" />
              </button>

              <button
                type="button"
                onClick={onOpenLoginModal}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'transparent',
                  border: '2px solid rgba(255, 255, 255, 0.9)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: 0
                }}
                aria-label="User account"
              >
                {currentUser ? (
                  <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>
                    {currentUser.name.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <User size={18} color="#FFFFFF" strokeWidth={2.2} />
                )}
              </button>
            </div>
          </div>

          {/* Date Selector Row on Mobile */}
          <div
            onClick={onOpenDateModal}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#FFFFFF',
              borderRadius: '999px',
              padding: '0 4px 0 14px',
              border: '2px solid #8A2BE2',
              height: '40px',
              boxSizing: 'border-box',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.85rem', color: '#0F172A', fontWeight: 600 }}>
              <CalendarPlus size={16} color="#0F172A" />
              <span>
                {deliveryFormatted && pickupFormatted
                  ? `${deliveryFormatted} - ${pickupFormatted}`
                  : 'Select Rental Dates'}
              </span>
            </div>
            <button
              type="button"
              style={{
                background: '#080E21',
                color: '#FFFFFF',
                borderRadius: '999px',
                padding: '0 14px',
                height: '30px',
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <CalendarPlus size={12} color="#FFFFFF" strokeWidth={2.4} />
              <span>Select</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          #sp-desktop-header { display: flex !important; }
          #sp-mobile-header { display: none !important; }
        }
      `}</style>
    </header>
  );
}

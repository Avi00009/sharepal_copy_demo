import React from 'react';
import { MapPin, Calendar, ChevronDown, Search, ShoppingBag, User } from 'lucide-react';
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
  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  const deliveryFormatted = formatDateDisplay(deliveryDate);
  const pickupFormatted = formatDateDisplay(pickupDate);

  return (
    <header className="sp-header">
      <div className="sp-container">
        {/* Desktop View */}
        <div className="sp-header-inner" style={{ display: 'none' }} id="sp-desktop-header">
          {/* Logo */}
          <div className="sp-logo-wrapper">
            <a href="#" className="sp-logo-badge" title="SharePal Home">
              <SharePalLogo height={24} />
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
              <MapPin size={16} color="#4C187C" />
              <span>{selectedCity}</span>
              <ChevronDown size={14} color="#4C187C" />
            </button>

            {/* Dates Trigger */}
            <div
              className="sp-dates-trigger"
              onClick={onOpenDateModal}
              title="Select Rental Dates"
            >
              <Calendar size={16} color="#64748B" />
              {deliveryFormatted && pickupFormatted ? (
                <span>
                  {deliveryFormatted} - {pickupFormatted} ({billableDays}d)
                </span>
              ) : (
                <span>Delivery Date &middot; Pickup Date</span>
              )}
            </div>

            <div className="sp-dates-divider"></div>

            {/* CTA Button */}
            <button
              type="button"
              className="sp-btn-select-dates"
              onClick={onOpenDateModal}
            >
              <Calendar size={14} />
              <span>{deliveryFormatted ? 'Change' : 'Select'}</span>
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
            <a href="#" className="sp-logo-badge" style={{ padding: '6px 12px' }}>
              <SharePalLogo height={20} />
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={onOpenCityModal}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: '#62229E',
                  color: '#FFFFFF',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}
              >
                <MapPin size={13} />
                <span>{selectedCity}</span>
                <ChevronDown size={12} />
              </button>

              <button
                type="button"
                onClick={onOpenCart}
                style={{ position: 'relative', color: '#FFFFFF', padding: '4px' }}
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && <span className="sp-cart-badge">{cartCount}</span>}
              </button>

              <button
                type="button"
                onClick={onOpenLoginModal}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '999px',
                  background: '#FFFFFF',
                  color: '#4C187C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
                aria-label="User account"
              >
                {currentUser ? currentUser.name.charAt(0).toUpperCase() : <User size={16} />}
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
              padding: '3px 4px 3px 12px',
              border: '2px solid #8A2BE2'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#334155', fontWeight: 600 }}>
              <Calendar size={15} color="#4C187C" />
              <span>
                {deliveryFormatted && pickupFormatted
                  ? `${deliveryFormatted} - ${pickupFormatted} (${billableDays}d)`
                  : 'Select Rental Dates'}
              </span>
            </div>
            <button
              type="button"
              style={{
                background: '#4C187C',
                color: '#FFFFFF',
                borderRadius: '999px',
                padding: '5px 12px',
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Calendar size={12} />
              {deliveryFormatted ? 'Change' : 'Select'}
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

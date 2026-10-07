import React from 'react';

const POPULAR_CITIES = [
  {
    name: 'Delhi',
    icon: (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 13h20v4H22zM20 17h24v4H20zM18 21h28v4H18z" />
        <path d="M20 25v27M44 25v27" />
        <path d="M26 52v-16c0-3.3 2.7-6 6-6s6 2.7 6 6v16" />
        <path d="M14 52h36v4H14z" />
        <path d="M12 56h40v2H12z" />
        <line x1="28" y1="25" x2="36" y2="25" />
      </svg>
    )
  },
  {
    name: 'Hyderabad',
    icon: (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 17l2-6h2l2 6M43 17l2-6h2l2 6" />
        <path d="M17 17v35M47 17v35" />
        <path d="M17 25h30M17 33h30" />
        <path d="M26 52v-14c0-3.3 2.7-6 6-6s6 2.7 6 6v14" />
        <path d="M23 25v-4c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v4" />
        <circle cx="32" cy="27" r="1.5" />
        <path d="M13 52h38v4H13z" />
      </svg>
    )
  },
  {
    name: 'Mumbai',
    icon: (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 22h32v4H16z" />
        <path d="M18 26v26M46 26v26" />
        <path d="M25 52v-16c0-3.9 3.1-7 7-7s7 3.1 7 7v16" />
        <path d="M20 18l3-4h18l3 4" />
        <path d="M18 34h7M39 34h7" />
        <path d="M13 52h38v4H13z" />
        <path d="M15 26v-4h3v4M46 26v-4h3v4" />
      </svg>
    )
  },
  {
    name: 'Pune',
    icon: (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 22l4-4h24l4 4" />
        <path d="M18 22v30M46 22v30" />
        <path d="M26 52v-15c0-3.3 2.7-6 6-6s6 2.7 6 6v15" />
        <path d="M18 30h8M38 30h8" />
        <path d="M14 52h36v4H14z" />
        <path d="M22 18v-4h4v4M38 18v-4h4v4" />
      </svg>
    )
  },
  {
    name: 'Chennai',
    icon: (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M26 14h12l-2 8H28l-2-8z" />
        <path d="M24 22h16l-2 8H26l-2-8z" />
        <path d="M21 30h22l-2 9H23l-2-9z" />
        <path d="M18 39h28v13H18V39z" />
        <path d="M28 52v-8c0-2.2 1.8-4 4-4s4 1.8 4 4v8" />
        <path d="M14 52h36v4H14z" />
        <circle cx="32" cy="11" r="1.5" />
      </svg>
    )
  },
  {
    name: 'Bangalore',
    icon: (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 14c0-1.1.9-2 2-2s2 .9 2 2v2h-4v-2z" />
        <path d="M26 16c0-3.3 2.7-6 6-6s6 2.7 6 6v6H26v-6z" />
        <path d="M18 22h28v4H18z" />
        <path d="M20 26v26M26 26v26M38 26v26M44 26v26" />
        <path d="M29 52v-12c0-1.7 1.3-3 3-3s3 1.3 3 3v12" />
        <path d="M14 52h36v4H14z" />
        <path d="M16 22l-3 4M48 22l3 4" />
      </svg>
    )
  }
];

const OTHER_CITIES = [
  'Faridabad',
  'Kolkata',
  'Gurgaon',
  'Noida',
  'Ghaziabad'
];

export default function CityModal({ isOpen, onClose, selectedCity, onSelectCity }) {
  if (!isOpen) return null;

  const handleSelect = (cityName) => {
    onSelectCity(cityName);
    onClose();
  };

  return (
    <div className="sp-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="sp-city-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Title */}
        <h2 className="sp-city-modal-title">Select Your City</h2>

        {/* Popular Cities Divider */}
        <div className="sp-city-divider">
          <span className="sp-city-divider-line" />
          <span className="sp-city-divider-label">Popular Cities</span>
          <span className="sp-city-divider-line" />
        </div>

        {/* Popular Cities Grid */}
        <div className="sp-city-popular-grid">
          {POPULAR_CITIES.map((city) => {
            const isSelected = selectedCity.toLowerCase() === city.name.toLowerCase();
            return (
              <button
                key={city.name}
                type="button"
                className={`sp-city-card ${isSelected ? 'active' : ''}`}
                onClick={() => handleSelect(city.name)}
                title={`Select ${city.name}`}
              >
                <div className="sp-city-icon-wrapper">
                  {city.icon}
                </div>
                <span className="sp-city-name">{city.name}</span>
              </button>
            );
          })}
        </div>

        {/* Other Cities Divider */}
        <div className="sp-city-divider">
          <span className="sp-city-divider-line" />
          <span className="sp-city-divider-label">Other Cities</span>
          <span className="sp-city-divider-line" />
        </div>

        {/* Other Cities Grid */}
        <div className="sp-city-other-grid">
          {OTHER_CITIES.map((cityName) => {
            const isSelected = selectedCity.toLowerCase() === cityName.toLowerCase();
            return (
              <button
                key={cityName}
                type="button"
                className={`sp-city-pill ${isSelected ? 'active' : ''}`}
                onClick={() => handleSelect(cityName)}
                title={`Select ${cityName}`}
              >
                {cityName}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

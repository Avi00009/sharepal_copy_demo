import React, { useState } from 'react';
import { MapPin, X, Check, Search } from 'lucide-react';
import { citiesList } from '../data/categories';

export default function CityModal({ isOpen, onClose, selectedCity, onSelectCity }) {
  const [citySearch, setCitySearch] = useState('');

  if (!isOpen) return null;

  const filteredCities = citiesList.filter((c) =>
    c.name.toLowerCase().includes(citySearch.trim().toLowerCase())
  );

  return (
    <div className="sp-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="sp-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="sp-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={20} color="#4C187C" />
            <h3 className="sp-modal-title">Select Your City</h3>
          </div>
          <button className="sp-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>
        <div className="sp-modal-body">
          <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1rem' }}>
            Free doorstep delivery &amp; pickup is active across major cities in India:
          </p>

          {/* Search Input with Validation */}
          <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
            <input
              type="text"
              maxLength={30}
              placeholder="Search your city (e.g. Bangalore, Mumbai...)"
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: '10px',
                border: '1.5px solid #CBD5E1',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
            {citySearch && (
              <button
                type="button"
                onClick={() => setCitySearch('')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  padding: '2px'
                }}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {filteredCities.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 0', color: '#64748B', fontSize: '0.85rem' }}>
              No rental service currently available in &ldquo;{citySearch}&rdquo;.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {filteredCities.map((city) => {
                const isSelected = selectedCity.toLowerCase() === city.name.toLowerCase();
                return (
                  <button
                    key={city.id}
                    onClick={() => {
                      onSelectCity(city.name);
                      onClose();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid #8A2BE2' : '1px solid #E2E8F0',
                      background: isSelected ? '#F3E8FF' : '#FFFFFF',
                      textAlign: 'left',
                      transition: 'all 150ms ease',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: isSelected ? '#4C187C' : '#1E293B' }}>
                        {city.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{city.state}</div>
                    </div>
                    {isSelected && <Check size={18} color="#8A2BE2" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { MapPin, X, Check } from 'lucide-react';
import { citiesList } from '../data/categories';

export default function CityModal({ isOpen, onClose, selectedCity, onSelectCity }) {
  if (!isOpen) return null;

  return (
    <div className="sp-modal-overlay" onClick={onClose}>
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
          <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1.25rem' }}>
            Free doorstep delivery & pickup is active across major cities in India:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {citiesList.map((city) => {
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
        </div>
      </div>
    </div>
  );
}

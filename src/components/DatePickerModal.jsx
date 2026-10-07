import React, { useState } from 'react';
import { Calendar, X, Clock, Info, Check, ShieldCheck } from 'lucide-react';

export default function DatePickerModal({
  isOpen,
  onClose,
  deliveryDate,
  pickupDate,
  onApplyDates
}) {
  if (!isOpen) return null;

  // Internal state before applying
  const [tempDelivery, setTempDelivery] = useState(
    deliveryDate || new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [tempPickup, setTempPickup] = useState(
    pickupDate || new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0]
  );

  // Compute billable days:
  // SharePal policy: rental starts following day of delivery and ends day prior to pickup
  // So if Delivery = Day 1, Pickup = Day 4 => Billable Days = (4 - 1 - 1) = 2 days minimum.
  const dStart = new Date(tempDelivery);
  const dEnd = new Date(tempPickup);
  const diffTime = dEnd - dStart;
  const rawDays = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));
  const billableDays = Math.max(2, rawDays - 1); // standard minimum 2 days

  const setPreset = (daysCount) => {
    const today = new Date();
    const dDeliv = new Date(today.getTime() + 86400000); // tomorrow
    const dPick = new Date(dDeliv.getTime() + (daysCount + 1) * 86400000);
    setTempDelivery(dDeliv.toISOString().split('T')[0]);
    setTempPickup(dPick.toISOString().split('T')[0]);
  };

  const handleSave = () => {
    if (new Date(tempPickup) <= new Date(tempDelivery)) {
      alert("Pickup date must be after delivery date (minimum 2 rental days).");
      return;
    }
    onApplyDates(tempDelivery, tempPickup, billableDays);
    onClose();
  };

  return (
    <div className="sp-modal-overlay" onClick={onClose}>
      <div className="sp-modal-content" style={{ maxWidth: '580px' }} onClick={(e) => e.stopPropagation()}>
        <div className="sp-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={22} color="#4C187C" />
            <div>
              <h3 className="sp-modal-title">Select Rental Dates</h3>
              <p style={{ fontSize: '0.75rem', color: '#64748B' }}>
                Delivery by 8 PM &middot; Pickup after 9 AM &middot; Free Doorstep Delivery
              </p>
            </div>
          </div>
          <button className="sp-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="sp-modal-body">
          {/* Quick Presets */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Popular Rental Durations
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setPreset(2)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  border: billableDays === 2 ? '1.5px solid #8A2BE2' : '1px solid #E2E8F0',
                  background: billableDays === 2 ? '#F3E8FF' : '#F8FAFC',
                  color: billableDays === 2 ? '#4C187C' : '#334155'
                }}
              >
                Weekend (2 Days)
              </button>
              <button
                type="button"
                onClick={() => setPreset(4)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  border: billableDays === 4 ? '1.5px solid #8A2BE2' : '1px solid #E2E8F0',
                  background: billableDays === 4 ? '#F3E8FF' : '#F8FAFC',
                  color: billableDays === 4 ? '#4C187C' : '#334155'
                }}
              >
                4 Days (Save 15%)
              </button>
              <button
                type="button"
                onClick={() => setPreset(7)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  border: billableDays === 7 ? '1.5px solid #8A2BE2' : '1px solid #E2E8F0',
                  background: billableDays === 7 ? '#F3E8FF' : '#F8FAFC',
                  color: billableDays === 7 ? '#4C187C' : '#334155'
                }}
              >
                1 Week (Save 35%)
              </button>
              <button
                type="button"
                onClick={() => setPreset(14)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  border: billableDays === 14 ? '1.5px solid #8A2BE2' : '1px solid #E2E8F0',
                  background: billableDays === 14 ? '#F3E8FF' : '#F8FAFC',
                  color: billableDays === 14 ? '#4C187C' : '#334155'
                }}
              >
                14 Days (Save 50%)
              </button>
            </div>
          </div>

          {/* Date Inputs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '1.25rem' }}>
            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                DELIVERY DATE
              </label>
              <input
                type="date"
                value={tempDelivery}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setTempDelivery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: '#1E293B',
                  outline: 'none'
                }}
              />
              <span style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '4px', display: 'block' }}>
                Delivered between 4 PM - 8 PM
              </span>
            </div>

            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                PICKUP DATE
              </label>
              <input
                type="date"
                value={tempPickup}
                min={tempDelivery}
                onChange={(e) => setTempPickup(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: '#1E293B',
                  outline: 'none'
                }}
              />
              <span style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '4px', display: 'block' }}>
                Picked up between 9 AM - 12 PM
              </span>
            </div>
          </div>

          {/* SharePal Rental Formula Notice */}
          <div
            style={{
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              borderRadius: '12px',
              padding: '12px',
              marginBottom: '1.5rem',
              display: 'flex',
              gap: '10px'
            }}
          >
            <Info size={20} color="#1D4ED8" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.8rem', color: '#1E40AF', lineHeight: '1.45' }}>
              <strong>SharePal Transparent Billing:</strong> The rental starts the day after delivery and ends the day prior to pickup.
              <div style={{ marginTop: '4px', fontWeight: 600 }}>
                You are charged for: <span style={{ color: '#4C187C', fontSize: '0.95rem' }}>{billableDays} billable days</span>.
              </div>
            </div>
          </div>

          {/* Zero Deposit Assurance */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem', color: '#059669', fontSize: '0.825rem', fontWeight: 600 }}>
            <ShieldCheck size={18} />
            <span>₹0 Security Deposit &middot; Free Doorstep Delivery &middot; Cancel Anytime</span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 18px',
                borderRadius: '999px',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: '#64748B',
                background: '#F1F5F9'
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              style={{
                padding: '10px 24px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '0.875rem',
                color: '#FFFFFF',
                background: '#4C187C',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(76, 24, 124, 0.3)'
              }}
            >
              <Check size={18} />
              Confirm Rental Dates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

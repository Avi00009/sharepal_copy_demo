import React from 'react';
import { X, Star, ShieldCheck, Truck, RotateCcw, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function ProductDetailModal({
  product,
  onClose,
  billableDays,
  onAddToCart,
  onOpenDateModal
}) {
  if (!product) return null;

  // Pricing
  let durationMultiplier = 1;
  if (billableDays >= 7) durationMultiplier = 0.65;
  else if (billableDays >= 4) durationMultiplier = 0.85;

  const effectiveDailyRate = Math.round(product.per_day_rent * durationMultiplier);
  const totalAmount = effectiveDailyRate * (billableDays || 2);

  return (
    <div className="sp-modal-overlay" onClick={onClose}>
      <div
        className="sp-modal-content"
        style={{ maxWidth: '780px', padding: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sp-modal-header" style={{ padding: '1rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#EDE9FE', color: '#6D28D9', padding: '3px 8px', borderRadius: '4px' }}>
              {product.subcategory}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
              Item ID #{product.id}
            </span>
          </div>
          <button className="sp-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Body Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', padding: '1.5rem' }} id="sp-detail-grid">
          {/* Left Column: Image & Highlights */}
          <div>
            <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E2E8F0', marginBottom: '1rem' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ maxHeight: '280px', objectFit: 'contain' }}
              />
            </div>

            {/* Badges / Guarantees */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', background: '#F0FDF4', borderRadius: '10px', border: '1px solid #BBF7D0' }}>
                <ShieldCheck size={18} color="#16A34A" />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#166534' }}>
                  ₹0 Security Deposit
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', background: '#EFF6FF', borderRadius: '10px', border: '1px solid #BFDBFE' }}>
                <Truck size={18} color="#2563EB" />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1E40AF' }}>
                  Free Delivery & Pickup
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Ratings, Pricing, Inclusions */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Rating & Tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              {product.rating > 0 && (
                <div className="sp-rating-pill">
                  <Star size={13} fill="#E8AE19" color="#E8AE19" />
                  <span>{product.rating.toFixed(1)}</span>
                </div>
              )}
              <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                {product.booked_count} verified bookings
              </span>
            </div>

            {/* Title */}
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111827', lineHeight: 1.3, marginBottom: '0.75rem' }}>
              {product.name}
            </h2>

            {/* Pricing Box */}
            <div style={{ background: '#FAF5FF', padding: '14px', borderRadius: '12px', border: '1.5px solid #E9D5FF', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#6B21A8', fontWeight: 600 }}>
                    Rental Rate ({billableDays || 2} Billable Days)
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#4C187C' }}>₹{effectiveDailyRate}</span>
                    <span style={{ fontSize: '0.85rem', color: '#6B21A8' }}>/ day</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Total Payable</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827' }}>₹{totalAmount}</span>
                </div>
              </div>

              <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed #D8B4FE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                  Need different dates?
                </span>
                <button
                  type="button"
                  onClick={onOpenDateModal}
                  style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7C3AED', textDecoration: 'underline' }}
                >
                  Change Rental Dates
                </button>
              </div>
            </div>

            {/* Inclusions */}
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginBottom: '8px' }}>
                Package Includes
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {product.inclusions?.map((inc, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#475569' }}>
                    <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0 }} />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons */}
            <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                disabled={product.out_of_stock}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  borderRadius: '999px',
                  background: product.out_of_stock ? '#E2E8F0' : '#4C187C',
                  color: product.out_of_stock ? '#94A3B8' : '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: product.out_of_stock ? 'none' : '0 4px 14px rgba(76, 24, 124, 0.35)',
                  cursor: product.out_of_stock ? 'not-allowed' : 'pointer'
                }}
              >
                <ShoppingBag size={18} />
                <span>{product.out_of_stock ? 'Out of Stock' : 'Add to Cart & Reserve'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 680px) {
          #sp-detail-grid { grid-template-columns: 1fr 1.2fr !important; }
        }
      `}</style>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { X, Search, ArrowRight, TrendingUp, Star } from 'lucide-react';

export default function SearchModal({
  isOpen,
  onClose,
  products = [],
  onSelectProduct
}) {
  const [query, setQuery] = useState('');

  // Popular items shown by default when query is empty (matches screenshot)
  const popularItems = useMemo(() => {
    return products.slice(0, 8);
  }, [products]);

  // Filtered products when user types in search input
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return products.filter((p) =>
      p.name?.toLowerCase().includes(q) ||
      p.subcategory?.toLowerCase().includes(q)
    );
  }, [products, query]);

  if (!isOpen) return null;

  return (
    <div
      className="sp-modal-overlay sp-bottom-sheet-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="sp-modal-content sp-search-bottom-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: ✕ Search Products */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px 14px 20px',
            borderBottom: '1px solid #E5E7EB'
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#111827'
            }}
            aria-label="Close search"
          >
            <X size={20} strokeWidth={2.4} />
          </button>
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#111827',
              margin: 0,
              letterSpacing: '-0.02em'
            }}
          >
            Search Products
          </h3>
        </div>

        {/* Content Body */}
        <div style={{ padding: '16px 20px 24px 20px' }}>
          {/* Search Input Box */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: '#FFFFFF',
              border: '1.5px solid #CBD5E1',
              borderRadius: '12px',
              padding: '10px 14px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
              marginBottom: '16px'
            }}
          >
            <Search size={18} color="#64748B" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products"
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '0.95rem',
                color: '#1E293B',
                background: 'transparent'
              }}
              autoFocus
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                style={{
                  border: 'none',
                  background: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#94A3B8'
                }}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            ) : (
              <ArrowRight size={18} color="#64748B" />
            )}
          </div>

          {/* Promo Offer Banner Card (Use code SHAREPAL...) */}
          <div
            style={{
              background: 'linear-gradient(135deg, #F0FDF4 0%, #FAF5FF 60%, #F0FDF4 100%)',
              border: '1px solid #DCFCE7',
              borderRadius: '16px',
              padding: '14px 16px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'rgba(59, 130, 246, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '24px'
              }}
            >
              🎉
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.82rem', lineHeight: '1.35' }}>
                <span style={{ color: '#E11D48', fontWeight: 700 }}>Use code SHAREPAL &amp; get 10% </span>
                <span style={{ color: '#1F2937', fontWeight: 500 }}>on orders above ₹1500. Maximum discount: ₹300</span>
              </div>
              <div style={{ fontSize: '0.74rem', fontWeight: 600, color: '#4B5563', marginTop: '4px' }}>
                Use Coupon - SHAREPAL
              </div>
            </div>
          </div>

          {/* If Search Query is present: Show Live Results */}
          {query.trim() ? (
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '12px' }}>
                Search Results ({searchResults.length})
              </div>

              {searchResults.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#64748B' }}>
                  <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>No products found for "{query}"</p>
                  <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>Try searching for "PS5", "Xbox", or "Controller"</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct?.(product);
                        onClose();
                      }}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '12px',
                        padding: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'box-shadow 0.15s ease'
                      }}
                    >
                      <div
                        style={{
                          height: '110px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '8px'
                        }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ maxHeight: '100px', maxWidth: '100%', objectFit: 'contain' }}
                          loading="lazy"
                        />
                      </div>
                      <h4
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: '#0F172A',
                          margin: '0 0 4px 0',
                          lineHeight: '1.25',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {product.name}
                      </h4>
                      <div style={{ marginTop: 'auto', paddingTop: '6px' }}>
                        <span style={{ fontSize: '0.825rem', fontWeight: 800, color: '#1E293B' }}>
                          ₹{product.per_day_rent ? Math.round(product.per_day_rent) : '—'}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: '#64748B' }}> / day</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Popular Items Section (matches screenshot) */
            <div>
              {/* Section Header with Divider Line */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '14px' }}>
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#64748B',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Popular Items
                </span>
                <div style={{ flex: 1, height: '1px', background: '#E2E8F0', marginLeft: '12px' }} />
              </div>

              {/* Horizontal Scrollable Carousel */}
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  overflowX: 'auto',
                  paddingBottom: '14px',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {popularItems.map((product) => {
                  const rating = product.rating || (product.booked_count > 1000 ? 4.8 : 4.7);
                  return (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct?.(product);
                        onClose();
                      }}
                      style={{
                        width: '142px',
                        flexShrink: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: 'pointer'
                      }}
                    >
                      {/* Image Box */}
                      <div
                        style={{
                          width: '142px',
                          height: '120px',
                          background: '#FFFFFF',
                          borderRadius: '14px',
                          border: '1px solid #F1F5F9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '8px',
                          marginBottom: '8px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                        }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ maxHeight: '100px', maxWidth: '100%', objectFit: 'contain' }}
                          loading="lazy"
                        />
                      </div>

                      {/* Title */}
                      <h4
                        style={{
                          fontSize: '0.825rem',
                          fontWeight: 700,
                          color: '#111827',
                          margin: 0,
                          lineHeight: '1.2',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                        title={product.name}
                      >
                        {product.name}
                      </h4>

                      {/* Subtitle */}
                      <p
                        style={{
                          fontSize: '0.72rem',
                          color: '#64748B',
                          margin: '2px 0 0 0',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          lineHeight: '1.2'
                        }}
                      >
                        {product.name}
                      </p>

                      {/* Select Dates */}
                      <span style={{ fontSize: '0.7rem', color: '#475569', marginTop: '4px' }}>
                        Select Dates
                      </span>

                      {/* Price row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '1px' }}>
                        <span style={{ fontSize: '0.825rem', fontWeight: 800, color: '#111827' }}>₹</span>
                        <span
                          style={{
                            fontSize: '0.825rem',
                            fontWeight: 700,
                            color: '#111827',
                            filter: 'blur(3.5px)',
                            userSelect: 'none'
                          }}
                        >
                          158
                        </span>
                      </div>

                      {/* Booked this month */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          color: '#059669',
                          fontSize: '0.68rem',
                          fontWeight: 600,
                          marginTop: '4px'
                        }}
                      >
                        <TrendingUp size={12} color="#059669" />
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          booked this month
                        </span>
                        <span style={{ marginLeft: 'auto', fontWeight: 700 }}>
                          {product.booked_count || 18}
                        </span>
                      </div>

                      {/* Stars & Rating */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2px',
                          marginTop: '3px',
                          fontSize: '0.7rem',
                          color: '#111827'
                        }}
                      >
                        <div style={{ display: 'flex', color: '#111827' }}>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={10}
                              fill="#111827"
                              color="#111827"
                            />
                          ))}
                        </div>
                        <span style={{ fontWeight: 600, marginLeft: '3px' }}>
                          ({rating})
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Scroll/Progress Indicator */}
              <div
                style={{
                  width: '120px',
                  height: '3.5px',
                  background: '#0F172A',
                  borderRadius: '999px',
                  margin: '18px auto 6px auto'
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

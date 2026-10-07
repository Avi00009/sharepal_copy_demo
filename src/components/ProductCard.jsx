import React from 'react';
import { Star, Heart, ShoppingBag, Eye, ThumbsUp } from 'lucide-react';

export default function ProductCard({
  product,
  billableDays,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onAddToCart,
  onVote
}) {
  const isOutOfStock = product.out_of_stock;
  const isVoteProduct = product.tag === 'Vote to Launch';

  // Calculate pricing based on rental duration
  // Duration discount curve: 2-3 days = 1.0, 4-6 days = 0.85, 7+ days = 0.65
  let durationMultiplier = 1;
  if (billableDays >= 7) {
    durationMultiplier = 0.65;
  } else if (billableDays >= 4) {
    durationMultiplier = 0.85;
  }

  const effectiveDailyRate = Math.round(product.per_day_rent * durationMultiplier);
  const totalRentalAmount = effectiveDailyRate * (billableDays || 2);

  return (
    <article className="sp-product-card" aria-label={product.name}>
      {/* Image container */}
      <div className="sp-card-image-wrap" onClick={() => onSelectProduct(product)}>
        {/* Badges */}
        <div className="sp-card-badges">
          {product.tag === 'Trending' && (
            <span className="sp-badge sp-badge-trending">Trending</span>
          )}
          {product.tag === 'New' && (
            <span className="sp-badge sp-badge-new">New Release</span>
          )}
          {product.tag === 'Vote to Launch' && (
            <span className="sp-badge sp-badge-vote">Vote to Launch</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          className={`sp-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-label="Wishlist"
        >
          <Heart size={16} fill={isWishlisted ? '#EF4444' : 'none'} color={isWishlisted ? '#EF4444' : '#64748B'} />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="sp-card-img"
          loading="lazy"
          onError={(e) => {
            // High quality fallback console image
            e.target.src = 'https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-with-1-controller/ps5-console-with-1-controller-on-rent-sharepal-1.webp';
          }}
        />
      </div>

      {/* Body details */}
      <div className="sp-card-body">
        {/* Rating row */}
        <div className="sp-card-rating-row">
          {product.rating > 0 ? (
            <div className="sp-rating-pill">
              <Star size={12} fill="#E8AE19" color="#E8AE19" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          ) : (
            <div className="sp-rating-pill" style={{ background: '#EDE9FE', color: '#6D28D9' }}>
              <span>New</span>
            </div>
          )}

          <span className="sp-booked-count">
            ({product.booked_count >= 1000 ? `${(product.booked_count / 1000).toFixed(1)}k` : product.booked_count} booked)
          </span>
        </div>

        {/* Title */}
        <h3
          className="sp-card-title"
          title={product.name}
          onClick={() => onSelectProduct(product)}
        >
          {product.name}
        </h3>

        {/* Controllers / Specs micro-chip */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#475569', fontWeight: 600 }}>
            {product.controllers} {product.controllers > 1 ? 'Controllers' : 'Controller'}
          </span>
          {product.hasGames && (
            <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', background: '#ECFDF5', color: '#047857', fontWeight: 600 }}>
              Games Included
            </span>
          )}
        </div>

        {/* Footer: Price & CTA */}
        <div className="sp-card-footer">
          <div className="sp-price-box">
            <span className="sp-price-label">
              {billableDays ? `${billableDays} Days Rent` : 'Daily Rent'}
            </span>
            <div>
              <span className="sp-price-amount">₹{effectiveDailyRate}</span>
              <span className="sp-price-unit"> / day</span>
            </div>
            {billableDays && (
              <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 500 }}>
                Total: ₹{totalRentalAmount}
              </span>
            )}
          </div>

          <div>
            {isOutOfStock ? (
              <button type="button" className="sp-btn-rent out-of-stock" disabled>
                Out of Stock
              </button>
            ) : isVoteProduct ? (
              <button
                type="button"
                className="sp-btn-vote"
                onClick={() => onVote(product.id)}
                title="Vote to bring this device to Bangalore!"
              >
                <ThumbsUp size={14} />
                <span>Vote ({product.booked_count})</span>
              </button>
            ) : (
              <button
                type="button"
                className="sp-btn-rent"
                onClick={() => onAddToCart(product)}
                title="Add to cart & reserve gear"
              >
                Rent Now
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

import React from 'react';
import { Plus, Check, Heart } from 'lucide-react';

// Pricing formula matching SharePal exact pricing
export function calculateSharePalPrice(product, days = 6) {
  const base6DayPrices = {
    37501: 4399, // PS5 + FC27 + 1 Controller
    37512: 5199, // PS5 + FC27 + 2 Controllers
    37534: 6499, // PS5 + FC27 + 4 Controllers
    18273: 3099, // PS5 + Games (100+) + 1 Controller
    36028: 3999, // PS5 + FC26 + 1 Controller
    36039: 4799, // PS5 + FC26 + 2 Controllers
    36050: 5999, // PS5 + FC26 + 4 Controllers
    20242: 4499, // PS5 All in one + 2 Controllers
    18255: 3699, // PS5 + Games + 2 Controllers
    20105: 2899, // FC25 + 2 Controllers
    8185: 2499,  // PS5 + 1 Controller (No games)
    19680: 3199, // PS5 + 2 Controllers (No games)
    17795: 2999, // God of War
    18055: 2799, // PS5 + EA Play + 1 Controller
    20104: 2999, // Uncharted
    20103: 2999, // Cricket 24
    20102: 2999, // Ghost of Tsushima
    20100: 2999, // Spider-Man
    37616: 2499  // PS Portal
  };

  const p6 = base6DayPrices[product.id] || Math.round(product.per_day_rent * 6 * 1.5);

  if (days === 6) {
    return p6;
  }

  // Duration curve discount
  const scaleRatio = days / 6;
  const curve = Math.pow(scaleRatio, 0.72);
  return Math.round((p6 * curve) / 10) * 10 - 1;
}

export default function ProductCard({
  product,
  billableDays = 0,
  isWishlisted,
  isInCart,
  onToggleWishlist,
  onSelectProduct,
  onAddToCart,
  onVote
}) {
  const isOutOfStock = product.out_of_stock;
  const isVoteProduct = product.tag === 'Vote to Launch';
  const displayDays = billableDays || 6;
  const totalPrice = calculateSharePalPrice(product, displayDays);

  return (
    <article className="sp-exact-product-card" aria-label={product.name}>
      {/* Top Badge & Heart Area */}
      <div className="sp-exact-badge-area">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {product.tag === 'New' && (
            <span className="sp-exact-badge-new">New</span>
          )}
          {product.tag === 'Trending' && (
            <span className="sp-exact-badge-trending">Trending</span>
          )}
          {isVoteProduct && (
            <span className="sp-exact-badge-vote">Vote to Launch</span>
          )}
        </div>

        <button
          type="button"
          className="sp-exact-heart-btn"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist && onToggleWishlist(product.id);
          }}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-label="Wishlist"
        >
          <Heart
            size={16}
            fill={isWishlisted ? "#EF4444" : "none"}
            color={isWishlisted ? "#EF4444" : "#CBD5E1"}
            strokeWidth={1.8}
          />
        </button>
      </div>

      {/* Product Image */}
      <div
        className="sp-exact-img-wrap"
        onClick={() => onSelectProduct(product)}
        title="View product details"
      >
        <img
          src={product.image}
          alt={product.name}
          className="sp-exact-img"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-fifa27-1-controller/ps5-with-fifa-27-with-1-controller-on-rent-sharepal-1.webp';
          }}
        />
      </div>

      {/* Waitlist Box (Only for Vote to Launch products) */}
      {isVoteProduct && (
        <div className="sp-vote-waitlist-box">
          <div className="sp-vote-waitlist-msg">
            <span>✨ We launch if 1k people join the waitlist. Get notified first!</span>
          </div>
          <div className="sp-vote-progress-track">
            <div
              className="sp-vote-progress-fill"
              style={{ width: `${Math.min(100, Math.max(2, ((product.booked_count || 18) / 1000) * 100))}%` }}
            />
            <span className="sp-vote-progress-text">{product.booked_count || 18}/1000 Joined</span>
          </div>
        </div>
      )}

      {/* Title */}
      <h3
        className="sp-exact-title"
        title={product.name}
        onClick={() => onSelectProduct(product)}
      >
        {product.name}
      </h3>

      {/* Faint Divider */}
      <div className="sp-exact-card-divider" />

      {/* Pricing / Action */}
      {isVoteProduct ? (
        <button
          type="button"
          className="sp-vote-join-btn"
          onClick={() => onVote(product.id)}
          title="Join Waitlist"
        >
          Join Waitlist
        </button>
      ) : isOutOfStock ? (
        <span className="sp-exact-out-pill">Out of Stock</span>
      ) : !billableDays ? (
        <div className="sp-select-dates-action">
          <span className="sp-select-dates-hint">Select Dates to view price</span>
          <div className="sp-blurred-price">
            <span className="sp-currency">₹</span>
            <span className="sp-blur-dots">••••</span>
          </div>
          <button
            type="button"
            className="sp-exact-add-btn"
            onClick={() => onAddToCart(product)}
          >
            {isInCart ? 'Added' : 'Add to Cart'}
          </button>
        </div>
      ) : (
        <div className="sp-exact-pricing-row">
          <div className="sp-exact-pricing-left">
            <div className="sp-exact-rent-days">
              Rent for <strong>{displayDays}</strong> days
            </div>
            <div className="sp-exact-price">
              ₹{totalPrice.toLocaleString('en-IN')}
            </div>
            <div className="sp-exact-gst-badge">
              Incl. of GST
            </div>
          </div>

          <div className="sp-exact-action-right">
            <button
              type="button"
              className={`sp-exact-plus-btn ${isInCart ? 'in-cart' : ''}`}
              onClick={() => onAddToCart(product)}
              title={isInCart ? 'Added to cart' : 'Add to cart'}
              aria-label={`Add ${product.name} to cart`}
            >
              {isInCart ? (
                <Check size={18} strokeWidth={2.5} color="#2563EB" />
              ) : (
                <Plus size={18} strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

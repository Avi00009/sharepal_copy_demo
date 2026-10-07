import React from 'react';
import { Home, Grid, Search, ShoppingBag } from 'lucide-react';

export default function MobileBottomNav({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenCategories
}) {
  return (
    <nav className="sp-mobile-nav" aria-label="Mobile Navigation">
      <a href="#" className="sp-mobile-nav-item active">
        <Home size={20} />
        <span>Home</span>
      </a>

      <button
        type="button"
        className="sp-mobile-nav-item"
        onClick={onOpenCategories}
      >
        <Grid size={20} />
        <span>Category</span>
      </button>

      <button
        type="button"
        className="sp-mobile-nav-item"
        onClick={onOpenSearch}
      >
        <Search size={20} />
        <span>Search</span>
      </button>

      <button
        type="button"
        className="sp-mobile-nav-item"
        onClick={onOpenCart}
        style={{ position: 'relative' }}
      >
        <ShoppingBag size={20} />
        <span>Cart</span>
        {cartCount > 0 && (
          <span
            className="sp-cart-badge"
            style={{ top: '-4px', right: '12px' }}
          >
            {cartCount}
          </span>
        )}
      </button>
    </nav>
  );
}

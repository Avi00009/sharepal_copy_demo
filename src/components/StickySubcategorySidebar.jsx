import React from 'react';
import { Smile } from 'lucide-react';

export const sidebarItems = [
  {
    id: 'all',
    label: 'All',
    isAll: true
  },
  {
    id: 'gta-vi',
    label: 'GTA VI',
    image: 'https://images.sharepal.in/category-icons/gta-vi.webp'
  },
  {
    id: 'ps5',
    label: 'PS5 Console',
    image: 'https://images.sharepal.in/sub-category-card/ps5-console-on-rent-sharepal.webp'
  },
  {
    id: 'xbox',
    label: 'Xbox Console',
    image: 'https://images.sharepal.in/sub-category-card/xbox-console-on-rent-sharepal.webp'
  },
  {
    id: 'vr',
    label: 'VR',
    image: 'https://images.sharepal.in/sub-category-card/vr-on-rent-sharepal.webp'
  },
  {
    id: 'racing-wheel',
    label: 'Racing Wheel',
    image: 'https://images.sharepal.in/categories/gaming-consoles/gaming-accessories/logitech-G29-driving-force-racing-wheel/logitech-g29-racing-wheel-on-rent-sharepal-1.webp'
  },
  {
    id: 'big-screen',
    label: 'Big Screen Gaming',
    image: 'https://images.sharepal.in/categories/gaming-consoles/big-screen-gaming/products/ps5-with-2-controllers-with-projector-on-rent+.webp'
  }
];

export default function StickySubcategorySidebar({ activeSubcat, onSelectSubcat }) {
  return (
    <aside className="sp-sticky-sidebar-col" aria-label="Gaming Category Filter Sidebar">
      <div className="sp-sticky-sidebar-card">
        {sidebarItems.map((item) => {
          const isActive = activeSubcat === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`sp-sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectSubcat(item.id)}
              title={`Filter by ${item.label}`}
            >
              {/* Icon Container Box */}
              <div className={`sp-sidebar-icon-box ${isActive ? 'active' : ''}`}>
                {item.isAll ? (
                  <Smile size={28} color="#2563EB" strokeWidth={2.2} />
                ) : (
                  <img
                    src={item.image}
                    alt={item.label}
                    className="sp-sidebar-item-img"
                    loading="lazy"
                  />
                )}
              </div>

              {/* Label */}
              <span className={`sp-sidebar-label ${isActive ? 'active' : ''}`}>
                {item.label}
                {isActive && <span className="sp-sidebar-active-dash" />}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

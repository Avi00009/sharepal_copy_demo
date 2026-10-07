import React from 'react';
import { subcategoryFilters } from '../data/categories';
import { Gamepad2 } from 'lucide-react';

export default function SubcategoryTabs({ activeSubcat, onSelectSubcat }) {
  return (
    <div className="sp-container">
      <div className="sp-subcat-section">
        <div className="sp-subcat-pills" role="tablist" aria-label="Gaming Subcategories">
          {subcategoryFilters.map((sub) => {
            const isActive = activeSubcat === sub.id;
            return (
              <button
                key={sub.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                className={`sp-subcat-btn ${isActive ? 'active' : ''}`}
                onClick={() => onSelectSubcat(sub.id)}
              >
                {sub.image ? (
                  <img
                    src={sub.image}
                    alt=""
                    className="sp-subcat-icon"
                    aria-hidden="true"
                    loading="lazy"
                  />
                ) : (
                  <Gamepad2 size={16} />
                )}
                <span>{sub.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

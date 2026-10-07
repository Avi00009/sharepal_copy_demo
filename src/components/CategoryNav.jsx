import React from 'react';
import { mainCategories } from '../data/categories';

export default function CategoryNav({ activeCategory = 'gaming', onSelectCategory }) {
  return (
    <nav className="sp-category-nav-bar" aria-label="Main Categories">
      <div className="sp-container">
        <div className="sp-category-tabs-wrap">
          {mainCategories.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                type="button"
                className={`sp-cat-tab-item ${isActive ? 'active' : ''}`}
                onClick={() => onSelectCategory && onSelectCategory(cat.id)}
              >
                <span>{cat.name}</span>
                {isActive && <div className="sp-cat-indicator" />}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

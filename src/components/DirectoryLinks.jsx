import React from 'react';
import { directoryCategories } from '../data/categories';

export default function DirectoryLinks() {
  return (
    <section className="sp-directory-section" aria-label="Lifestyle Gear Rental Directory">
      <div className="sp-container">
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B', marginBottom: '1.5rem', fontFamily: 'var(--font-family-heading)' }}>
          Explore Gear Rentals Across India
        </h2>

        <div className="sp-directory-grid">
          {directoryCategories.map((cat, idx) => (
            <div key={idx} className="sp-directory-col">
              <h3>{cat.title}</h3>
              <ul>
                {cat.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <a href="#">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

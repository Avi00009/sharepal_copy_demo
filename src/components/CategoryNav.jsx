import React, { useRef, useState, useEffect } from 'react';
import { mainCategories } from '../data/categories';

export default function CategoryNav({ activeCategory = 'gaming', onSelectCategory }) {
  const containerRef = useRef(null);
  const tabRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0
  });
  const [isScrolled, setIsScrolled] = useState(false);

  // Recalculate floating indicator position whenever activeCategory changes or window resizes
  const updateIndicator = () => {
    const activeEl = tabRefs.current[activeCategory];
    const containerEl = containerRef.current;
    if (activeEl && containerEl) {
      const containerRect = containerEl.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();

      // Width of the pill bar under the text
      const barWidth = Math.max(34, Math.min(activeRect.width * 0.72, 48));
      const barLeft = (activeRect.left - containerRect.left) + (activeRect.width - barWidth) / 2;

      setIndicatorStyle({
        left: barLeft,
        width: barWidth,
        opacity: 1
      });
    }
  };

  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeCategory]);

  // Floating elevation effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sp-category-nav-bar ${isScrolled ? 'floating-elevated' : ''}`}
      aria-label="Main Categories"
    >
      <div className="sp-container">
        <div
          ref={containerRef}
          className="sp-category-tabs-container"
        >
          {mainCategories.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                ref={(el) => (tabRefs.current[cat.id] = el)}
                type="button"
                className={`sp-category-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onSelectCategory && onSelectCategory(cat.id);
                }}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}

          {/* Smooth Floating Glide Indicator Bar */}
          <div
            className="sp-floating-indicator-bar"
            style={{
              transform: `translateX(${indicatorStyle.left}px)`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity
            }}
          />
        </div>
      </div>
    </nav>
  );
}

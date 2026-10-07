import React from 'react';
import { Search, ChevronRight, SlidersHorizontal, Check } from 'lucide-react';

export default function SearchAndFilterBar({
  selectedCity,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  inStockOnly,
  onToggleInStock,
  totalItems,
  filteredCount
}) {
  return (
    <div className="sp-container">
      {/* Breadcrumb row */}
      <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#64748B', marginBottom: '0.75rem' }}>
        <a href="#" style={{ color: '#4C187C', fontWeight: 600 }}>{selectedCity}</a>
        <ChevronRight size={14} />
        <span style={{ color: '#1E293B', fontWeight: 500 }}>Gaming gadgets on rent</span>
      </nav>

      {/* Controls Container */}
      <div className="sp-controls-bar">
        {/* Left: Search input */}
        <div className="sp-controls-left">
          <div className="sp-search-box">
            <Search size={16} className="sp-search-icon" />
            <input
              type="text"
              placeholder="Search PS5, FC25, Controllers, VR..."
              className="sp-search-input"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search gaming gear"
            />
          </div>
        </div>

        {/* Right: Filters, Sort, and Count */}
        <div className="sp-controls-right">
          {/* In Stock toggle */}
          <button
            type="button"
            className={`sp-filter-toggle ${inStockOnly ? 'active' : ''}`}
            onClick={onToggleInStock}
            title="Filter by stock availability"
          >
            <span style={{
              width: '14px',
              height: '14px',
              borderRadius: '3px',
              border: inStockOnly ? 'none' : '1.5px solid #CBD5E1',
              background: inStockOnly ? '#8A2BE2' : 'transparent',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {inStockOnly && <Check size={11} color="#FFFFFF" />}
            </span>
            <span>In Stock Only</span>
          </button>

          {/* Sort By Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="sp-sort-select"
              aria-label="Sort products by"
            >
              <option value="trending">Trending First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="booked">Most Booked</option>
            </select>
          </div>

          {/* Results count text */}
          <div className="sp-results-count">
            Showing <strong>{filteredCount}</strong> of {totalItems} items
          </div>
        </div>
      </div>
    </div>
  );
}

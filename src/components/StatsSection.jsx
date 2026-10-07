import React from 'react';
import { statsData } from '../data/reviews';

export default function StatsSection() {
  return (
    <section className="sp-stats-section" aria-label="SharePal Impact & Scale">
      <div className="sp-container">
        <div className="sp-stats-grid">
          {statsData.map((stat, i) => (
            <div key={i}>
              <div className="sp-stat-value">{stat.value}</div>
              <div className="sp-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

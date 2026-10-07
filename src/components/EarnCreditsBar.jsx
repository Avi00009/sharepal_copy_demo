import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function EarnCreditsBar() {
  return (
    <div className="sp-earn-credits-bar" role="banner">
      <div className="sp-earn-content-wrap">
        <div className="sp-earn-items">
          <div className="sp-earn-item">
            <span className="sp-earn-tag">Earn with SharePal</span>
            <span className="sp-earn-desc">From rental assets</span>
          </div>
          <div className="sp-earn-sep">•</div>
          <div className="sp-earn-item">
            <span className="sp-earn-tag">Credits</span>
            <span className="sp-earn-desc">when you rent</span>
          </div>
          <div className="sp-earn-sep">•</div>
          <div className="sp-earn-item">
            <span className="sp-earn-tag">Rewards</span>
            <span className="sp-earn-desc">On every order</span>
          </div>
        </div>
        <a
          href="https://sharepal.in/club"
          target="_blank"
          rel="noopener noreferrer"
          className="sp-earn-btn"
        >
          <span>Know More</span>
          <ArrowUpRight size={14} strokeWidth={2.4} />
        </a>
      </div>
    </div>
  );
}

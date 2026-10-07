import React from 'react';
import { Mail, Phone, ChevronUp, Heart } from 'lucide-react';
import SharePalLogo from './SharePalLogo';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="sp-footer" aria-label="SharePal Footer">
      <div className="sp-container">
        <div className="sp-footer-grid">
          {/* Brand Info */}
          <div className="sp-footer-brand">
            <SharePalLogo height={28} />
            <p>
              India&apos;s leading gear &amp; gadget rental platform. Rent PlayStation 5 consoles, VR headsets, action cameras, and outdoor gear with zero security deposit.
            </p>
            <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#9EFF00', fontSize: '0.8rem', fontWeight: 600 }}>
              <Mail size={16} />
              <a href="mailto:care@sharepal.in" style={{ color: 'inherit' }}>care@sharepal.in</a>
            </div>
          </div>

          {/* Col 1: Sharepal */}
          <div className="sp-footer-col">
            <h4>Sharepal</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Why SharePal</a></li>
              <li><a href="#">Sitemap</a></li>
              <li><a href="#">CarePal</a></li>
            </ul>
          </div>

          {/* Col 2: Become a Pal */}
          <div className="sp-footer-col">
            <h4>Become a Pal</h4>
            <ul>
              <li><a href="#">Sharepal for Creators</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Sharepal for Brands</a></li>
              <li>
                <a href="#">
                  Asset Funding Program
                  <span className="sp-footer-badge-new">NEW</span>
                </a>
              </li>
              <li>
                <a href="#">
                  Rent Your Gear
                  <span className="sp-footer-badge-new">NEW</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Information */}
          <div className="sp-footer-col">
            <h4>Information</h4>
            <ul>
              <li><a href="#">How it works?</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Verification</a></li>
              <li><a href="#">Cancellation Policy</a></li>
              <li><a href="#">Life at Sharepal</a></li>
            </ul>
          </div>

          {/* Col 4: Policies */}
          <div className="sp-footer-col">
            <h4>Policies</h4>
            <ul>
              <li><a href="#">Terms &amp; Conditions</a></li>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Damage Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="sp-footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} SWNAC E-Kiraya Services Pvt Ltd &bull; Made with <Heart size={14} color="#EF4444" style={{ display: 'inline', verticalAlign: 'middle' }} /> for India
          </div>

          <button
            type="button"
            className="sp-btn-back-to-top"
            onClick={scrollToTop}
          >
            <span>Go up</span>
            <ChevronUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}

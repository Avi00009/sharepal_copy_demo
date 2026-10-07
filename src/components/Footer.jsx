import React, { useState } from 'react';
import { Mail, Headphones, ChevronUp, ChevronDown, Heart } from 'lucide-react';
import SharePalLogo from './SharePalLogo';

export default function Footer() {
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="sp-exact-footer" aria-label="SharePal Official Footer">
      <div className="sp-container">
        {/* Top Bangalore SEO & Rental Description Section */}
        <div className="sp-footer-seo-container">
          <div className="sp-footer-seo-block">
            <h3 className="sp-footer-seo-title">
              Renting from SharePal in Bangalore
            </h3>
            <p className="sp-footer-seo-paragraph">
              Discover the convenience of renting from SharePal, your trusted partner in Bangalore for all your rental needs. Whether you&apos;re exploring the vibrant streets of Koramangala, setting up a shoot in Indiranagar, or planning a trek from the outskirts of Whitefield, SharePal has you covered. We offer a wide range of products, including cameras, action cameras, gaming consoles, projectors, speakers, trekking gear, riding gear, and creator gear. With free home delivery and pickup services, flexible rental tenures, and an easy-to-use platform, renting has never been easier. Experience the freedom to rent what you need, when you need it, without the commitment of buying.
            </p>
          </div>

          <div className="sp-footer-seo-block">
            <h4 className="sp-footer-category-heading">
              Categories on Rent
            </h4>
            <h5 className="sp-footer-subcat-heading">
              Action Cameras on Rent
            </h5>
            <p className="sp-footer-seo-paragraph">
              Capture your adventures in stunning detail with our range of action cameras. Choose from top brands like GoPro, Insta360, and DJI, perfect for everything from extreme sports to casual vlogging. Whether you need high-quality video for your next trek or a 360-degree camera to capture every angle, we&apos;ve got you covered.
            </p>
            {isExpanded && (
              <p className="sp-footer-seo-paragraph" style={{ marginTop: '8px' }}>
                Looking to elevate your gaming experience? Rent a Sony PlayStation 5 console or Meta Quest 3 VR headset with popular titles like FC 25, God of War Ragnarök, and GTA. Enjoy doorstep delivery across Bangalore with zero security deposit and complete accessories included.
              </p>
            )}
            <button
              type="button"
              className="sp-footer-readmore-trigger"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
              <ChevronDown size={14} style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
          </div>
        </div>

        {/* Logo Section */}
        <div className="sp-footer-logo-row">
          <SharePalLogo height={30} shareColor="#3B82F6" palColor="#9EFF00" />
        </div>

        {/* 5-Column Navigation Grid */}
        <div className="sp-footer-columns-grid">
          {/* Column 1: Sharepal */}
          <div className="sp-footer-nav-col">
            <h4 className="sp-footer-nav-heading">Sharepal</h4>
            <ul className="sp-footer-nav-list">
              <li><a href="https://sharepal.in/about" target="_blank" rel="noopener noreferrer">About</a></li>
              <li><a href="https://sharepal.in/why-sharepal" target="_blank" rel="noopener noreferrer">Why SharePal</a></li>
              <li><a href="https://sharepal.in/sitemap" target="_blank" rel="noopener noreferrer">Sitemap</a></li>
              <li><a href="https://sharepal.in/carepal" target="_blank" rel="noopener noreferrer">CarePal</a></li>
            </ul>
          </div>

          {/* Column 2: Become a Pal */}
          <div className="sp-footer-nav-col">
            <h4 className="sp-footer-nav-heading">Become a Pal</h4>
            <ul className="sp-footer-nav-list">
              <li><a href="https://sharepal.in/creators" target="_blank" rel="noopener noreferrer">Sharepal for Creators</a></li>
              <li><a href="https://sharepal.in/careers" target="_blank" rel="noopener noreferrer">Careers</a></li>
              <li><a href="https://sharepal.in/brands" target="_blank" rel="noopener noreferrer">Sharepal for Brands</a></li>
              <li>
                <a href="https://sharepal.in/asset-funding" target="_blank" rel="noopener noreferrer" className="sp-footer-link-with-badge">
                  <span>Asset Funding Program</span>
                  <span className="sp-footer-pill-new">New</span>
                </a>
              </li>
              <li>
                <a href="https://sharepal.in/lend" target="_blank" rel="noopener noreferrer" className="sp-footer-link-with-badge">
                  <span>Rent Your Gear</span>
                  <span className="sp-footer-pill-new">New</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Information */}
          <div className="sp-footer-nav-col">
            <h4 className="sp-footer-nav-heading">Information</h4>
            <ul className="sp-footer-nav-list">
              <li><a href="https://sharepal.in/how-it-works" target="_blank" rel="noopener noreferrer">How it works?</a></li>
              <li><a href="https://sharepal.in/faqs" target="_blank" rel="noopener noreferrer">FAQs</a></li>
              <li><a href="https://sharepal.in/verification" target="_blank" rel="noopener noreferrer">Verification</a></li>
              <li><a href="https://sharepal.in/cancellation-policy" target="_blank" rel="noopener noreferrer">Cancellation Policy</a></li>
              <li><a href="https://sharepal.in/life-at-sharepal" target="_blank" rel="noopener noreferrer">Life at Sharepal</a></li>
            </ul>
          </div>

          {/* Column 4: Policies */}
          <div className="sp-footer-nav-col">
            <h4 className="sp-footer-nav-heading">Policies</h4>
            <ul className="sp-footer-nav-list">
              <li><a href="https://sharepal.in/terms" target="_blank" rel="noopener noreferrer">Terms &amp; Condition</a></li>
              <li><a href="https://sharepal.in/shipping-policy" target="_blank" rel="noopener noreferrer">Shipping policy</a></li>
              <li><a href="https://sharepal.in/damage-policy" target="_blank" rel="noopener noreferrer">Damage Policy</a></li>
              <li><a href="https://sharepal.in/terms-of-use" target="_blank" rel="noopener noreferrer">Terms of Use</a></li>
              <li><a href="https://sharepal.in/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 5: Need Help */}
          <div className="sp-footer-nav-col">
            <h4 className="sp-footer-nav-heading">Need Help</h4>
            <ul className="sp-footer-nav-list">
              <li>
                <a href="tel:+918045681234" className="sp-footer-icon-link">
                  <Headphones size={15} />
                  <span>Contact Support</span>
                </a>
              </li>
              <li><a href="https://sharepal.in/contact-us" target="_blank" rel="noopener noreferrer">Contact Us</a></li>
              <li>
                <a href="mailto:care@sharepal.in" className="sp-footer-icon-link">
                  <Mail size={15} />
                  <span>care@sharepal.in</span>
                </a>
              </li>
            </ul>

            {/* Social Media Icons with inline SVGs */}
            <div className="sp-footer-social-row">
              <a
                href="https://facebook.com/sharepal.in"
                target="_blank"
                rel="noopener noreferrer"
                className="sp-footer-social-btn"
                aria-label="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/sharepal.in"
                target="_blank"
                rel="noopener noreferrer"
                className="sp-footer-social-btn"
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/sharepal-in"
                target="_blank"
                rel="noopener noreferrer"
                className="sp-footer-social-btn"
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Go Up, Copyright, Made with Love */}
        <div className="sp-footer-bottom-bar">
          <button
            type="button"
            className="sp-footer-go-up-btn"
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
          >
            <span>Go up</span>
            <ChevronUp size={15} />
          </button>

          <div className="sp-footer-copyright">
            &copy; 2026. SWNAC E-Kiraya Services Pvt Ltd
          </div>

          <div className="sp-footer-made-in-india">
            <span>Made with</span>
            <Heart size={14} fill="#EF4444" color="#EF4444" style={{ display: 'inline', verticalAlign: 'middle' }} />
            <span>for India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

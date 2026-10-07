import React from 'react';
import { Star } from 'lucide-react';
import { reviewsData } from '../data/reviews';

export default function TestimonialsMarquee() {
  // Double list for continuous infinite loop marquee
  const loopedReviews = [...reviewsData, ...reviewsData];

  return (
    <section className="sp-reviews-section" aria-label="Customer Testimonials">
      <div className="sp-container">
        <div className="sp-reviews-header">
          {/* Google badge */}
          <div className="sp-google-badge">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53" />
            </svg>
            <span>Rated <strong>4.8 / 5</strong> on Google Reviews (5000+ Happy Pals)</span>
          </div>

          <h2 className="sp-section-heading">Served more than 1 Lakh Orders</h2>
          <p className="sp-section-subheading">
            See what our gamers and gear explorers have to say about SharePal's transparent rental experience.
          </p>
        </div>
      </div>

      {/* Marquee Track */}
      <div className="sp-marquee-container">
        <div className="sp-marquee-track">
          {loopedReviews.map((rev, index) => (
            <div key={`${rev.id}-${index}`} className="sp-review-card">
              <div>
                <div className="sp-review-top" style={{ marginBottom: '0.75rem' }}>
                  <div className="sp-stars-row">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#E8AE19" color="#E8AE19" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 700, background: '#ECFDF5', padding: '2px 6px', borderRadius: '4px' }}>
                    Verified
                  </span>
                </div>

                <p className="sp-review-text">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="sp-review-author-row">
                <div className="sp-author-avatar">
                  {rev.initials}
                </div>
                <div className="sp-author-info">
                  <h4>{rev.author}</h4>
                  <p>{rev.city} &bull; {rev.product}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

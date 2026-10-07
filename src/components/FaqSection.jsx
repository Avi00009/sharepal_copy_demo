import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqsData } from '../data/faqs';

export default function FaqSection() {
  const [openId, setOpenId] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'How it works?', 'Quality & Hygiene', 'Verification/KYC'];

  const filteredFaqs = faqsData.filter((faq) => {
    if (activeCategory === 'All') return true;
    return faq.category === activeCategory;
  });

  const displayedFaqs = showAll ? filteredFaqs : filteredFaqs.slice(0, 5);

  const toggleAccordion = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="sp-faq-section sp-container" aria-label="Frequently Asked Questions">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 className="sp-section-heading">Frequently Asked Questions (FAQs)</h2>
        <p className="sp-section-subheading">
          Got questions regarding console rentals in Bangalore? We’ve got quick answers.
        </p>

        {/* Category Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: activeCategory === cat ? '1.5px solid #8A2BE2' : '1px solid #E2E8F0',
                background: activeCategory === cat ? '#F3E8FF' : '#FFFFFF',
                color: activeCategory === cat ? '#4C187C' : '#64748B',
                cursor: 'pointer',
                transition: 'all 150ms ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="sp-faq-accordion">
        {displayedFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} className={`sp-faq-item ${isOpen ? 'open' : ''}`}>
              <button
                type="button"
                className="sp-faq-question"
                onClick={() => toggleAccordion(faq.id)}
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={18}
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 200ms ease',
                    flexShrink: 0,
                    color: isOpen ? '#8A2BE2' : '#64748B'
                  }}
                />
              </button>

              {isOpen && (
                <div className="sp-faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredFaqs.length > 5 && (
        <button
          type="button"
          className="sp-btn-view-more-faq"
          onClick={() => setShowAll(!showAll)}
        >
          <span>{showAll ? "Show Less FAQ's" : "View more FAQ's"}</span>
          <ChevronDown
            size={16}
            style={{
              transform: showAll ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 200ms ease'
            }}
          />
        </button>
      )}
    </section>
  );
}

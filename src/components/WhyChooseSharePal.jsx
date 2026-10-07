import React from 'react';
import { ShieldCheck, Truck, Sparkles, CreditCard, RotateCcw } from 'lucide-react';

export default function WhyChooseSharePal() {
  const features = [
    {
      icon: <ShieldCheck size={26} />,
      title: "Zero Security Deposit",
      description: "Rent premium PS5, VR, and Xbox consoles without locking your funds. Zero deposit across Bangalore with quick digital KYC."
    },
    {
      icon: <Truck size={26} />,
      title: "Free Doorstep Delivery",
      description: "Get consoles delivered on time by 8:00 PM and picked up right from your home or office with zero delivery fees."
    },
    {
      icon: <Sparkles size={26} />,
      title: "Mint Condition & Sanitized",
      description: "Every console and controller undergoes rigorous multi-point functional testing and hygienic ultraviolet sanitization."
    },
    {
      icon: <CreditCard size={26} />,
      title: "Pay On Delivery",
      description: "Inspect the console at your doorstep, verify the games library, and pay securely via UPI, Card, or Cash."
    }
  ];

  return (
    <section className="sp-why-section" aria-label="Why Choose SharePal">
      <div className="sp-container">
        <h2 className="sp-section-heading">Why Rent From SharePal?</h2>
        <p className="sp-section-subheading">
          India's most trusted lifestyle & gadget rental platform. Seamless entertainment delivered directly to your doorstep.
        </p>

        <div className="sp-features-grid">
          {features.map((feat, idx) => (
            <div key={idx} className="sp-feature-card">
              <div className="sp-feature-icon-box">
                {feat.icon}
              </div>
              <h3 className="sp-feature-title">{feat.title}</h3>
              <p className="sp-feature-desc">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, Truck, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  billableDays = 2,
  deliveryDate,
  pickupDate,
  onOpenDateModal
}) {
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pod'); // 'pod' (pay on delivery) | 'upi'
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  // Calculate pricing
  let durationMultiplier = 1;
  if (billableDays >= 7) durationMultiplier = 0.65;
  else if (billableDays >= 4) durationMultiplier = 0.85;

  const subtotal = cartItems.reduce((acc, item) => {
    const daily = Math.round(item.per_day_rent * durationMultiplier);
    return acc + daily * (billableDays || 2) * item.qty;
  }, 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert("Please fill in your name, contact phone, and delivery address.");
      return;
    }

    const genOrderId = "SP-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(genOrderId);
    setCheckoutStep('success');

    // Confetti celebration!
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <>
      <div className="sp-drawer-overlay" onClick={onClose} />
      <aside className="sp-drawer" aria-label="Shopping Cart">
        {/* Drawer Header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="#4C187C" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1E293B' }}>
              Rental Cart ({cartItems.reduce((acc, i) => acc + i.qty, 0)})
            </h3>
          </div>
          <button
            type="button"
            className="sp-modal-close"
            onClick={onClose}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem' }}>
          {checkoutStep === 'cart' && (
            <>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#F1F5F9', color: '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <ShoppingBag size={32} />
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>
                    Your cart is empty
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
                    Explore top PlayStation 5 bundles, VR headsets, and games available for rent in Bangalore.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="sp-btn-rent"
                    style={{ padding: '10px 24px', fontSize: '0.9rem' }}
                  >
                    Browse Gaming Consoles
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Rental Dates summary card */}
                  <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', display: 'block' }}>
                        RENTAL PERIOD
                      </span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B' }}>
                        {deliveryDate ? `${deliveryDate} to ${pickupDate}` : 'Dates Not Selected (2 Days Default)'}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#8A2BE2', fontWeight: 600, display: 'block' }}>
                        {billableDays} Billable Days
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={onOpenDateModal}
                      style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4C187C', textDecoration: 'underline' }}
                    >
                      Change
                    </button>
                  </div>

                  {/* Cart Items list */}
                  {cartItems.map((item) => {
                    const daily = Math.round(item.per_day_rent * durationMultiplier);
                    const itemTotal = daily * billableDays * item.qty;

                    return (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          gap: '12px',
                          padding: '12px',
                          borderRadius: '12px',
                          border: '1px solid #E2E8F0',
                          background: '#FFFFFF'
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '70px', height: '70px', objectFit: 'contain', background: '#F8FAFC', borderRadius: '8px', padding: '4px' }}
                        />
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B', lineHeight: 1.3 }}>
                              {item.name}
                            </h4>
                            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                              ₹{daily}/day &times; {billableDays} days
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
                            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#4C187C' }}>
                              ₹{itemTotal}
                            </span>

                            {/* Qty controls */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F1F5F9', borderRadius: '999px', padding: '2px 8px' }}>
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.id, item.qty - 1)}
                                style={{ color: '#475569', display: 'flex' }}
                                aria-label="Decrease quantity"
                              >
                                {item.qty === 1 ? <Trash2 size={13} color="#EF4444" /> : <Minus size={13} />}
                              </button>
                              <span style={{ fontSize: '0.8rem', fontWeight: 700, minWidth: '14px', textAlign: 'center' }}>
                                {item.qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.id, item.qty + 1)}
                                style={{ color: '#475569', display: 'flex' }}
                                aria-label="Increase quantity"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Assurances */}
                  <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={20} color="#16A34A" />
                    <div style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 600 }}>
                      <strong>Zero Security Deposit Applied:</strong> No hidden deposit holds on your card!
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {checkoutStep === 'checkout' && (
            <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1E293B' }}>
                  Delivery Details (Bangalore)
                </span>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #CBD5E1', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  MOBILE NUMBER *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #CBD5E1', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  COMPLETE ADDRESS (BANGALORE) *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Flat/House No., Street, Landmark, Indiranagar / Koramangala / HSR Layout..."
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #CBD5E1', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>
                  PAYMENT OPTION
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pod')}
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      border: paymentMethod === 'pod' ? '2px solid #8A2BE2' : '1px solid #CBD5E1',
                      background: paymentMethod === 'pod' ? '#F3E8FF' : '#FFFFFF',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      color: paymentMethod === 'pod' ? '#4C187C' : '#334155'
                    }}
                  >
                    Pay on Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      border: paymentMethod === 'upi' ? '2px solid #8A2BE2' : '1px solid #CBD5E1',
                      background: paymentMethod === 'upi' ? '#F3E8FF' : '#FFFFFF',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      color: paymentMethod === 'upi' ? '#4C187C' : '#334155'
                    }}
                  >
                    UPI / Online
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  style={{ flex: 1, padding: '12px', borderRadius: '999px', background: '#F1F5F9', fontWeight: 600, color: '#475569' }}
                >
                  Back to Cart
                </button>
                <button
                  type="submit"
                  className="sp-btn-rent"
                  style={{ flex: 2, padding: '12px', borderRadius: '999px', fontSize: '0.9rem' }}
                >
                  Confirm & Place Order
                </button>
              </div>
            </form>
          )}

          {checkoutStep === 'success' && (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <CheckCircle2 size={36} />
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B', marginBottom: '0.4rem' }}>
                Booking Confirmed!
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
                Your order ID is <strong>{orderId}</strong>. Our logistics pal will deliver the sanitized gaming console to your doorstep in Bangalore!
              </p>

              <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '14px', textAlign: 'left', marginBottom: '1.5rem', fontSize: '0.8rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div><strong>Customer:</strong> {customerName} ({customerPhone})</div>
                <div><strong>Delivery Address:</strong> {customerAddress}</div>
                <div><strong>Delivery Window:</strong> By 8:00 PM on delivery date</div>
                <div><strong>Payment:</strong> {paymentMethod === 'pod' ? 'Pay upon delivery' : 'UPI link sent to WhatsApp'}</div>
                <div><strong>Total Amount:</strong> ₹{subtotal}</div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClearCart();
                  setCheckoutStep('cart');
                  onClose();
                }}
                className="sp-btn-rent"
                style={{ width: '100%', padding: '12px' }}
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer (Summary & Checkout CTA) */}
        {checkoutStep === 'cart' && cartItems.length > 0 && (
          <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #E2E8F0', background: '#F8FAFC' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '1rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                <span>Rental Subtotal ({billableDays} days)</span>
                <span style={{ fontWeight: 600, color: '#1E293B' }}>₹{subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                <span>Security Deposit</span>
                <span style={{ fontWeight: 700, color: '#059669' }}>₹0 (Zero Deposit)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                <span>Doorstep Delivery & Pickup</span>
                <span style={{ fontWeight: 700, color: '#059669' }}>FREE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #E2E8F0', fontSize: '1.05rem', fontWeight: 800, color: '#1E293B' }}>
                <span>Total Amount</span>
                <span style={{ color: '#4C187C' }}>₹{subtotal}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCheckoutStep('checkout')}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '999px',
                background: '#4C187C',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(76, 24, 124, 0.35)'
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

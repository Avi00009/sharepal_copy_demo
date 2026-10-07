import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, Truck, ArrowRight, CheckCircle2, AlertCircle, Check } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  billableDays = 6,
  deliveryDate,
  pickupDate,
  onOpenDateModal
}) {
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPincode, setCustomerPincode] = useState('560001');
  const [paymentMethod, setPaymentMethod] = useState('pod'); // 'pod' (pay on delivery) | 'upi'
  const [orderId, setOrderId] = useState('');

  // Form Validation State
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  if (!isOpen) return null;

  // Validation Logic
  const validateField = (field, value) => {
    switch (field) {
      case 'name': {
        const val = (value || '').trim();
        if (!val) return 'Full name is required.';
        if (val.length < 2) return 'Name must be at least 2 characters.';
        if (!/^[a-zA-Z\s.']+$/.test(val)) return 'Name should contain letters only.';
        return '';
      }
      case 'phone': {
        const clean = (value || '').replace(/\D/g, '');
        if (!clean) return 'Mobile number is required.';
        if (!/^[6-9]/.test(clean)) return 'Indian mobile numbers must start with 6, 7, 8, or 9.';
        if (clean.length < 10) return `Enter complete 10-digit number (${clean.length}/10 digits).`;
        if (clean.length > 10) return 'Cannot exceed 10 digits.';
        return '';
      }
      case 'address': {
        const val = (value || '').trim();
        if (!val) return 'Complete delivery address is required.';
        if (val.length < 10) return `Address too short (${val.length}/10 chars min). Include house/flat no.`;
        return '';
      }
      case 'pincode': {
        const clean = (value || '').replace(/\D/g, '');
        if (!clean) return 'Bangalore pincode is required.';
        if (clean.length !== 6) return 'Pincode must be exactly 6 digits.';
        if (!clean.startsWith('56')) return 'Delivery is available for Bangalore (pincode starts with 56).';
        return '';
      }
      default:
        return '';
    }
  };

  const handleBlur = (field, value) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    setCustomerName(val);
    if (touched.name) {
      setErrors((prev) => ({ ...prev, name: validateField('name', val) }));
    }
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setCustomerPhone(val);
    if (touched.phone) {
      setErrors((prev) => ({ ...prev, phone: validateField('phone', val) }));
    }
  };

  const handleAddressChange = (e) => {
    const val = e.target.value;
    setCustomerAddress(val);
    if (touched.address) {
      setErrors((prev) => ({ ...prev, address: validateField('address', val) }));
    }
  };

  const handlePincodeChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCustomerPincode(val);
    if (touched.pincode) {
      setErrors((prev) => ({ ...prev, pincode: validateField('pincode', val) }));
    }
  };

  // Pricing calculations
  let durationMultiplier = 1;
  if (billableDays >= 7) durationMultiplier = 0.65;
  else if (billableDays >= 4) durationMultiplier = 0.85;

  const subtotal = cartItems.reduce((acc, item) => {
    const daily = Math.round(item.per_day_rent * durationMultiplier);
    return acc + daily * (billableDays || 6) * item.qty;
  }, 0);

  // Form submit handler with complete validation check
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateField('name', customerName),
      phone: validateField('phone', customerPhone),
      address: validateField('address', customerAddress),
      pincode: validateField('pincode', customerPincode)
    };

    setTouched({ name: true, phone: true, address: true, pincode: true });
    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((err) => Boolean(err));
    if (hasError) {
      return;
    }

    const genOrderId = 'SP-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(genOrderId);
    setCheckoutStep('success');
  };

  const isFormValid =
    !validateField('name', customerName) &&
    !validateField('phone', customerPhone) &&
    !validateField('address', customerAddress) &&
    !validateField('pincode', customerPincode);

  return (
    <>
      <div className="sp-drawer-overlay" onClick={onClose} role="dialog" aria-modal="true" />
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
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
          {checkoutStep === 'cart' && (
            <>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                  <div
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      background: '#F1F5F9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem auto',
                      color: '#94A3B8'
                    }}
                  >
                    <ShoppingBag size={32} />
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>
                    Your cart is empty
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
                    Explore our PlayStation 5, Xbox, and VR headsets to get started.
                  </p>
                  <button
                    type="button"
                    className="sp-btn-rent"
                    onClick={onClose}
                    style={{ padding: '10px 24px' }}
                  >
                    Browse Gaming Consoles
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Selected Rental Dates Banner */}
                  <div
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '10px',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.8rem'
                    }}
                  >
                    <div>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem', fontWeight: 600 }}>RENTAL PERIOD</span>
                      <strong style={{ color: '#1E293B' }}>{billableDays} Days</strong>
                      {deliveryDate && (
                        <span style={{ color: '#64748B', marginLeft: '6px' }}>
                          ({deliveryDate} to {pickupDate})
                        </span>
                      )}
                    </div>
                    {onOpenDateModal && (
                      <button
                        type="button"
                        onClick={onOpenDateModal}
                        style={{ color: '#8A2BE2', fontWeight: 700, fontSize: '0.75rem', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        Change Dates
                      </button>
                    )}
                  </div>

                  {/* Cart Items List */}
                  {cartItems.map((item) => {
                    const daily = Math.round(item.per_day_rent * durationMultiplier);
                    const itemTotal = daily * (billableDays || 6) * item.qty;

                    return (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          gap: '12px',
                          padding: '12px',
                          borderRadius: '12px',
                          border: '1px solid #F1F5F9',
                          background: '#FFFFFF',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: '68px',
                            height: '68px',
                            objectFit: 'contain',
                            background: '#F8FAFC',
                            borderRadius: '8px',
                            padding: '4px'
                          }}
                        />

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4
                            style={{
                              fontSize: '0.85rem',
                              fontWeight: 700,
                              color: '#1E293B',
                              marginBottom: '4px',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                            title={item.name}
                          >
                            {item.name}
                          </h4>

                          <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '8px' }}>
                            ₹{daily}/day &bull; Total ₹{itemTotal}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {/* Qty Stepper */}
                            <div
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                border: '1px solid #CBD5E1',
                                borderRadius: '6px',
                                background: '#FFFFFF'
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.id, item.qty - 1)}
                                style={{ padding: '3px 8px', color: '#475569', background: 'none', border: 'none', cursor: 'pointer' }}
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} />
                              </button>
                              <span style={{ fontSize: '0.8rem', fontWeight: 700, minWidth: '22px', textAlign: 'center' }}>
                                {item.qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.id, item.qty + 1)}
                                style={{ padding: '3px 8px', color: '#475569', background: 'none', border: 'none', cursor: 'pointer' }}
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.id)}
                              style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                              title="Remove item"
                              aria-label="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {checkoutStep === 'checkout' && (
            <form onSubmit={handlePlaceOrder} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1E293B' }}>
                  Delivery Details (Bangalore)
                </span>
              </div>

              {/* Full Name */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                    FULL NAME <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  {touched.name && !errors.name && (
                    <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <Check size={12} strokeWidth={3} /> Valid
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={customerName}
                  onChange={handleNameChange}
                  onBlur={() => handleBlur('name', customerName)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: touched.name && errors.name ? '1.5px solid #EF4444' : touched.name && !errors.name ? '1.5px solid #10B981' : '1.5px solid #CBD5E1',
                    outline: 'none',
                    fontSize: '0.88rem'
                  }}
                />
                {touched.name && errors.name && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#EF4444', fontSize: '0.74rem', marginTop: '4px', fontWeight: 600 }}>
                    <AlertCircle size={13} />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                    MOBILE NUMBER <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <span style={{ fontSize: '0.7rem', color: customerPhone.length === 10 ? '#10B981' : '#94A3B8', fontWeight: 600 }}>
                    {customerPhone.length}/10 digits
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span
                    style={{
                      padding: '10px 12px',
                      background: '#F1F5F9',
                      border: '1.5px solid #CBD5E1',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      color: '#334155',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    required
                    maxLength={10}
                    placeholder="98765 43210"
                    value={customerPhone}
                    onChange={handlePhoneChange}
                    onBlur={() => handleBlur('phone', customerPhone)}
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: touched.phone && errors.phone ? '1.5px solid #EF4444' : touched.phone && !errors.phone ? '1.5px solid #10B981' : '1.5px solid #CBD5E1',
                      outline: 'none',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      letterSpacing: '0.04em'
                    }}
                  />
                </div>
                {touched.phone && errors.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#EF4444', fontSize: '0.74rem', marginTop: '4px', fontWeight: 600 }}>
                    <AlertCircle size={13} />
                    <span>{errors.phone}</span>
                  </div>
                )}
              </div>

              {/* Pincode */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                    BANGALORE PINCODE <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <span style={{ fontSize: '0.7rem', color: customerPincode.length === 6 ? '#10B981' : '#94A3B8', fontWeight: 600 }}>
                    {customerPincode.length}/6 digits
                  </span>
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  maxLength={6}
                  placeholder="560001"
                  value={customerPincode}
                  onChange={handlePincodeChange}
                  onBlur={() => handleBlur('pincode', customerPincode)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: touched.pincode && errors.pincode ? '1.5px solid #EF4444' : touched.pincode && !errors.pincode ? '1.5px solid #10B981' : '1.5px solid #CBD5E1',
                    outline: 'none',
                    fontSize: '0.88rem'
                  }}
                />
                {touched.pincode && errors.pincode && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#EF4444', fontSize: '0.74rem', marginTop: '4px', fontWeight: 600 }}>
                    <AlertCircle size={13} />
                    <span>{errors.pincode}</span>
                  </div>
                )}
              </div>

              {/* Address */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                    COMPLETE ADDRESS (BANGALORE) <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                </div>
                <textarea
                  required
                  rows={3}
                  placeholder="Flat/House No., Street, Landmark, Indiranagar / Koramangala / HSR Layout..."
                  value={customerAddress}
                  onChange={handleAddressChange}
                  onBlur={() => handleBlur('address', customerAddress)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: touched.address && errors.address ? '1.5px solid #EF4444' : touched.address && !errors.address ? '1.5px solid #10B981' : '1.5px solid #CBD5E1',
                    outline: 'none',
                    resize: 'vertical',
                    fontSize: '0.85rem'
                  }}
                />
                {touched.address && errors.address && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#EF4444', fontSize: '0.74rem', marginTop: '4px', fontWeight: 600 }}>
                    <AlertCircle size={13} />
                    <span>{errors.address}</span>
                  </div>
                )}
              </div>

              {/* Payment Method */}
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
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      color: paymentMethod === 'pod' ? '#4C187C' : '#334155',
                      cursor: 'pointer'
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
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      color: paymentMethod === 'upi' ? '#4C187C' : '#334155',
                      cursor: 'pointer'
                    }}
                  >
                    UPI / Online
                  </button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  style={{ flex: 1, padding: '12px', borderRadius: '999px', background: '#F1F5F9', fontWeight: 600, color: '#475569', border: 'none', cursor: 'pointer' }}
                >
                  Back to Cart
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="sp-btn-rent"
                  style={{
                    flex: 2,
                    padding: '12px',
                    borderRadius: '999px',
                    fontSize: '0.9rem',
                    background: isFormValid ? '#4C187C' : '#94A3B8',
                    cursor: isFormValid ? 'pointer' : 'not-allowed',
                    border: 'none',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    boxShadow: isFormValid ? '0 4px 14px rgba(76, 24, 124, 0.3)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  Confirm &amp; Place Order
                </button>
              </div>
            </form>
          )}

          {checkoutStep === 'success' && (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  background: '#ECFDF5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto'
                }}
              >
                <CheckCircle2 size={42} />
              </div>

              <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1E293B', marginBottom: '0.5rem' }}>
                Order Confirmed!
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1.5rem' }}>
                Order ID: <strong style={{ color: '#4C187C' }}>{orderId}</strong>
                <br />
                Our Bangalore operations team will deliver your gear between 5 PM and 11 PM on your scheduled delivery date.
              </p>

              <div
                style={{
                  background: '#F8FAFC',
                  borderRadius: '12px',
                  padding: '14px',
                  textAlign: 'left',
                  marginBottom: '1.75rem',
                  fontSize: '0.825rem',
                  color: '#334155'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span>Recipient:</span>
                  <strong>{customerName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span>Contact:</span>
                  <strong>+91 {customerPhone}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span>Pincode:</span>
                  <strong>{customerPincode}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span>Payment:</span>
                  <strong>{paymentMethod === 'pod' ? 'Pay on Delivery' : 'UPI Online'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '6px', marginTop: '6px' }}>
                  <span>Security Deposit:</span>
                  <strong style={{ color: '#059669' }}>₹0 (Zero Deposit)</strong>
                </div>
              </div>

              <button
                type="button"
                className="sp-btn-rent"
                onClick={() => {
                  onClearCart();
                  setCheckoutStep('cart');
                  onClose();
                }}
                style={{ width: '100%', padding: '12px', borderRadius: '999px' }}
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer (Only on Cart step) */}
        {checkoutStep === 'cart' && cartItems.length > 0 && (
          <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #E2E8F0', background: '#F8FAFC' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: '#059669', fontSize: '0.75rem', fontWeight: 600 }}>
              <ShieldCheck size={16} />
              <span>₹0 Security Deposit &bull; Free Doorstep Delivery &amp; Pickup</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'block' }}>Estimated Total</span>
                <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600 }}>Incl. all taxes &amp; GST</span>
              </div>
              <span style={{ fontSize: '1.45rem', fontWeight: 800, color: '#1E293B' }}>
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              type="button"
              className="sp-btn-rent"
              onClick={() => setCheckoutStep('checkout')}
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: '999px',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
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

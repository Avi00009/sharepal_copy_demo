import React, { useState } from 'react';
import { X, Smartphone, ShieldCheck, CheckCircle2, ArrowRight, RefreshCw, User, LogOut } from 'lucide-react';
import SharePalLogo from './SharePalLogo';

export default function LoginModal({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout
}) {
  const [step, setStep] = useState('phone'); // 'phone' | 'otp' | 'profile_view'
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState(['1', '2', '3', '4']);
  const [resendTimer, setResendTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  // If already logged in, show profile menu
  if (currentUser && step !== 'otp') {
    return (
      <div className="sp-modal-overlay" onClick={onClose}>
        <div className="sp-modal-content" style={{ maxWidth: '420px' }} onClick={(e) => e.stopPropagation()}>
          <div className="sp-modal-header">
            <h3 className="sp-modal-title">My Account</h3>
            <button className="sp-modal-close" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>
          </div>

          <div className="sp-modal-body" style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#F3E8FF',
                color: '#4C187C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 800,
                margin: '0 auto 1rem',
                border: '2px solid #8A2BE2'
              }}
            >
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </div>

            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1E293B' }}>
              {currentUser.name || 'SharePal Gamer'}
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
              +91 {currentUser.phone}
            </p>

            <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '12px', border: '1px solid #E2E8F0', marginBottom: '1.5rem', textAlign: 'left', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Account Status:</span>
                <strong style={{ color: '#059669' }}>KYC Verified &bull; Active</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>City:</span>
                <strong>Bangalore</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Security Deposit:</span>
                <strong style={{ color: '#059669' }}>₹0 Zero Deposit Eligible</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onLogout();
                onClose();
              }}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '999px',
                background: '#FEE2E2',
                color: '#DC2626',
                fontWeight: 700,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSendOtp = (e) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 500);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 4) {
      alert("Please enter the 4-digit verification code.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const userObj = {
        name: name.trim() || 'Gamer Pal',
        phone: phone.replace(/\D/g, '')
      };

      onLoginSuccess(userObj);
      onClose();
    }, 500);
  };

  return (
    <div className="sp-modal-overlay" onClick={onClose}>
      <div className="sp-modal-content" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sp-modal-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ background: '#4C187C', padding: '6px 12px', borderRadius: '8px' }}>
              <SharePalLogo height={16} />
            </div>
          </div>
          <button className="sp-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="sp-modal-body">
          {step === 'phone' ? (
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1E293B', marginBottom: '0.4rem', fontFamily: 'var(--font-family-heading)' }}>
                Login or Sign Up
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
                Enter your phone number to access your cart, bookings, and instant Zero Deposit verification.
              </p>

              <form onSubmit={handleSendOtp}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>
                    YOUR NAME (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.9rem',
                      outline: 'none',
                      marginBottom: '1rem'
                    }}
                  />

                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>
                    MOBILE NUMBER *
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span
                      style={{
                        padding: '10px 12px',
                        background: '#F1F5F9',
                        border: '1.5px solid #CBD5E1',
                        borderRadius: '10px',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        color: '#334155'
                      }}
                    >
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '1rem',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', color: '#059669', fontSize: '0.75rem', fontWeight: 600 }}>
                  <ShieldCheck size={16} />
                  <span>Secure OTP verification &bull; 100% Privacy Protected</span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '999px',
                    background: '#4C187C',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(76, 24, 124, 0.3)',
                    cursor: 'pointer'
                  }}
                >
                  <span>{isLoading ? 'Sending OTP...' : 'Send OTP & Continue'}</span>
                  <ArrowRight size={18} />
                </button>
              </form>

              <p style={{ fontSize: '0.7rem', color: '#94A3B8', textAlign: 'center', marginTop: '1.25rem', lineHeight: '1.4' }}>
                By proceeding, you agree to SharePal&apos;s <a href="#" style={{ textDecoration: 'underline' }}>Terms of Use</a> &amp; <a href="#" style={{ textDecoration: 'underline' }}>Privacy Policy</a>.
              </p>
            </div>
          ) : (
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1E293B', marginBottom: '0.4rem', fontFamily: 'var(--font-family-heading)' }}>
                Verify with OTP
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
                Enter the 4-digit code sent to <strong>+91 {phone}</strong>.{' '}
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  style={{ color: '#8A2BE2', fontWeight: 700, textDecoration: 'underline' }}
                >
                  Edit
                </button>
              </p>

              {/* Demo Hint */}
              <div style={{ background: '#F3E8FF', border: '1px solid #D8B4FE', borderRadius: '8px', padding: '8px 12px', marginBottom: '1.25rem', fontSize: '0.75rem', color: '#6B21A8' }}>
                💡 <strong>Demo Mode:</strong> Use code <code>1234</code> or any 4 digits to sign in instantly.
              </div>

              <form onSubmit={handleVerifyOtp}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const val = e.target.value;
                        const newOtp = [...otp];
                        newOtp[idx] = val;
                        setOtp(newOtp);
                        if (val && idx < 3) {
                          document.getElementById(`otp-input-${idx + 1}`)?.focus();
                        }
                      }}
                      style={{
                        width: '54px',
                        height: '56px',
                        textAlign: 'center',
                        fontSize: '1.4rem',
                        fontWeight: 800,
                        color: '#4C187C',
                        border: '2px solid #8A2BE2',
                        borderRadius: '12px',
                        outline: 'none',
                        background: '#FAF5FF'
                      }}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '999px',
                    background: '#4C187C',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(76, 24, 124, 0.3)',
                    cursor: 'pointer'
                  }}
                >
                  <CheckCircle2 size={18} />
                  <span>{isLoading ? 'Verifying...' : 'Verify & Sign In'}</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

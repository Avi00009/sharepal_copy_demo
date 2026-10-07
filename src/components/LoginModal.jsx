import React, { useState } from 'react';
import { X, Smartphone, ShieldCheck, CheckCircle2, ArrowRight, RefreshCw, User, LogOut, AlertCircle, Check } from 'lucide-react';
import SharePalLogo from './SharePalLogo';

export default function LoginModal({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout
}) {
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  // Validation States
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [touchedPhone, setTouchedPhone] = useState(false);

  if (!isOpen) return null;

  // Real-time phone validator
  const validatePhoneNumber = (raw) => {
    const clean = raw.replace(/\D/g, '');
    if (!clean) {
      return 'Mobile number is required.';
    }
    if (!/^[6-9]/.test(clean)) {
      return 'Indian mobile numbers must start with 6, 7, 8, or 9.';
    }
    if (clean.length < 10) {
      return `Please enter complete 10-digit number (${clean.length}/10 digits).`;
    }
    if (clean.length > 10) {
      return 'Mobile number cannot exceed 10 digits.';
    }
    return '';
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);
    if (touchedPhone) {
      setPhoneError(validatePhoneNumber(val));
    }
  };

  const handlePhoneBlur = () => {
    setTouchedPhone(true);
    setPhoneError(validatePhoneNumber(phone));
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    if (val && !/^[a-zA-Z\s.']*$/.test(val)) {
      setNameError('Name should only contain letters.');
      return;
    }
    setName(val);
    setNameError('');
  };

  // If already logged in, show user profile view
  if (currentUser) {
    return (
      <div className="sp-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
        <div className="sp-modal-content" style={{ maxWidth: '420px' }} onClick={(e) => e.stopPropagation()}>
          <div className="sp-modal-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
            <div />
            <button className="sp-modal-close" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>
          </div>

          <div style={{ textAlign: 'center', padding: '1rem 1.5rem 2rem 1.5rem' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: '#F3E8FF',
                color: '#4C187C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}
            >
              <User size={36} />
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1E293B', marginBottom: '0.25rem' }}>
              {currentUser.name || 'Gamer Pal'}
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1.5rem' }}>
              +91 {currentUser.phone}
            </p>

            <div
              style={{
                background: '#ECFDF5',
                border: '1px solid #A7F3D0',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#065F46',
                fontSize: '0.825rem',
                fontWeight: 600,
                marginBottom: '1.75rem'
              }}
            >
              <CheckCircle2 size={18} color="#059669" />
              <span>SharePal Verified Renter &bull; Zero Deposit Active</span>
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
                cursor: 'pointer',
                border: 'none',
                transition: 'background 0.15s ease'
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
    setTouchedPhone(true);
    const err = validatePhoneNumber(phone);
    if (err) {
      setPhoneError(err);
      return;
    }

    setPhoneError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 400);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 4) {
      setOtpError('Please enter the full 4-digit verification code.');
      return;
    }
    if (!/^\d{4}$/.test(enteredOtp)) {
      setOtpError('Code must contain only numeric digits.');
      return;
    }

    setOtpError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const userObj = {
        name: name.trim() || 'Gamer Pal',
        phone: phone.replace(/\D/g, '')
      };

      onLoginSuccess(userObj);
      onClose();
    }, 400);
  };

  // Handle Paste inside OTP
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (/^\d{4}$/.test(pasteData)) {
      const digits = pasteData.split('');
      setOtp(digits);
      setOtpError('');
      document.getElementById('otp-input-3')?.focus();
    }
  };

  const isPhoneValid = phone.length === 10 && /^[6-9]\d{9}$/.test(phone);

  return (
    <div className="sp-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="sp-modal-content" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sp-modal-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
          <div />
          <button className="sp-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '0.5rem 1.75rem 2rem 1.75rem' }}>
          {step === 'phone' ? (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ marginBottom: '0.75rem' }}>
                  <SharePalLogo height={28} />
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1E293B', marginBottom: '0.25rem' }}>
                  Login or Sign Up
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
                  Zero Deposit verified rentals in Bangalore
                </p>
              </div>

              <form onSubmit={handleSendOtp} noValidate>
                {/* Optional Name */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>
                    YOUR NAME (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    maxLength={50}
                    value={name}
                    onChange={handleNameChange}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: nameError ? '1.5px solid #EF4444' : '1.5px solid #CBD5E1',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'border-color 0.15s ease'
                    }}
                  />
                  {nameError && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#EF4444', fontSize: '0.75rem', marginTop: '4px', fontWeight: 600 }}>
                      <AlertCircle size={13} />
                      <span>{nameError}</span>
                    </div>
                  )}
                </div>

                {/* Mobile Number */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                      MOBILE NUMBER <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <span style={{ fontSize: '0.7rem', color: phone.length === 10 ? '#059669' : '#94A3B8', fontWeight: 600 }}>
                      {phone.length}/10 digits
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span
                      style={{
                        padding: '10px 12px',
                        background: '#F1F5F9',
                        border: '1.5px solid #CBD5E1',
                        borderRadius: '10px',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        color: '#334155',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      +91
                    </span>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <input
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        required
                        maxLength={10}
                        placeholder="98765 43210"
                        value={phone}
                        onChange={handlePhoneChange}
                        onBlur={handlePhoneBlur}
                        style={{
                          width: '100%',
                          padding: '10px 36px 10px 14px',
                          borderRadius: '10px',
                          border: phoneError
                            ? '1.5px solid #EF4444'
                            : isPhoneValid
                            ? '1.5px solid #10B981'
                            : '1.5px solid #CBD5E1',
                          fontSize: '1rem',
                          fontWeight: 600,
                          letterSpacing: '0.05em',
                          outline: 'none',
                          transition: 'border-color 0.15s ease'
                        }}
                      />
                      {isPhoneValid && (
                        <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#10B981' }}>
                          <Check size={18} strokeWidth={2.5} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Inline Error Message */}
                  {phoneError && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#EF4444', fontSize: '0.75rem', marginTop: '6px', fontWeight: 600 }}>
                      <AlertCircle size={14} style={{ flexShrink: 0 }} />
                      <span>{phoneError}</span>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', color: '#059669', fontSize: '0.75rem', fontWeight: 600 }}>
                  <ShieldCheck size={16} />
                  <span>Secure OTP verification &bull; 100% Privacy Protected</span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !isPhoneValid}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '999px',
                    background: isPhoneValid ? '#4C187C' : '#94A3B8',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: isPhoneValid ? '0 4px 12px rgba(76, 24, 124, 0.3)' : 'none',
                    cursor: isPhoneValid ? 'pointer' : 'not-allowed',
                    border: 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{isLoading ? 'Sending OTP...' : 'Send OTP & Continue'}</span>
                  <ArrowRight size={18} />
                </button>
              </form>

              <p style={{ fontSize: '0.7rem', color: '#94A3B8', textAlign: 'center', marginTop: '1.25rem', lineHeight: '1.4' }}>
                By proceeding, you agree to SharePal&apos;s <a href="https://sharepal.in/terms" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>Terms of Use</a> &amp; <a href="https://sharepal.in/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>Privacy Policy</a>.
              </p>
            </div>
          ) : (
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1E293B', marginBottom: '0.4rem' }}>
                Verify with OTP
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
                Enter the 4-digit code sent to <strong>+91 {phone}</strong>.{' '}
                <button
                  type="button"
                  onClick={() => {
                    setStep('phone');
                    setOtpError('');
                  }}
                  style={{ color: '#8A2BE2', fontWeight: 700, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Edit
                </button>
              </p>

              {/* Demo Hint */}
              <div style={{ background: '#F3E8FF', border: '1px solid #D8B4FE', borderRadius: '8px', padding: '8px 12px', marginBottom: '1.25rem', fontSize: '0.75rem', color: '#6B21A8' }}>
                💡 <strong>Demo Mode:</strong> Use code <code>1234</code> or any 4 digits to sign in instantly.
              </div>

              <form onSubmit={handleVerifyOtp}>
                <div
                  style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '0.75rem' }}
                  onPaste={handleOtpPaste}
                >
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        const newOtp = [...otp];
                        newOtp[idx] = val;
                        setOtp(newOtp);
                        setOtpError('');
                        if (val && idx < 3) {
                          document.getElementById(`otp-input-${idx + 1}`)?.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !digit && idx > 0) {
                          document.getElementById(`otp-input-${idx - 1}`)?.focus();
                        }
                      }}
                      style={{
                        width: '54px',
                        height: '56px',
                        textAlign: 'center',
                        fontSize: '1.4rem',
                        fontWeight: 800,
                        color: '#1E293B',
                        borderRadius: '12px',
                        border: otpError ? '2px solid #EF4444' : digit ? '2px solid #8A2BE2' : '1.5px solid #CBD5E1',
                        background: digit ? '#FAF5FF' : '#FFFFFF',
                        outline: 'none',
                        transition: 'all 0.15s ease'
                      }}
                    />
                  ))}
                </div>

                {/* Inline OTP Error */}
                {otpError && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', color: '#EF4444', fontSize: '0.75rem', marginBottom: '1rem', fontWeight: 600 }}>
                    <AlertCircle size={14} />
                    <span>{otpError}</span>
                  </div>
                )}

                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setOtp(['1', '2', '3', '4']);
                      setOtpError('');
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#4C187C',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <RefreshCw size={13} />
                    <span>Auto-fill Demo Code (1234)</span>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || otp.join('').length !== 4}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '999px',
                    background: otp.join('').length === 4 ? '#4C187C' : '#94A3B8',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    border: 'none',
                    cursor: otp.join('').length === 4 ? 'pointer' : 'not-allowed',
                    boxShadow: otp.join('').length === 4 ? '0 4px 12px rgba(76, 24, 124, 0.3)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {isLoading ? 'Verifying...' : 'Verify & Continue'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

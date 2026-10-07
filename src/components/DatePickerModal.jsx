import React, { useState, useMemo } from 'react';
import { Calendar, X, ChevronLeft, ChevronRight, Info, Percent } from 'lucide-react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const SHORT_MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function getOrdinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function formatDateDisplay(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  if (isNaN(d.getTime())) return '';
  const month = SHORT_MONTH_NAMES[d.getMonth()];
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  return `${month} ${day}, ${year}`;
}

export default function DatePickerModal({
  isOpen,
  onClose,
  deliveryDate,
  pickupDate,
  onApplyDates
}) {
  if (!isOpen) return null;

  // Initialize dates
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  // Today string YYYY-MM-DD
  const todayStr = useMemo(() => {
    return today.toISOString().split('T')[0];
  }, [today]);

  // Selected delivery & pickup
  const [selectedDelivery, setSelectedDelivery] = useState(() => {
    if (deliveryDate) return deliveryDate;
    const d = new Date(today.getTime() + 86400000 * 2); // default 2 days out
    return d.toISOString().split('T')[0];
  });

  const [selectedPickup, setSelectedPickup] = useState(() => {
    if (pickupDate) return pickupDate;
    const d = new Date(today.getTime() + 86400000 * 9); // default 9 days out (7 days gap)
    return d.toISOString().split('T')[0];
  });

  // Calendar View month (starts at delivery date month)
  const [viewYearMonth, setViewYearMonth] = useState(() => {
    const initDate = selectedDelivery ? new Date(selectedDelivery + 'T00:00:00') : today;
    return {
      year: initDate.getFullYear(),
      month: initDate.getMonth()
    };
  });

  // Hover state for interactive selection preview
  const [hoverDate, setHoverDate] = useState(null);

  // Billable calculation
  const rentalStats = useMemo(() => {
    if (!selectedDelivery || !selectedPickup) {
      return { days: 0, chargeableText: 'Select dates', valid: false };
    }

    const dDeliv = new Date(selectedDelivery + 'T00:00:00');
    const dPick = new Date(selectedPickup + 'T00:00:00');

    if (dPick <= dDeliv) {
      return { days: 0, chargeableText: 'Invalid period', valid: false };
    }

    const diffMs = dPick.getTime() - dDeliv.getTime();
    const rawDiffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    // SharePal policy: rental starts day after delivery and ends day before pickup
    // E.g. Nov 3 to Nov 10 => 7 raw days. Chargeable is Nov 4 to Nov 9 (6 days).
    const billableDays = Math.max(1, rawDiffDays - 1);

    const chargeStart = new Date(dDeliv.getTime() + 86400000);
    const chargeEnd = new Date(dPick.getTime() - 86400000);

    const startStr = `${getOrdinal(chargeStart.getDate())} ${SHORT_MONTH_NAMES[chargeStart.getMonth()]}`;
    const endStr = `${getOrdinal(chargeEnd.getDate())} ${SHORT_MONTH_NAMES[chargeEnd.getMonth()]}`;

    return {
      days: billableDays,
      chargeableText: `${startStr} - ${endStr}`,
      valid: true
    };
  }, [selectedDelivery, selectedPickup]);

  // Navigate calendar months
  const handlePrevMonth = () => {
    setViewYearMonth((prev) => {
      let newMonth = prev.month - 1;
      let newYear = prev.year;
      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      }
      return { year: newYear, month: newMonth };
    });
  };

  const handleNextMonth = () => {
    setViewYearMonth((prev) => {
      let newMonth = prev.month + 1;
      let newYear = prev.year;
      if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }
      return { year: newYear, month: newMonth };
    });
  };

  // Date selection handling
  const handleDateClick = (dateStr) => {
    if (!selectedDelivery || (selectedDelivery && selectedPickup)) {
      // First click: start new range
      setSelectedDelivery(dateStr);
      setSelectedPickup(null);
    } else if (selectedDelivery && !selectedPickup) {
      // Second click: finish range
      if (dateStr < selectedDelivery) {
        setSelectedDelivery(dateStr);
        setSelectedPickup(null);
      } else if (dateStr === selectedDelivery) {
        // Same date: must be at least 2 days apart for SharePal rental
        const nextDay = new Date(new Date(dateStr + 'T00:00:00').getTime() + 86400000 * 2);
        setSelectedPickup(nextDay.toISOString().split('T')[0]);
      } else {
        setSelectedPickup(dateStr);
      }
    }
  };

  // Submit
  const handleContinue = () => {
    if (!rentalStats.valid || !selectedDelivery || !selectedPickup) {
      alert('Please select both delivery and pickup dates.');
      return;
    }
    onApplyDates(selectedDelivery, selectedPickup, rentalStats.days);
    onClose();
  };

  // Generate month data helper
  const getMonthDays = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startWeekday = firstDay.getDay(); // 0 is Sunday
    const totalDays = lastDay.getDate();

    // Days from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevDays = [];
    for (let i = startWeekday - 1; i >= 0; i--) {
      prevDays.push({
        dayNum: prevMonthLastDay - i,
        isOtherMonth: true,
        dateStr: ''
      });
    }

    // Days in current month
    const currentDays = [];
    for (let i = 1; i <= totalDays; i++) {
      const monthPadded = String(month + 1).padStart(2, '0');
      const dayPadded = String(i).padStart(2, '0');
      const dateStr = `${year}-${monthPadded}-${dayPadded}`;
      const isPast = dateStr < todayStr;
      currentDays.push({
        dayNum: i,
        isOtherMonth: false,
        dateStr,
        isPast
      });
    }

    // Days from next month to fill complete weeks
    const remaining = (7 - ((prevDays.length + currentDays.length) % 7)) % 7;
    const nextDays = [];
    for (let i = 1; i <= remaining; i++) {
      nextDays.push({
        dayNum: i,
        isOtherMonth: true,
        dateStr: ''
      });
    }

    return [...prevDays, ...currentDays, ...nextDays];
  };

  // Month 1 and Month 2 definitions
  const month1 = viewYearMonth;
  const month2 = useMemo(() => {
    let m = viewYearMonth.month + 1;
    let y = viewYearMonth.year;
    if (m > 11) {
      m = 0;
      y += 1;
    }
    return { year: y, month: m };
  }, [viewYearMonth]);

  const month1Days = useMemo(() => getMonthDays(month1.year, month1.month), [month1]);
  const month2Days = useMemo(() => getMonthDays(month2.year, month2.month), [month2]);

  // Check date role helper
  const getDateStatus = (dateStr) => {
    if (!dateStr) return { isStart: false, isEnd: false, isInRange: false };

    const isStart = dateStr === selectedDelivery;
    const isEnd = dateStr === selectedPickup;

    let isInRange = false;
    if (selectedDelivery && selectedPickup) {
      isInRange = dateStr > selectedDelivery && dateStr < selectedPickup;
    } else if (selectedDelivery && hoverDate && hoverDate > selectedDelivery) {
      isInRange = dateStr > selectedDelivery && dateStr < hoverDate;
    }

    return { isStart, isEnd, isInRange };
  };

  return (
    <div className="sp-cal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="sp-cal-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sp-cal-header">
          <h2 className="sp-cal-title">Select your Dates</h2>
          <button
            type="button"
            className="sp-cal-close-btn"
            onClick={onClose}
            aria-label="Close date picker"
          >
            <X size={20} />
          </button>
        </div>

        {/* Main Content: 2-Column Split */}
        <div className="sp-cal-body">
          {/* Left Column: Inputs & Duration & Savings & Action */}
          <div className="sp-cal-left-col">
            {/* Delivery & Pickup Inputs */}
            <div className="sp-cal-inputs-row">
              <div className="sp-cal-input-group">
                <label className="sp-cal-input-label">
                  Delivery Date <span className="sp-cal-required">*</span>
                </label>
                <div className="sp-cal-input-box">
                  <Calendar size={17} className="sp-cal-input-icon" />
                  <span className="sp-cal-input-text">
                    {formatDateDisplay(selectedDelivery) || 'Select date'}
                  </span>
                </div>
              </div>

              <div className="sp-cal-input-group">
                <label className="sp-cal-input-label">
                  Pickup Date <span className="sp-cal-required">*</span>
                </label>
                <div className="sp-cal-input-box">
                  <Calendar size={17} className="sp-cal-input-icon" />
                  <span className="sp-cal-input-text">
                    {formatDateDisplay(selectedPickup) || 'Select date'}
                  </span>
                </div>
              </div>
            </div>

            {/* Same-Day & Slot Info Banner */}
            <div className="sp-cal-info-card">
              <div className="sp-cal-info-icon-wrapper">
                <Info size={16} />
              </div>
              <p className="sp-cal-info-text">
                <strong>Same-day delivery</strong> between <strong>5PM and 11PM</strong> For future dates, you can select a specific time slot available at checkout. We pickup between <strong>9AM to 1PM</strong>.
              </p>
            </div>

            {/* Rental Period Card */}
            <div className="sp-cal-period-section">
              <span className="sp-cal-period-title">Your Rental Period:</span>
              <div className="sp-cal-period-card">
                <div className="sp-cal-days-counter">
                  <span className="sp-cal-days-num">
                    {String(rentalStats.days).padStart(2, '0')}
                  </span>
                  <span className="sp-cal-days-unit">Days</span>
                </div>
                <div className="sp-cal-chargeable-wrap">
                  <span className="sp-cal-chargeable-label">Chargeable Period:</span>
                  <div className="sp-cal-chargeable-val">
                    <Calendar size={15} className="sp-cal-charge-icon" />
                    <span>{rentalStats.chargeableText}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dark "Save more with us!" Banner */}
            <div className="sp-cal-savings-card">
              <div className="sp-cal-savings-header">
                <div className="sp-cal-savings-badge">
                  <Percent size={14} strokeWidth={3} />
                </div>
                <h4 className="sp-cal-savings-heading">Save more with us!</h4>
              </div>
              <p className="sp-cal-savings-desc">
                Longer rental periods mean bigger savings—enjoy discounts of up to 12%. We don't charge you for deliver and pickup days!
              </p>
            </div>

            {/* Continue Button */}
            <button
              type="button"
              className="sp-cal-continue-btn"
              onClick={handleContinue}
              disabled={!rentalStats.valid}
            >
              Continue
            </button>
          </div>

          {/* Right Column: 2-Month Dual Calendar */}
          <div className="sp-cal-right-col">
            <div className="sp-cal-dual-wrapper">
              {/* Header Navigation */}
              <div className="sp-cal-nav-bar">
                <button
                  type="button"
                  className="sp-cal-nav-btn"
                  onClick={handlePrevMonth}
                  aria-label="Previous month"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="sp-cal-month-titles">
                  <div className="sp-cal-m-title">
                    {MONTH_NAMES[month1.month]} {month1.year}
                  </div>
                  <div className="sp-cal-m-title">
                    {MONTH_NAMES[month2.month]} {month2.year}
                  </div>
                </div>

                <button
                  type="button"
                  className="sp-cal-nav-btn"
                  onClick={handleNextMonth}
                  aria-label="Next month"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Dual Month Grids */}
              <div className="sp-cal-months-grid">
                {/* Month 1 */}
                <div className="sp-cal-single-month">
                  <div className="sp-cal-mobile-m-title">
                    {MONTH_NAMES[month1.month]} {month1.year}
                  </div>
                  <div className="sp-cal-weekdays">
                    {WEEK_DAYS.map((wd) => (
                      <span key={wd} className="sp-cal-wd">
                        {wd}
                      </span>
                    ))}
                  </div>
                  <div className="sp-cal-days-grid">
                    {month1Days.map((d, idx) => {
                      if (d.isOtherMonth) {
                        return (
                          <div key={idx} className="sp-cal-day-cell other-month">
                            <span>{d.dayNum}</span>
                          </div>
                        );
                      }
                      const { isStart, isEnd, isInRange } = getDateStatus(d.dateStr);
                      return (
                        <div
                          key={d.dateStr}
                          className={`sp-cal-day-cell ${d.isPast ? 'disabled' : ''} ${
                            isStart ? 'range-start' : ''
                          } ${isEnd ? 'range-end' : ''} ${isInRange ? 'in-range' : ''}`}
                          onClick={() => !d.isPast && handleDateClick(d.dateStr)}
                          onMouseEnter={() => !d.isPast && setHoverDate(d.dateStr)}
                          onMouseLeave={() => setHoverDate(null)}
                        >
                          <span className="sp-cal-day-number">{d.dayNum}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Month 2 */}
                <div className="sp-cal-single-month">
                  <div className="sp-cal-mobile-m-title">
                    {MONTH_NAMES[month2.month]} {month2.year}
                  </div>
                  <div className="sp-cal-weekdays">
                    {WEEK_DAYS.map((wd) => (
                      <span key={wd} className="sp-cal-wd">
                        {wd}
                      </span>
                    ))}
                  </div>
                  <div className="sp-cal-days-grid">
                    {month2Days.map((d, idx) => {
                      if (d.isOtherMonth) {
                        return (
                          <div key={idx} className="sp-cal-day-cell other-month">
                            <span>{d.dayNum}</span>
                          </div>
                        );
                      }
                      const { isStart, isEnd, isInRange } = getDateStatus(d.dateStr);
                      return (
                        <div
                          key={d.dateStr}
                          className={`sp-cal-day-cell ${d.isPast ? 'disabled' : ''} ${
                            isStart ? 'range-start' : ''
                          } ${isEnd ? 'range-end' : ''} ${isInRange ? 'in-range' : ''}`}
                          onClick={() => !d.isPast && handleDateClick(d.dateStr)}
                          onMouseEnter={() => !d.isPast && setHoverDate(d.dateStr)}
                          onMouseLeave={() => setHoverDate(null)}
                        >
                          <span className="sp-cal-day-number">{d.dayNum}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

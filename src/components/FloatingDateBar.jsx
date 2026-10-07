import React from 'react';
import { Calendar } from 'lucide-react';

export default function FloatingDateBar({ isDatesSelected, onOpenDateModal }) {
  if (isDatesSelected) return null;

  return (
    <div
      className="sp-floating-date-bar"
      onClick={onOpenDateModal}
      role="button"
      tabIndex={0}
      title="Select rental dates to view accurate prices"
    >
      <Calendar size={18} color="#9EFF00" />
      <span>Select rental dates to view prices</span>
    </div>
  );
}

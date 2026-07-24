import React from 'react';

export function Card({ children, className = '', hover = true, glow = false }) {
  return (
    <div
      className={`relative rounded-xl border border-zinc-800 bg-surface-dark/80 backdrop-blur-xl p-6 overflow-hidden transition-all duration-300 ${
        hover ? 'hover:border-zinc-700 hover:bg-[#151824] hover:shadow-xl hover:-translate-y-0.5' : ''
      } ${glow ? 'shadow-[0_0_30px_rgba(56,189,248,0.08)] border-cyan-500/30' : ''} ${className}`}
    >
      {glow && (
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      )}
      {children}
    </div>
  );
}

import React from 'react';

export function Badge({ children, variant = 'cyan', className = '' }) {
  const variants = {
    cyan: 'bg-cyan-950/60 text-cyan-400 border-cyan-800/60 shadow-[0_0_12px_rgba(56,189,248,0.15)]',
    indigo: 'bg-indigo-950/60 text-indigo-400 border-indigo-800/60 shadow-[0_0_12px_rgba(99,102,241,0.15)]',
    emerald: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60 shadow-[0_0_12px_rgba(16,185,129,0.15)]',
    amber: 'bg-amber-950/60 text-amber-400 border-amber-800/60 shadow-[0_0_12px_rgba(245,158,11,0.15)]',
    zinc: 'bg-zinc-900/80 text-zinc-300 border-zinc-700/80'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium rounded-full border backdrop-blur-md ${variants[variant] || variants.cyan} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {children}
    </span>
  );
}

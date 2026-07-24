import React from 'react';
import Link from 'next/link';

export function Button({ 
  children, 
  href, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon: Icon,
  external = false,
  type = 'button'
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variants = {
    primary: 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/20 border border-cyan-400/30',
    secondary: 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-100 border border-zinc-700/80 hover:border-zinc-500 shadow-sm',
    outline: 'bg-transparent text-cyan-400 hover:bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-400',
    ghost: 'bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5 font-semibold'
  };

  const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  const content = (
    <>
      {children}
      {Icon && <Icon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`group ${combinedClasses}`}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={`group ${combinedClasses}`}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`group ${combinedClasses}`}>
      {content}
    </button>
  );
}

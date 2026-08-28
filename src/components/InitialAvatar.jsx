import React from 'react';

export function InitialAvatar({ name = 'Student', size = 'md', className = '' }) {
  const initial = name && name.trim() ? name.trim().charAt(0).toUpperCase() : 'S';

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base font-bold',
    xl: 'w-24 h-24 text-4xl font-black rounded-2xl'
  }[size] || 'w-10 h-10 text-sm';

  return (
    <div
      className={`${sizeClasses} rounded-xl bg-gradient-to-br from-indigo-500 via-cyan-400 to-emerald-400 text-slate-950 font-black flex items-center justify-center shadow-md uppercase shrink-0 select-none ${className}`}
    >
      {initial}
    </div>
  );
}

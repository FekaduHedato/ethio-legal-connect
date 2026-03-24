import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2 group cursor-pointer">
      <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
        <span className="text-white text-xl">⚖️</span>
      </div>
      <div className="flex flex-col -space-y-1">
        <span className="text-xl font-black italic tracking-tighter uppercase leading-none">
          SHIMGELINA<span className="text-blue-600">_</span>ODR
        </span>
        <span className="text-[8px] font-bold uppercase tracking-[0.4em] opacity-40">Global Resolution</span>
      </div>
    </div>
  );
};
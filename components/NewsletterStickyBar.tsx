'use client';

import React, { useState, useEffect } from 'react';

export default function NewsletterStickyBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#1A2F23] text-[#F5F2ED] border-b-4 border-black p-3 relative z-[60] font-mono text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 text-center">
        <span className="font-bold uppercase tracking-widest">
          New: The 2026 PFAS-Free Home Audit is Live
        </span>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-exit-popup'))}
            className="bg-[#A66D58] text-white px-4 py-1 border-2 border-black shadow-[2px_2px_0_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase font-bold text-xs"
          >
            Get Free Guide
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Close"
          >
            [X]
          </button>
        </div>
      </div>
    </div>
  );
}

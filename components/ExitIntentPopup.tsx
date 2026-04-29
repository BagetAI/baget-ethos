'use client';

import React, { useState, useEffect } from 'react';

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleExit = (e: MouseEvent) => {
      if (e.clientY < 0 && !localStorage.getItem('ethos-popup-closed')) {
        setIsOpen(true);
      }
    };

    const handleCustomEvent = () => setIsOpen(true);

    document.addEventListener('mouseleave', handleExit);
    window.addEventListener('open-exit-popup', handleCustomEvent);

    return () => {
      document.removeEventListener('mouseleave', handleExit);
      window.removeEventListener('open-exit-popup', handleCustomEvent);
    };
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    localStorage.setItem('ethos-popup-closed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API route
    setIsSubmitted(true);
    setTimeout(() => {
      closePopup();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#F5F2ED] border-4 border-black shadow-[12px_12px_0_#000] overflow-hidden">
        <button 
          onClick={closePopup}
          className="absolute top-4 right-4 text-2xl font-mono font-bold hover:text-[#A66D58] z-10"
        >
          [X]
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="hidden md:block bg-black relative min-h-[400px]">
            <img 
              src="/images/an-elegant-professional-pdf-cover-for-.png" 
              alt="Sustainable Home Audit" 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <div className="bg-[#1A2F23]/90 p-4 border-2 border-[#F5F2ED]">
                <p className="text-[#F5F2ED] font-mono text-xs uppercase font-bold">Included: 50+ Verified PFAS-Free Essentials</p>
              </div>
            </div>
          </div>

          <div className="p-8 flex flex-col justify-center">
            {isSubmitted ? (
              <div className="text-center animate-pulse">
                <h2 className="text-3xl font-mono font-bold uppercase mb-4 text-[#5B6D5B]">Sent!</h2>
                <p className="font-sans text-lg">Check your inbox for the Audit. Redirecting...</p>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-mono font-bold uppercase mb-4 leading-tight">
                  Stop Guessing. <br />Start Knowing.
                </h2>
                <p className="font-sans text-lg mb-6 opacity-80">
                  Download the 2026 Sustainable Home Audit. 50 items vetted for PFAS, Carbon, and Circularity.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input 
                    type="email" 
                    placeholder="YOUR EMAIL" 
                    className="w-full p-4 border-2 border-black font-mono focus:bg-white focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button 
                    type="submit" 
                    className="bg-[#1A2F23] text-white p-4 font-mono font-bold uppercase border-2 border-black shadow-[4px_4px_0_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  >
                    Send the Audit
                  </button>
                </form>
                <p className="mt-4 text-[10px] font-mono opacity-50 uppercase text-center">
                  Zero Spam. Weekly Verification Updates Only.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

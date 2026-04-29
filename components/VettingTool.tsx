'use client';

import React, { useState } from 'react';
import { vetProductAction } from '../lib/actions';

export default function VettingTool() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState('');

  const handleVet = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setReport(null);
    setError('');

    try {
      // Using the Server Action instead of fetch
      const data = await vetProductAction(url);
      setReport(data);
    } catch (err: any) {
      setError(err.message || 'Could not vet this product. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="brutalist-card bg-black text-white mb-12">
      <h2 className="text-3xl font-mono font-bold uppercase mb-4">Instant Vetting Engine</h2>
      <p className="font-mono text-sm opacity-80 mb-6">
        Paste a product URL to run the Ethos 2026 Sustainability Audit (PFAS-Free & Carbon Neutral Check).
      </p>

      <form onSubmit={handleVet} className="flex flex-col md:flex-row gap-4 mb-6">
        <input 
          type="url" 
          placeholder="https://brand.com/product" 
          className="flex-1 brutalist-border p-4 font-mono text-black focus:outline-none"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button 
          type="submit" 
          disabled={loading}
          className="bg-[#4361EE] text-white px-8 py-4 font-mono font-bold uppercase border-2 border-white shadow-[4px_4px_0_#FFF] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Vet Product'}
        </button>
      </form>

      {error && <p className="text-red-400 font-mono text-sm">{error}</p>}

      {report && (
        <div className="mt-8 border-t border-white/20 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-2">
                <span className={`px-2 py-1 text-xs font-bold uppercase ${report.recommendation === 'VERIFIED' ? 'bg-green-500' : 'bg-yellow-500'} text-black`}>
                  {report.recommendation}
                </span>
                <h3 className="text-2xl font-mono font-bold uppercase">{report.product_name}</h3>
              </div>
              <p className="font-mono text-sm opacity-80 mb-4">Manufacturer: {report.brand}</p>
              <p className="text-lg leading-relaxed">{report.sustainable_criteria}</p>
              
              {report.certifications?.length > 0 && (
                <div className="flex gap-2 mt-4">
                  {report.certifications.map((c: string) => (
                    <span key={c} className="border border-white/40 px-2 py-1 text-[10px] font-mono">{c}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
               <div className="brutalist-border border-white p-4 text-center">
                 <div className="text-[10px] font-mono uppercase opacity-60">Ethos Score</div>
                 <div className="text-4xl font-mono font-bold">{report.trust_score}</div>
               </div>
               <div className="grid grid-cols-2 gap-2">
                 <div className={`p-2 text-[10px] font-mono font-bold uppercase text-center ${report.pfas_free ? 'bg-green-500 text-black' : 'bg-red-500 text-white'}`}>
                   PFAS: {report.pfas_free ? 'FREE' : 'DETECT'}
                 </div>
                 <div className={`p-2 text-[10px] font-mono font-bold uppercase text-center ${report.carbon_neutral ? 'bg-green-500 text-black' : 'bg-red-500 text-white'}`}>
                   CARBON: {report.carbon_neutral ? '0' : 'HIGH'}
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

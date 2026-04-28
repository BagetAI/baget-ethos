import { notFound } from 'next/navigation';

async function getProduct(id: string) {
  const res = await fetch('https://app.baget.ai/api/public/databases/1ce3c031-286a-4d71-a7cc-b37e2dfe7280/rows', {
    next: { revalidate: 3600 }
  });
  const data = await res.json();
  const products = Array.isArray(data) ? data : (data?.rows ?? []);
  return products.find((p: any) => p.id === id);
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  const p = product.data;

  // Schema.org JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.product_name,
    description: p.sustainable_criteria,
    brand: {
      '@type': 'Brand',
      name: p.merchant_name,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: p.trust_score,
      bestRating: '100',
      worstRating: '0',
      ratingCount: '1',
    },
  };

  return (
    <main className="p-6 md:p-12 max-w-5xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="brutalist-card bg-white aspect-square flex items-center justify-center">
           <span className="text-8xl font-mono font-bold opacity-10 uppercase tracking-tighter">
             {p.product_name.charAt(0)}
           </span>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <div className="font-mono font-bold text-[#4361EE] uppercase mb-2">
              {p.category}
            </div>
            <h1 className="text-5xl font-mono font-bold uppercase leading-tight">
              {p.product_name}
            </h1>
          </div>

          <div className="flex gap-4">
            <div className="brutalist-card bg-black text-white p-4 text-center flex-1">
              <div className="text-sm font-mono uppercase opacity-60">Ethos Score</div>
              <div className="text-4xl font-mono font-bold">{p.trust_score}</div>
            </div>
            <div className="brutalist-card bg-[#4361EE] text-white p-4 text-center flex-1">
              <div className="text-sm font-mono uppercase opacity-60">Verified</div>
              <div className="text-4xl font-mono font-bold">2026</div>
            </div>
          </div>

          <div className="brutalist-card">
            <h3 className="font-mono font-bold uppercase mb-2">Sustainability Criteria</h3>
            <p className="text-lg leading-relaxed">{p.sustainable_criteria}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className={`brutalist-border p-4 font-mono font-bold uppercase text-center ${p.pfas_free ? 'bg-green-100' : 'bg-red-100'}`}>
               PFAS FREE: {p.pfas_free ? 'YES' : 'NO'}
             </div>
             <div className={`brutalist-border p-4 font-mono font-bold uppercase text-center ${p.carbon_neutral ? 'bg-green-100' : 'bg-red-100'}`}>
               CARBON NEUTRAL: {p.carbon_neutral ? 'YES' : 'NO'}
             </div>
          </div>

          <a 
            href={`/api/go?id=${product.id}&url=${encodeURIComponent(p.affiliate_url)}`}
            className="btn-primary text-center mt-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Check Price on {p.merchant_name}
          </a>
        </div>
      </div>
    </main>
  );
}

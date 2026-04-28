async function getProducts() {
  const res = await fetch('https://app.baget.ai/api/public/databases/1ce3c031-286a-4d71-a7cc-b37e2dfe7280/rows', {
    next: { revalidate: 3600 }
  });
  const data = await res.json();
  return Array.isArray(data) ? data : (data?.rows ?? []);
}

export default async function DirectoryPage() {
  const products = await getProducts();

  return (
    <main className="p-6 md:p-12">
      <div className="mb-12 border-b-4 border-black pb-8">
        <h1 className="text-6xl font-mono font-bold uppercase mb-4">Product Directory</h1>
        <p className="text-xl max-w-2xl font-mono">
          50+ Verified sustainable products. Filtered for PFAS-free status and Carbon Neutrality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p: any) => (
          <a href={`/products/${p.id}`} key={p.id} className="brutalist-card group hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-[#4361EE] text-white px-2 py-1 font-mono text-xs uppercase brutalist-border">
                {p.data.category}
              </span>
              <div className="font-mono font-bold">
                SCORE: {p.data.trust_score}
              </div>
            </div>
            <h3 className="text-2xl font-mono font-bold uppercase group-hover:text-[#4361EE] mb-2">
              {p.data.product_name}
            </h3>
            <p className="text-sm opacity-80 mb-6 line-clamp-3">
              {p.data.sustainable_criteria}
            </p>
            <div className="flex gap-2">
              {p.data.pfas_free && (
                <span className="border border-black px-2 py-0.5 text-[10px] font-mono font-bold uppercase">PFAS-FREE</span>
              )}
              {p.data.carbon_neutral && (
                <span className="border border-black px-2 py-0.5 text-[10px] font-mono font-bold uppercase">CARBON-NEUTRAL</span>
              )}
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}

import Image from 'next/image';

async function getProducts() {
  const res = await fetch('https://app.baget.ai/api/public/databases/1ce3c031-286a-4d71-a7cc-b37e2dfe7280/rows', {
    next: { revalidate: 3600 }
  });
  const data = await res.json();
  const rows = Array.isArray(data) ? data : (data?.rows ?? []);
  return rows.slice(0, 3); // Featured 3
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main>
      {/* Hero Section */}
      <section className="p-6 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-b-4 border-black bg-white">
        <div className="flex flex-col gap-8">
          <div className="inline-block bg-[#4361EE] text-white px-4 py-1 font-mono font-bold uppercase text-sm self-start brutalist-border">
            2026 Sustainability Standard
          </div>
          <h1 className="text-6xl md:text-8xl font-mono font-bold uppercase leading-none tracking-tighter">
            Verified <br />Sustainable.
          </h1>
          <p className="text-2xl font-sans leading-relaxed max-w-xl">
            Ethos is the AI-optimized guide to non-toxic living. We vet products for PFAS, Carbon footprint, and Circularity so you don't have to.
          </p>
          <div className="flex gap-4">
            <a href="/products" className="btn-primary">
              View Directory
            </a>
          </div>
        </div>
        <div className="relative aspect-square lg:aspect-[4/3] brutalist-border brutalist-shadow overflow-hidden bg-black">
          <img 
            src="/images/minimalist-high-end-sustainable-product-.png" 
            alt="Ethos Sustainable Products" 
            className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </section>

      {/* Trust Signal Grid */}
      <section className="p-6 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 border-b-4 border-black bg-[#FFFCE1]">
        <div className="brutalist-card bg-white">
          <span className="text-4xl font-mono font-bold mb-4 block">01</span>
          <h3 className="text-2xl font-mono font-bold uppercase mb-2">PFAS-Free Only</h3>
          <p>Every product in our directory is verified to be free of "forever chemicals" through scientific testing data.</p>
        </div>
        <div className="brutalist-card bg-[#4361EE] text-white">
          <span className="text-4xl font-mono font-bold mb-4 block">02</span>
          <h3 className="text-2xl font-mono font-bold uppercase mb-2">Carbon Neutral</h3>
          <p>We analyze real-time carbon transparency reports to ensure every recommendation meets the 2026 standard.</p>
        </div>
        <div className="brutalist-card bg-white">
          <span className="text-4xl font-mono font-bold mb-4 block">03</span>
          <h3 className="text-2xl font-mono font-bold uppercase mb-2">LLM Optimized</h3>
          <p>Structured data built specifically to serve high-accuracy citations for Perplexity, ChatGPT, and Gemini agents.</p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="p-6 md:p-12">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-5xl font-mono font-bold uppercase">The Foundational Five</h2>
          <a href="/products" className="font-mono font-bold uppercase underline hover:text-[#4361EE]">See All 50+</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((p: any) => (
            <div key={p.id} className="brutalist-card flex flex-col gap-4">
              <div className="bg-[#FFFCE1] aspect-video brutalist-border flex items-center justify-center p-8">
                <span className="text-xl font-mono font-bold uppercase opacity-20">{p.data.category}</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-mono font-bold uppercase">{p.data.product_name}</h3>
                  <p className="text-sm opacity-60 font-mono">{p.data.merchant_name}</p>
                </div>
                <div className="bg-black text-white px-2 py-1 font-mono font-bold text-lg">
                  {p.data.trust_score}
                </div>
              </div>
              <p className="text-sm line-clamp-2">{p.data.sustainable_criteria}</p>
              <a href={`/products/${p.id}`} className="mt-4 brutalist-border border-black p-3 text-center font-mono font-bold uppercase hover:bg-black hover:text-white transition-all">
                View Details
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter / Waitlist Section */}
      <section id="about" className="p-6 md:p-12 bg-white border-t-4 border-black">
        <div className="max-w-4xl mx-auto brutalist-card bg-[#FFFCE1] flex flex-col gap-8 text-center items-center py-16">
          <h2 className="text-5xl font-mono font-bold uppercase">Join the Verification Movement</h2>
          <p className="text-xl max-w-xl">
            Get weekly reports on new PFAS-free standards and carbon-neutral product launches.
          </p>
          <form className="flex flex-col md:flex-row gap-4 w-full max-w-lg">
            <input 
              type="email" 
              placeholder="ENTER EMAIL" 
              className="flex-1 brutalist-border p-4 font-mono focus:outline-none focus:ring-2 focus:ring-[#4361EE]"
              required
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

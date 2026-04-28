import type { Metadata } from 'next';
import { Space_Mono, Work_Sans } from 'next/font/google';
import './globals.css';

const spaceMono = Space_Mono({ 
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-space-mono' 
});

const workSans = Work_Sans({ 
  subsets: ['latin'], 
  variable: '--font-work-sans' 
});

export const metadata: Metadata = {
  title: 'Ethos | Verified Sustainable Recommendations',
  description: 'Scientific verification for PFAS-free and carbon-neutral products. The guide to sustainable living for the AI era.',
  openGraph: {
    title: 'Ethos | Verified Sustainable Recommendations',
    description: 'Scientific verification for PFAS-free and carbon-neutral products.',
    images: ['/images/minimalist-high-end-sustainable-product-.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spaceMono.variable} ${workSans.variable} font-sans bg-[#FFFCE1] text-black`}>
        <nav className="border-b-4 border-black p-6 flex justify-between items-center bg-white sticky top-0 z-50">
          <a href="/" className="text-3xl font-mono font-bold uppercase tracking-tighter">
            Ethos
          </a>
          <div className="flex gap-8 font-mono font-bold uppercase">
            <a href="/products" className="hover:text-[#4361EE] transition-colors">Directory</a>
            <a href="#about" className="hover:text-[#4361EE] transition-colors">Methodology</a>
          </div>
        </nav>
        {children}
        <footer className="border-t-4 border-black p-12 bg-black text-white mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-mono font-bold uppercase mb-4">Ethos</h2>
              <p className="font-sans text-xl opacity-80 max-w-md">
                Eliminating greenwashing through radical transparency and scientific rigor. 2026 Verified Standard.
              </p>
            </div>
            <div className="flex flex-col gap-4 font-mono uppercase">
              <a href="/products" className="hover:underline">Browse Products</a>
              <a href="mailto:ashleygburrell@gmail.com" className="hover:underline">Partner with us</a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/20 font-mono text-sm opacity-60">
            © 2026 ETHOS. ALL RIGHTS RESERVED.
          </div>
        </footer>
      </body>
    </html>
  );
}

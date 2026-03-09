'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TRADE_CATEGORIES } from '@/lib/constants/trades';
import { validateUKPostcode, formatPostcode } from '@/lib/utils/postcode';

export function HeroSearch() {
  const router = useRouter();
  const [postcode, setPostcode] = useState('');
  const [trade, setTrade] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!trade) { setError('Please select a trade type.'); return; }
    if (!validateUKPostcode(postcode)) { setError('Please enter a valid UK postcode — e.g. SW1A 1AA'); return; }
    router.push(`/get-quotes?trade=${trade}&postcode=${encodeURIComponent(formatPostcode(postcode))}`);
  }

  return (
    <section className="relative bg-[#060C18] overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px'}} />
      {/* Blue glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-medium text-gray-300 tracking-wide">2,500+ vetted tradespeople across the UK</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white leading-[1.05] tracking-tight mb-5">
          Find the Right<br />
          <span className="text-blue-400">Tradesperson</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-xl mx-auto mb-12 leading-relaxed">
          Instant quotes from vetted local professionals. No middleman, no commission — just direct contact, completely free.
        </p>

        {/* Search form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-3 shadow-2xl shadow-black/40 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <select
                value={trade}
                onChange={e => setTrade(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-xl bg-gray-50 border-0 text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
              >
                <option value="">Select a trade...</option>
                {TRADE_CATEGORIES.map(t => (
                  <option key={t.slug} value={t.slug}>{t.name}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Your postcode"
                value={postcode}
                onChange={e => setPostcode(e.target.value.toUpperCase())}
                className="w-full h-12 pl-10 pr-4 rounded-xl bg-gray-50 border-0 text-gray-900 text-sm font-medium uppercase placeholder:normal-case placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="postal-code"
              />
            </div>
            <Button type="submit" className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-sm flex-shrink-0">
              Get Quotes
            </Button>
          </div>
          {error && <p className="text-xs text-red-500 mt-2 px-2 text-left">{error}</p>}
          <p className="text-xs text-gray-400 text-center mt-2 pb-1">Free for customers &middot; Results in under 2 minutes &middot; No hidden fees</p>
        </form>
      </div>
    </section>
  );
}

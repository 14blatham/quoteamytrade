'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TRADE_CATEGORIES } from '@/lib/constants/trades';
import { TradeIcon } from '@/components/shared/TradeIcon';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <span className="font-black text-[17px] tracking-tight text-gray-950">QuoteMyTrade</span>
          </Link>

          <nav className="hidden md:flex items-center">
            <Link href="/how-it-works" className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">How it Works</Link>
            <div className="relative group">
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                Trades <ChevronDown className="w-3 h-3 mt-px" />
              </button>
              <div className="absolute left-0 top-full pt-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                <div className="w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden py-1.5">
                  {TRADE_CATEGORIES.map(trade => (
                    <Link key={trade.slug} href={`/services/${trade.slug}`} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors">
                      <TradeIcon slug={trade.slug} className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      {trade.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/for-businesses" className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">For Tradespeople</Link>
            <Link href="/pricing" className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Pricing</Link>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/login"><Button variant="ghost" size="sm" className="text-gray-600 font-medium hover:text-gray-900">Sign In</Button></Link>
            <Link href="/get-quotes"><Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 h-8 text-sm shadow-sm">Get Free Quotes</Button></Link>
          </div>

          <button className="md:hidden p-1.5 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-6 py-5 space-y-1">
            <Link href="/how-it-works" className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>How it Works</Link>
            <div className="pt-3 pb-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Trades</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {TRADE_CATEGORIES.map(trade => (
                  <Link key={trade.slug} href={`/services/${trade.slug}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setMenuOpen(false)}>
                    <TradeIcon slug={trade.slug} className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    {trade.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/for-businesses" className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>For Tradespeople</Link>
            <Link href="/pricing" className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Pricing</Link>
            <div className="pt-4 flex flex-col gap-2 border-t border-gray-100 mt-3">
              <Link href="/login" onClick={() => setMenuOpen(false)}><Button variant="outline" className="w-full font-medium text-sm">Sign In</Button></Link>
              <Link href="/get-quotes" onClick={() => setMenuOpen(false)}><Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm">Get Free Quotes</Button></Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

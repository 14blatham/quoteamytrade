'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TRADE_CATEGORIES } from '@/lib/constants/trades';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-700">
            <span className="text-2xl">🔨</span>
            <span>QuoteMyTrade</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link href="/how-it-works" className="hover:text-blue-700 transition-colors">How it Works</Link>
            <div className="relative group">
              <button className="hover:text-blue-700 transition-colors flex items-center gap-1">
                Trades
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                {TRADE_CATEGORIES.map(trade => (
                  <Link
                    key={trade.slug}
                    href={`/services/${trade.slug}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 first:rounded-t-lg last:rounded-b-lg"
                  >
                    <span>{trade.icon}</span>
                    {trade.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/for-businesses" className="hover:text-blue-700 transition-colors">For Tradespeople</Link>
            <Link href="/pricing" className="hover:text-blue-700 transition-colors">Pricing</Link>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
            <Link href="/get-quotes">
              <Button size="sm" className="bg-blue-700 hover:bg-blue-800 text-white">Get Free Quotes</Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            <Link href="/how-it-works" className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-700" onClick={() => setMenuOpen(false)}>
              How it Works
            </Link>
            <div className="py-2">
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1 px-0">Trades</p>
              <div className="grid grid-cols-2 gap-1">
                {TRADE_CATEGORIES.map(trade => (
                  <Link
                    key={trade.slug}
                    href={`/services/${trade.slug}`}
                    className="flex items-center gap-1 py-1 text-sm text-gray-700 hover:text-blue-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="text-xs">{trade.icon}</span>
                    {trade.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/for-businesses" className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-700" onClick={() => setMenuOpen(false)}>
              For Tradespeople
            </Link>
            <Link href="/pricing" className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-700" onClick={() => setMenuOpen(false)}>
              Pricing
            </Link>
            <div className="pt-3 flex flex-col gap-2 border-t border-gray-100">
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Link href="/get-quotes" onClick={() => setMenuOpen(false)}>
                <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white">Get Free Quotes</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

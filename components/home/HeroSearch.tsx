'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

    if (!trade) {
      setError('Please select a trade type.');
      return;
    }
    if (!validateUKPostcode(postcode)) {
      setError('Please enter a valid UK postcode (e.g. SW1A 1AA).');
      return;
    }

    const formatted = formatPostcode(postcode);
    router.push(`/get-quotes?trade=${trade}&postcode=${encodeURIComponent(formatted)}`);
  }

  return (
    <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">
          Find Trusted Local Tradespeople — Free
        </h1>
        <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-xl mx-auto">
          Get instant quotes from vetted local tradespeople. No middleman, no commission — just direct contact.
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Trade select */}
            <div className="flex-1">
              <label htmlFor="trade-select" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 text-left">
                I need a...
              </label>
              <select
                id="trade-select"
                value={trade}
                onChange={e => setTrade(e.target.value)}
                className="w-full h-12 rounded-lg border border-gray-200 bg-gray-50 px-3 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select trade type</option>
                {TRADE_CATEGORIES.map(t => (
                  <option key={t.slug} value={t.slug}>
                    {t.icon} {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Postcode input */}
            <div className="flex-1">
              <label htmlFor="postcode-input" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 text-left">
                My postcode
              </label>
              <Input
                id="postcode-input"
                type="text"
                placeholder="e.g. SW1A 1AA"
                value={postcode}
                onChange={e => setPostcode(e.target.value.toUpperCase())}
                className="h-12 text-base bg-gray-50 border-gray-200 uppercase"
                autoComplete="postal-code"
              />
            </div>

            <div className="flex items-end">
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto h-12 px-8 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-base"
              >
                Get Quotes
              </Button>
            </div>
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-600 text-left">{error}</p>
          )}

          <p className="mt-4 text-xs text-gray-400 text-center">
            100% free for customers · No call-out fees · No commission charged
          </p>
        </form>
      </div>
    </div>
  );
}

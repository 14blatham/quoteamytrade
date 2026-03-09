'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TRADE_CATEGORIES } from '@/lib/constants/trades';
import { validateUKPostcode, formatPostcode } from '@/lib/utils/postcode';
import { useQuoteForm } from './QuoteFormContext';

export function StepServiceType() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { formState, updateForm } = useQuoteForm();

  const [trade, setTrade] = useState(formState.tradeSlug ?? searchParams.get('trade') ?? '');
  const [postcode, setPostcode] = useState(formState.postcode ?? searchParams.get('postcode') ?? '');
  const [error, setError] = useState('');

  useEffect(() => {
    const tradeParam = searchParams.get('trade');
    const postcodeParam = searchParams.get('postcode');
    if (tradeParam && !formState.tradeSlug) setTrade(tradeParam);
    if (postcodeParam && !formState.postcode) setPostcode(postcodeParam.toUpperCase());
  }, [searchParams, formState.tradeSlug, formState.postcode]);

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!trade) { setError('Please select a trade type.'); return; }
    if (!validateUKPostcode(postcode)) { setError('Please enter a valid UK postcode (e.g. SW1A 1AA).'); return; }

    const formatted = formatPostcode(postcode);
    updateForm({ step: 2, tradeSlug: trade as any, postcode: formatted });
    router.push('/get-quotes/details');
  }

  const selectedTrade = TRADE_CATEGORIES.find(t => t.slug === trade);

  return (
    <form onSubmit={handleNext} className="space-y-5">
      <div>
        <Label htmlFor="trade">What type of tradesperson do you need?</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
          {TRADE_CATEGORIES.map(t => (
            <button
              key={t.slug}
              type="button"
              onClick={() => setTrade(t.slug)}
              className={`flex items-center gap-2 p-3 rounded-lg border-2 text-left text-sm font-medium transition-all ${
                trade === t.slug
                  ? 'border-blue-700 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">{t.icon}</span>
              <span>{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedTrade && (
        <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800 border border-blue-100">
          <p className="font-medium">{selectedTrade.name}</p>
          <p className="mt-0.5 text-blue-600">{selectedTrade.description}</p>
          <p className="mt-1 text-blue-700 font-medium">
            Typical cost: £{Math.round(selectedTrade.averageCostFrom / 100)} – £{Math.round(selectedTrade.averageCostTo / 100)}
          </p>
        </div>
      )}

      <div>
        <Label htmlFor="postcode">Your postcode</Label>
        <Input
          id="postcode"
          type="text"
          placeholder="e.g. SW1A 1AA"
          value={postcode}
          onChange={e => setPostcode(e.target.value.toUpperCase())}
          className="mt-1 uppercase"
          autoComplete="postal-code"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white" size="lg">
        Continue →
      </Button>
    </form>
  );
}

'use client';

import { useState } from 'react';
import { useQuoteForm } from './QuoteFormContext';
import { TRADE_CATEGORIES } from '@/lib/constants/trades';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validateUKPostcode } from '@/lib/utils/postcode';
import { TradeIcon } from '@/components/shared/TradeIcon';
import { formatGBP } from '@/lib/utils/formatting';
import { MapPin, ArrowRight } from 'lucide-react';

export function StepServiceType() {
  const { formState, updateForm } = useQuoteForm();
  const [trade, setTrade] = useState(formState.tradeSlug ?? '');
  const [postcode, setPostcode] = useState(formState.postcode ?? '');
  const [postcodeError, setPostcodeError] = useState('');

  const selectedTrade = TRADE_CATEGORIES.find(t => t.slug === trade);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clean = postcode.trim().toUpperCase();
    if (!validateUKPostcode(clean)) {
      setPostcodeError('Please enter a valid UK postcode');
      return;
    }
    if (!trade) return;
    updateForm({ tradeSlug: trade as any, postcode: clean, step: 2 });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* Trade selection */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Select Trade</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {TRADE_CATEGORIES.map(t => (
            <button
              key={t.slug}
              type="button"
              onClick={() => setTrade(t.slug)}
              className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                trade === t.slug
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-100 bg-gray-50 text-gray-700 hover:border-gray-200 hover:bg-white'
              }`}
            >
              <TradeIcon
                slug={t.slug}
                className={`w-4 h-4 flex-shrink-0 ${trade === t.slug ? 'text-blue-600' : 'text-gray-400'}`}
              />
              <span className="truncate">{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cost preview */}
      {selectedTrade && (
        <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-gray-500">Typical cost range</span>
          <span className="text-sm font-bold text-gray-900">
            {formatGBP(selectedTrade.averageCostFrom)} – {formatGBP(selectedTrade.averageCostTo)}
          </span>
        </div>
      )}

      {/* Postcode */}
      <div>
        <Label htmlFor="postcode" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 block">
          Your Postcode
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <Input
            id="postcode"
            value={postcode}
            onChange={e => { setPostcode(e.target.value); setPostcodeError(''); }}
            placeholder="e.g. SW1A 1AA"
            className="pl-9 uppercase h-11 border-gray-200 focus:border-blue-400 focus:ring-blue-100"
          />
        </div>
        {postcodeError && <p className="text-xs text-red-600 mt-1.5">{postcodeError}</p>}
      </div>

      <Button
        type="submit"
        disabled={!trade || !postcode}
        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold h-11 disabled:opacity-40"
        size="lg"
      >
        Continue
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
}

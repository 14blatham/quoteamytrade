'use client';

import { useState } from 'react';
import { useMockAuth } from '@/lib/auth/MockAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatGBP } from '@/lib/utils/formatting';

export default function ServicesPage() {
  const { supplier } = useMockAuth();
  const [saved, setSaved] = useState(false);

  if (!supplier) return null;

  const services = Object.entries(supplier.pricing);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Dashboard</p>
        <h1 className="text-2xl font-bold text-gray-900">Services &amp; Prices</h1>
        <p className="text-gray-500 text-sm mt-1">Set the price ranges you show to customers for each service.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-5 py-3 font-semibold text-gray-700">Service</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-700">Min Price (£)</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-700">Max Price (£)</th>
              <th className="text-right px-5 py-3 font-semibold text-gray-700">Lead Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {services.map(([id, pricing]) => (
              <tr key={id} className="hover:bg-gray-50">
                <td className="px-5 py-4 font-medium text-gray-900 capitalize">{id.replace(/-/g, ' ')}</td>
                <td className="px-5 py-4">
                  <Input
                    type="number"
                    defaultValue={Math.round(pricing.priceFrom / 100)}
                    className="w-28 h-8 text-sm"
                  />
                </td>
                <td className="px-5 py-4">
                  <Input
                    type="number"
                    defaultValue={Math.round(pricing.priceTo / 100)}
                    className="w-28 h-8 text-sm"
                  />
                </td>
                <td className="px-5 py-4 text-right text-gray-500">{formatGBP(pricing.leadCost)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Button onClick={handleSave} className="bg-blue-700 hover:bg-blue-800 text-white">
          {saved ? 'Saved' : 'Save Changes'}
        </Button>
        <p className="text-xs text-gray-400">Lead costs are set by QuoteMyTrade and shown for reference only.</p>
      </div>
    </div>
  );
}

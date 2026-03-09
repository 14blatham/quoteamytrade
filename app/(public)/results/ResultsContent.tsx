'use client';

import { useSearchParams } from 'next/navigation';
import { MOCK_SUPPLIERS } from '@/lib/mock-data/suppliers';
import { SupplierCard } from '@/components/results/SupplierCard';
import { ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function ResultsContent() {
  const searchParams = useSearchParams();
  const trade = searchParams.get('service') ?? searchParams.get('trade') ?? '';
  const postcode = searchParams.get('postcode') ?? '';

  const suppliers = MOCK_SUPPLIERS.filter(s => {
    const hasTrade = s.trades.includes(trade as any);
    const isActive = s.status === 'active' && s.leadsEnabled;
    return hasTrade && isActive;
  });

  return (
    <>
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-3xl mx-auto px-4">
          {postcode && (
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>Results for <strong className="text-gray-900">{postcode}</strong></span>
            </div>
          )}
          <h1 className="text-xl font-bold text-gray-900 capitalize">
            {suppliers.length} {trade.replace(/-/g, ' ')} available near you
          </h1>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>All tradespeople are vetted and reviewed. Contact details are free to access.</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-7">
        {suppliers.length > 0 ? (
          <div className="space-y-4">
            {suppliers.map(supplier => (
              <SupplierCard key={supplier.id} supplier={supplier} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">
            <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">No exact matches found</h2>
            <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
              We&apos;re growing our network. Submit your request anyway and we&apos;ll match you as soon as a tradesperson becomes available.
            </p>
            <Link href="/get-quotes">
              <Button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold">
                Submit Request
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

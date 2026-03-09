'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SupplierCard } from '@/components/results/SupplierCard';
import { MOCK_SUPPLIERS } from '@/lib/mock-data/suppliers';
import { TRADE_CATEGORIES } from '@/lib/constants/trades';
import { formatPostcode, extractDistrict } from '@/lib/utils/postcode';

export function ResultsContent() {
  const searchParams = useSearchParams();
  const tradeSlug = searchParams.get('trade') ?? '';
  const postcode = searchParams.get('postcode') ?? '';

  const trade = TRADE_CATEGORIES.find(t => t.slug === tradeSlug);
  const district = postcode ? extractDistrict(postcode) : '';

  // Filter suppliers by trade and postcode coverage
  const matched = MOCK_SUPPLIERS.filter(s => {
    const hasTrade = s.trades.includes(tradeSlug as any);
    const isActive = s.status === 'active' && s.leadsEnabled;
    const coversArea = district
      ? s.coveragePostcodes.some(p => district.startsWith(p) || p.startsWith(district.slice(0, 2)))
      : true;
    return hasTrade && isActive && coversArea;
  });

  // Fallback: show all active suppliers for the trade if none match postcode
  const suppliers = matched.length > 0 ? matched : MOCK_SUPPLIERS.filter(
    s => s.trades.includes(tradeSlug as any) && s.status === 'active' && s.leadsEnabled
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-blue-700">Home</Link>
            <span>/</span>
            <Link href="/get-quotes" className="hover:text-blue-700">Get Quotes</Link>
            <span>/</span>
            <span className="text-gray-900">Results</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {suppliers.length} {trade?.name ?? 'Tradesperson'}{suppliers.length !== 1 ? '' : ''} Found
            {postcode && ` Near ${formatPostcode(postcode)}`}
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Click &quot;Reveal Contact Details&quot; to get their phone number and email — it&apos;s completely free.
          </p>
        </div>

        {/* Trust note */}
        <div className="bg-green-50 border border-green-100 rounded-lg px-4 py-3 text-sm text-green-800 mb-6 flex items-center gap-2">
          <span>✅</span>
          <span>All tradespeople are vetted. Revealing contact details is <strong>100% free</strong> — no hidden charges.</span>
        </div>

        {/* Results */}
        {suppliers.length > 0 ? (
          <div className="space-y-4">
            {suppliers.map(supplier => (
              <SupplierCard
                key={supplier.id}
                supplier={supplier}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 p-10 text-center">
            <span className="text-5xl block mb-4">🔍</span>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No results found</h2>
            <p className="text-gray-500 mb-6">We couldn&apos;t find any {trade?.name?.toLowerCase()} covering {postcode}. Try a different trade or postcode.</p>
            <Link href="/get-quotes">
              <Button className="bg-blue-700 hover:bg-blue-800 text-white">Try Again</Button>
            </Link>
          </div>
        )}

        {/* New search */}
        <div className="mt-8 text-center">
          <Link href="/get-quotes">
            <Button variant="outline">← Start a New Search</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

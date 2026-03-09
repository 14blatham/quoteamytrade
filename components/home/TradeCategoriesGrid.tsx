import Link from 'next/link';
import { TRADE_CATEGORIES } from '@/lib/constants/trades';
import { formatGBP } from '@/lib/utils/formatting';

export function TradeCategoriesGrid() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Find Any Trade</h2>
          <p className="mt-2 text-gray-500">From emergency repairs to major projects — we cover all the trades you need.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {TRADE_CATEGORIES.map(trade => (
            <Link
              key={trade.slug}
              href={`/services/${trade.slug}`}
              className="group flex flex-col items-center p-5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 text-center"
            >
              <span className="text-4xl mb-3">{trade.icon}</span>
              <span className="font-semibold text-sm text-gray-800 group-hover:text-blue-700 transition-colors">
                {trade.name}
              </span>
              <span className="mt-1 text-xs text-gray-400">
                From {formatGBP(trade.averageCostFrom)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

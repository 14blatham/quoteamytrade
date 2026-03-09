import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TRADE_CATEGORIES } from '@/lib/constants/trades';
import { TradeIcon } from '@/components/shared/TradeIcon';
import { formatGBP } from '@/lib/utils/formatting';

export function TradeCategoriesGrid() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">All Trades</p>
            <h2 className="text-3xl font-black text-gray-950 tracking-tight">Find Any Trade</h2>
          </div>
          <Link href="/services" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {TRADE_CATEGORIES.map(trade => (
            <Link
              key={trade.slug}
              href={`/services/${trade.slug}`}
              className="group bg-white rounded-xl border border-gray-100 p-5 hover:border-blue-200 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center mb-4 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                <TradeIcon slug={trade.slug} className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
              </div>
              <p className="font-bold text-sm text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{trade.name}</p>
              <p className="text-xs text-gray-400">From {formatGBP(trade.averageCostFrom)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

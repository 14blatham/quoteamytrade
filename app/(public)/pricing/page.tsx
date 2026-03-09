import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TRADE_CATEGORIES } from '@/lib/constants/trades';
import { TradeIcon } from '@/components/shared/TradeIcon';
import { formatGBP } from '@/lib/utils/formatting';
import { CreditCard, Bell, RefreshCw } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing for Tradespeople | QuoteMyTrade',
  description: 'Simple pay-per-lead pricing for tradespeople. No subscription, no commission. Leads from £0.50. Free to join.',
};

const BILLING_INFO = [
  {
    icon: CreditCard,
    title: 'Pre-paid Balance',
    desc: 'Top up your account balance in advance using a debit or credit card. Leads are deducted from your balance as they arrive.',
  },
  {
    icon: Bell,
    title: 'Low Balance Alerts',
    desc: 'Receive an email notification when your balance falls below £5. Leads pause automatically if your balance reaches zero.',
  },
  {
    icon: RefreshCw,
    title: 'Refund Policy',
    desc: 'If a customer contact detail is invalid or a lead is a clear duplicate, raise a dispute within 7 days for a full refund.',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-100 py-14 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-3">Pricing</p>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-3">
            Simple Pricing for Tradespeople
          </h1>
          <p className="text-gray-500 text-lg">Pay only for the leads you receive. No hidden fees, ever.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Key points */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Joining Fee', value: 'Free', sub: 'Always' },
            { label: 'Monthly Fee', value: '£0', sub: 'No subscription' },
            { label: 'Per Lead', value: '50p–£4', sub: 'Trade dependant' },
            { label: 'Commission', value: '0%', sub: 'You keep 100%' },
          ].map(item => (
            <div key={item.label} className="bg-white rounded-xl border border-gray-100 p-5 text-center shadow-sm">
              <p className="text-3xl font-black text-blue-700">{item.value}</p>
              <p className="font-semibold text-gray-900 text-sm mt-1">{item.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Per-trade pricing */}
        <section className="mb-12">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">By Trade</p>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Lead Prices by Trade</h2>
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wide">Trade</th>
                  <th className="text-right px-5 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wide">Lead Price</th>
                  <th className="text-right px-5 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wide hidden sm:table-cell">Typical Job Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {TRADE_CATEGORIES.map(trade => (
                  <tr key={trade.slug} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center">
                          <TradeIcon slug={trade.slug} className="w-3.5 h-3.5 text-gray-600" />
                        </div>
                        <span className="font-medium text-gray-900">{trade.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right font-bold text-blue-700">
                      {formatGBP(trade.leadPriceFrom)} – {formatGBP(trade.leadPriceTo)}
                    </td>
                    <td className="px-5 py-3.5 text-right text-gray-500 hidden sm:table-cell">
                      {formatGBP(trade.averageCostFrom)} – {formatGBP(trade.averageCostTo)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How billing works */}
        <section className="mb-12">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Billing</p>
          <h2 className="text-xl font-bold text-gray-900 mb-4">How Billing Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {BILLING_INFO.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white rounded-xl border border-gray-100 p-5">
                  <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1.5">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gray-950 rounded-2xl p-8 text-white text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-3">Get Started</p>
          <h2 className="text-2xl font-bold mb-2">Start with a Free Trial</h2>
          <p className="text-gray-400 mb-6">New members receive a trial period to test the platform before spending a penny.</p>
          <Link href="/join">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10">
              Create Free Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

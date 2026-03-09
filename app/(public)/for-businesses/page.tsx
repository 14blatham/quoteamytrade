import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Tradespeople | Join QuoteMyTrade',
  description: 'Grow your trade business with pay-per-lead advertising. No subscription, no commission. Join thousands of UK tradespeople on QuoteMyTrade.',
};

export default function ForBusinessesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-5xl block mb-4">🔧</span>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Grow Your Trade Business</h1>
          <p className="text-gray-300 text-lg mb-6 max-w-xl mx-auto">
            Receive qualified leads from homeowners in your area. Pay only when you receive a lead — no subscriptions, no commission.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['From £0.50 per lead', 'No monthly fees', 'No commission', 'Free trial'].map(item => (
              <span key={item} className="bg-white/10 text-white text-sm px-4 py-1.5 rounded-full font-medium">✓ {item}</span>
            ))}
          </div>
          <Link href="/join">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10">Start Free Trial</Button>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Benefits grid */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Tradespeople Choose QuoteMyTrade</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '💷', title: 'Pay Per Lead Only', desc: 'Leads cost just £0.50–£4.00. You only pay when a customer is matched to you — never a flat monthly fee.' },
              { icon: '🚫', title: 'No Commission', desc: 'Unlike other platforms, we never take a percentage of your job value. What you earn, you keep.' },
              { icon: '🎛️', title: 'Full Control', desc: 'Set your own prices, choose your postcodes, and pause lead generation instantly when you\'re fully booked.' },
              { icon: '✅', title: 'Qualified Leads', desc: 'Every lead is a real homeowner actively looking for your service. No tyre-kickers.' },
              { icon: '📱', title: 'Works on Mobile', desc: 'Manage everything from your phone — check leads, update coverage, top up your balance — on the go.' },
              { icon: '🆓', title: 'Free Trial', desc: 'New members can trial the platform without obligation before upgrading to a paying account.' },
            ].map(item => (
              <div key={item.title} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing summary */}
        <section className="mb-14 bg-blue-50 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">Simple, Transparent Pricing</h2>
          <p className="text-gray-500 text-center text-sm mb-6">Lead prices vary by trade. There are no other charges.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { label: 'Joining fee', value: '£0' },
              { label: 'Monthly fee', value: '£0' },
              { label: 'Per lead', value: '£0.50–£4' },
              { label: 'Commission', value: '0%' },
            ].map(item => (
              <div key={item.label} className="bg-white rounded-xl p-4 border border-blue-100">
                <p className="text-2xl font-bold text-blue-700">{item.value}</p>
                <p className="text-xs text-gray-500 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/pricing">
              <Button variant="outline" size="sm">View Full Pricing Details</Button>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to Get Started?</h2>
          <p className="text-gray-500 mb-6">Join thousands of UK tradespeople already growing with QuoteMyTrade.</p>
          <Link href="/join">
            <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-white px-10">Create Your Free Account</Button>
          </Link>
        </section>
      </div>
    </div>
  );
}

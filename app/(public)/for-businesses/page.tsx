import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap, SlidersHorizontal, BadgeCheck, Smartphone, Gift } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Tradespeople | Join QuoteMyTrade',
  description: 'Grow your trade business with pay-per-lead advertising. No subscription, no commission. Join thousands of UK tradespeople on QuoteMyTrade.',
};

const BENEFITS = [
  {
    icon: CheckCircle,
    title: 'Pay Per Lead Only',
    desc: 'Leads cost just £0.50–£4.00. You only pay when a customer is matched to you — never a flat monthly fee.',
  },
  {
    icon: Zap,
    title: 'No Commission',
    desc: 'Unlike other platforms, we never take a percentage of your job value. What you earn, you keep.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Full Control',
    desc: "Set your own prices, choose your postcodes, and pause lead generation instantly when you're fully booked.",
  },
  {
    icon: BadgeCheck,
    title: 'Qualified Leads',
    desc: 'Every lead is a real homeowner actively looking for your service. No tyre-kickers.',
  },
  {
    icon: Smartphone,
    title: 'Works on Mobile',
    desc: 'Manage everything from your phone — check leads, update coverage, top up your balance — on the go.',
  },
  {
    icon: Gift,
    title: 'Free Trial',
    desc: 'New members can trial the platform without obligation before upgrading to a paying account.',
  },
];

const PRICING = [
  { label: 'Joining fee', value: '£0' },
  { label: 'Monthly fee', value: '£0' },
  { label: 'Per lead', value: '£0.50–£4' },
  { label: 'Commission', value: '0%' },
];

export default function ForBusinessesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gray-950 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-4">For Tradespeople</p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Grow Your Trade Business<br />
            <span className="text-blue-400">Without the Overheads</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Receive qualified leads from homeowners in your area. Pay only when you receive a lead — no subscriptions, no commission.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['From £0.50 per lead', 'No monthly fees', 'No commission', 'Free trial'].map(item => (
              <span key={item} className="flex items-center gap-1.5 bg-white/10 border border-white/10 text-white text-sm px-4 py-1.5 rounded-full font-medium">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                {item}
              </span>
            ))}
          </div>
          <Link href="/join">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 font-semibold">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-14">
        {/* Benefits */}
        <section className="mb-14">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Why Choose Us</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-7">Why Tradespeople Choose QuoteMyTrade</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white border border-gray-100 rounded-xl p-5">
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

        {/* Pricing */}
        <section className="mb-14">
          <div className="bg-gray-950 rounded-2xl p-8 text-white">
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-2">Pricing</p>
            <h2 className="text-xl font-bold mb-1">Simple, Transparent Pricing</h2>
            <p className="text-gray-400 text-sm mb-7">Lead prices vary by trade. There are no other charges.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-7">
              {PRICING.map(item => (
                <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <p className="text-2xl font-black text-blue-400">{item.value}</p>
                  <p className="text-xs text-gray-400 mt-1 font-medium">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/pricing">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                  View Full Pricing Details
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to Get Started?</h2>
          <p className="text-gray-500 mb-6">Join thousands of UK tradespeople already growing with QuoteMyTrade.</p>
          <Link href="/join">
            <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-white px-10 font-semibold">
              Create Your Free Account
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}

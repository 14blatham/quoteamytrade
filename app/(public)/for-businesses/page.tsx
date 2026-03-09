import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap, SlidersHorizontal, BadgeCheck, Smartphone, Gift } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Tradespeople | Join QuoteMyTrade',
  description: 'Grow your Midlands trade business with pay-per-lead advertising. No subscription, no commission. Join thousands of tradespeople on QuoteMyTrade.',
};

const BENEFITS = [
  { icon: CheckCircle, title: 'Pay Per Lead Only', desc: 'Leads cost just £0.50–£4.00. You only pay when a customer is matched to you — never a flat monthly fee.' },
  { icon: Zap, title: 'No Commission', desc: 'Unlike other platforms, we never take a percentage of your job value. What you earn, you keep.' },
  { icon: SlidersHorizontal, title: 'Full Control', desc: "Set your own prices, choose your postcodes, and pause lead generation instantly when you're fully booked." },
  { icon: BadgeCheck, title: 'Qualified Leads', desc: 'Every lead is a real homeowner actively looking for your service. No tyre-kickers.' },
  { icon: Smartphone, title: 'Works on Mobile', desc: 'Manage everything from your phone — check leads, update coverage, top up your balance — on the go.' },
  { icon: Gift, title: 'Free Trial', desc: 'New members can trial the platform without obligation before upgrading to a paying account.' },
];

const PRICING_STATS = [
  { label: 'Joining fee', value: '£0' },
  { label: 'Monthly fee', value: '£0' },
  { label: 'Per lead', value: '£0.50–£4' },
  { label: 'Commission', value: '0%' },
];

export default function ForBusinessesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero with split photo layout */}
      <div className="relative bg-gray-950 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-0 grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
          {/* Text side */}
          <div className="flex flex-col justify-center py-16 pr-0 lg:pr-12 animate-slide-up">
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-4">For Tradespeople</p>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Grow Your Midlands Business<br />
              <span className="text-blue-400">Without the Overheads</span>
            </h1>
            <p className="text-gray-400 text-base mb-8 leading-relaxed">
              Receive qualified leads from homeowners across Birmingham, Coventry, Nottingham and beyond. Pay only per lead — no subscriptions, no commission.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['From £0.50 per lead', 'No monthly fees', 'No commission', 'Free trial'].map(item => (
                <span key={item} className="flex items-center gap-1.5 bg-white/10 border border-white/10 text-white text-xs px-3 py-1.5 rounded-full font-medium">
                  <CheckCircle className="w-3 h-3 text-blue-400" />
                  {item}
                </span>
              ))}
            </div>
            <div>
              <Link href="/join">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white px-8 font-semibold shadow-lg shadow-blue-900/50 transition-all">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
          {/* Photo side */}
          <div className="hidden lg:block relative">
            <Image
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=900&q=85&auto=format&fit=crop"
              alt="Electrician working"
              fill
              priority
              className="object-cover object-center"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/60 to-transparent" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-14">
        {/* Benefits */}
        <section className="mb-14">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Why Choose Us</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-7">Why Tradespeople Choose QuoteMyTrade</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-blue-100 hover:-translate-y-0.5 transition-all duration-200 animate-slide-up"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <div className="w-11 h-11 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1.5">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Photo quote strip */}
        <section className="relative rounded-2xl overflow-hidden mb-14 h-52">
          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop"
            alt="Builder at work"
            fill
            className="object-cover object-top"
            sizes="(max-width: 896px) 100vw, 896px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 to-gray-950/50" />
          <div className="relative h-full flex items-center px-8">
            <div className="max-w-md">
              <p className="text-xl font-bold text-white mb-1">&ldquo;Best thing I did for my business.&rdquo;</p>
              <p className="text-gray-400 text-sm">Dave Rowley, Midland Build Solutions, Nottingham</p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-14">
          <div className="bg-gray-950 rounded-2xl p-8 text-white">
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-2">Pricing</p>
            <h2 className="text-xl font-bold mb-1">Simple, Transparent Pricing</h2>
            <p className="text-gray-400 text-sm mb-7">Lead prices vary by trade. There are no other charges.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-7">
              {PRICING_STATS.map(item => (
                <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors">
                  <p className="text-2xl font-black text-blue-400">{item.value}</p>
                  <p className="text-xs text-gray-400 mt-1 font-medium">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/pricing">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 hover:text-white active:scale-95 transition-all">
                  View Full Pricing Details
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to Get Started?</h2>
          <p className="text-gray-500 mb-6">Join Midlands tradespeople already growing with QuoteMyTrade.</p>
          <Link href="/join">
            <Button size="lg" className="bg-blue-700 hover:bg-blue-600 active:scale-95 text-white px-10 font-semibold shadow-md shadow-blue-100 transition-all">
              Create Your Free Account
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}

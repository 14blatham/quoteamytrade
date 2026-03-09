import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ClipboardList, Zap, Phone, Star, ShieldCheck, UserCheck, Lock } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works | QuoteMyTrade',
  description: 'See how QuoteMyTrade connects homeowners with vetted local tradespeople in under 2 minutes. Free for customers, pay-per-lead for tradespeople.',
};

const CUSTOMER_STEPS = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Describe Your Job',
    desc: 'Tell us what trade you need and your postcode. Takes under 2 minutes.',
  },
  {
    number: '02',
    icon: Zap,
    title: 'Get Matched Instantly',
    desc: 'We match you with vetted, available tradespeople in your area.',
  },
  {
    number: '03',
    icon: Phone,
    title: 'Contact Directly',
    desc: 'Reach out to the tradespeople directly — no middlemen, no commission.',
  },
  {
    number: '04',
    icon: Star,
    title: 'Leave a Review',
    desc: 'Help others by sharing your experience after the job is done.',
  },
];

const TRADE_STEPS = [
  {
    number: '01',
    title: 'Create a Free Account',
    desc: 'Sign up in minutes. No credit card required to get started.',
  },
  {
    number: '02',
    title: 'Set Your Coverage',
    desc: 'Choose the postcode districts you work in and the services you offer.',
  },
  {
    number: '03',
    title: 'Receive Leads',
    desc: 'Get notified instantly when a homeowner in your area needs your trade.',
  },
  {
    number: '04',
    title: 'Win Jobs',
    desc: 'Contact the customer directly and convert the lead into paid work.',
  },
];

const PROMISES = [
  { icon: ShieldCheck, title: 'Vetted Tradespeople', desc: 'Every supplier is manually reviewed before joining the platform.' },
  { icon: UserCheck, title: 'Real Customer Reviews', desc: 'All reviews are from verified customers who completed a job.' },
  { icon: Lock, title: 'Data Protection', desc: 'Your contact details are never shared without your consent.' },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gray-950 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-4">How It Works</p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            The Fastest Way to Find a<br />
            <span className="text-blue-400">Trusted Tradesperson</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            MidlandsQuotes connects homeowners with vetted local tradespeople in under 2 minutes. Free for customers — always.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-14">
        {/* For customers */}
        <section className="mb-16">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">For Homeowners</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Get Quotes in 4 Steps</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CUSTOMER_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative">
                  <div className="bg-white border border-gray-100 rounded-xl p-5 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-2xl font-black text-gray-100">{step.number}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1.5">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                  {i < CUSTOMER_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-9 left-full w-5 h-px bg-gray-200 z-10" />
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-7 text-center">
            <Link href="/get-quotes">
              <Button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 h-11">
                Get Free Quotes Now
              </Button>
            </Link>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-16" />

        {/* For trades */}
        <section className="mb-16">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">For Business'</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Start Receiving Leads</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TRADE_STEPS.map(step => (
              <div key={step.number} className="bg-gray-50 border border-gray-100 rounded-xl p-5 flex gap-4">
                <span className="text-3xl font-black text-gray-200 leading-none flex-shrink-0">{step.number}</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-7 text-center">
            <Link href="/join">
              <Button variant="outline" className="border-gray-200 text-gray-800 font-semibold px-8 h-11 hover:bg-gray-50">
                Create Free Supplier Account
              </Button>
            </Link>
          </div>
        </section>

        {/* Quality promise */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Our Promise</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quality You Can Trust</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PROMISES.map(item => {
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
      </div>
    </div>
  );
}

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const BENEFITS = [
  'From £0.50 per lead',
  'No monthly subscription',
  'No commission on jobs',
  'Free trial for new members',
  'Full control panel',
  'Pause leads any time',
];

export function SupplierCTA() {
  return (
    <section className="py-20 bg-[#060C18] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-blue-600/5 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">For Tradespeople</p>
            <h2 className="text-4xl font-black text-white tracking-tight leading-tight mb-4">
              Grow your business<br />with qualified leads
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
              Join thousands of UK tradespeople already using QuoteMyTrade. Pay only for the leads you receive — no subscription, no commission.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/join">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8">
                  Join for Free
                </Button>
              </Link>
              <Link href="/for-businesses">
                <Button size="lg" variant="outline" className="border-white/10 text-white hover:bg-white/5 hover:text-white font-semibold px-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {BENEFITS.map(benefit => (
              <div key={benefit} className="flex items-center gap-2.5 bg-white/5 border border-white/5 rounded-lg px-4 py-3">
                <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-sm text-gray-300 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

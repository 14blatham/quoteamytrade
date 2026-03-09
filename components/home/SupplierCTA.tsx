import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function SupplierCTA() {
  return (
    <section className="py-14 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-4xl mb-4 block">🔧</span>
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Are You a Tradesperson?</h2>
        <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
          Join thousands of tradespeople already growing their business with QuoteMyTrade. Pay only per lead — no subscription, no commission.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { icon: '💷', text: 'From £0.50 per lead' },
            { icon: '🚫', text: 'No monthly fees' },
            { icon: '✅', text: 'Free trial available' },
            { icon: '🎛️', text: 'Full control panel' },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm font-medium">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/join">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-10">
              Join for Free
            </Button>
          </Link>
          <Link href="/for-businesses">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-10">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
import { Button } from '@/components/ui/button';

const STEPS = [
  {
    number: '1',
    icon: '📋',
    title: 'Describe Your Job',
    description: 'Fill in a short form — your trade type, postcode and a brief description of the work needed.',
  },
  {
    number: '2',
    icon: '🎯',
    title: 'Get Matched Instantly',
    description: 'We instantly match you with vetted local tradespeople who cover your area and the service you need.',
  },
  {
    number: '3',
    icon: '📞',
    title: 'Contact Them Directly',
    description: 'Receive their contact details and price estimates upfront. Call, email or message — no middleman.',
  },
];

export function HowItWorksStrip() {
  return (
    <section className="py-14 bg-blue-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-2 text-gray-500">Get quotes in minutes — completely free for homeowners</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden sm:block absolute top-10 left-1/2 w-full border-t-2 border-dashed border-blue-200 z-0" />
              )}
              <div className="relative z-10 w-20 h-20 bg-white rounded-full border-2 border-blue-200 flex items-center justify-center text-3xl shadow-sm mb-4">
                {step.icon}
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Step {step.number}</span>
              <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/get-quotes">
            <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-white px-10">
              Get Free Quotes Now
            </Button>
          </Link>
          <p className="mt-3 text-xs text-gray-400">No account required · Results in under 2 minutes</p>
        </div>
      </div>
    </section>
  );
}

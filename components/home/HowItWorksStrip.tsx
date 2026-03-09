import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ClipboardList, Zap, Phone } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Describe Your Job',
    description: 'Fill in a short form — trade type, postcode and a brief description of the work. Takes under 2 minutes.',
  },
  {
    number: '02',
    icon: Zap,
    title: 'Get Matched Instantly',
    description: 'We instantly match you with vetted local tradespeople who cover your area and the service you need.',
  },
  {
    number: '03',
    icon: Phone,
    title: 'Contact Them Directly',
    description: 'Receive their phone number and email immediately. Contact them directly — no middleman, no commission.',
  },
];

export function HowItWorksStrip() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Process</p>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-black text-gray-950 tracking-tight max-w-xs">Three steps to your quote</h2>
            <Link href="/how-it-works" className="hidden sm:flex">
              <Button variant="outline" size="sm" className="font-semibold text-sm">Learn more</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative">
                {/* Connector */}
                {i < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute top-5 left-[calc(50%+32px)] right-0 h-px bg-gray-100" />
                )}
                <div className="flex items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-100 rounded-full w-5 h-5 flex items-center justify-center">{i + 1}</span>
                  </div>
                  <div className="pt-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Step {step.number}</p>
                    <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 pt-14 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">No account required. No call out fees. No commission on the final job.</p>
          <Link href="/get-quotes">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8">Get Free Quotes</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

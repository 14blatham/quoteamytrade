import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works | QuoteMyTrade',
  description: 'Learn how QuoteMyTrade connects homeowners with trusted local tradespeople. Free quotes, no commission, no hidden fees.',
};

const CUSTOMER_STEPS = [
  {
    icon: '📋',
    title: 'Fill In a Short Form',
    description: 'Tell us what type of tradesperson you need, your postcode, and a brief description of the work. It takes less than 2 minutes.',
  },
  {
    icon: '🎯',
    title: 'Get Instantly Matched',
    description: 'Our system instantly matches your request with vetted tradespeople who cover your area and offer the service you need.',
  },
  {
    icon: '📞',
    title: 'Contact Them Directly',
    description: 'Receive their phone number, email and price estimates immediately. Contact them directly — no middleman, no commission.',
  },
  {
    icon: '⭐',
    title: 'Leave a Review',
    description: 'Once the job is done, leave a review to help other homeowners and maintain the quality of our platform.',
  },
];

const TRADESPERSON_STEPS = [
  { icon: '✍️', title: 'Register Free', description: 'Create your profile, add your services, and select the postcode districts you cover. No joining fee.' },
  { icon: '🔔', title: 'Receive Leads', description: 'When a customer in your area requests your service, we send you their details.' },
  { icon: '💷', title: 'Pay a Small Fee', description: 'A fee of £0.50–£4.00 is charged per lead. No subscription, no commission on the job.' },
  { icon: '🎛️', title: 'Stay in Control', description: 'Pause leads when you\'re busy. Adjust pricing. Change coverage areas. It\'s all in your control panel.' },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-blue-700 text-white py-14 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">How QuoteMyTrade Works</h1>
          <p className="text-blue-100 text-lg">Simple, transparent, and free for homeowners.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* For homeowners */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">For Homeowners</h2>
          <p className="text-gray-500 mb-8">Getting quotes is free, quick and involves no obligation.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CUSTOMER_STEPS.map((step, i) => (
              <div key={step.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl flex-shrink-0">
                  {step.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-0.5">Step {i + 1}</p>
                  <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/get-quotes">
              <Button className="bg-blue-700 hover:bg-blue-800 text-white" size="lg">Get Free Quotes Now</Button>
            </Link>
          </div>
        </section>

        <div className="border-t border-gray-100 mb-14" />

        {/* For tradespeople */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">For Tradespeople</h2>
          <p className="text-gray-500 mb-8">Grow your business with qualified leads at low cost. No subscription, no commission.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TRADESPERSON_STEPS.map((step, i) => (
              <div key={step.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl flex-shrink-0">
                  {step.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-0.5">Step {i + 1}</p>
                  <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/join">
              <Button className="bg-green-700 hover:bg-green-800 text-white" size="lg">Join as a Tradesperson</Button>
            </Link>
          </div>
        </section>

        {/* Quality promise */}
        <section className="bg-blue-50 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Our Quality Promise</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {[
              { icon: '🔍', title: 'Vetted Tradespeople', desc: 'All members verify their qualifications and insurance before joining.' },
              { icon: '⭐', title: 'Review System', desc: 'Genuine reviews from real customers. Tradespeople with poor ratings are removed.' },
              { icon: '🔒', title: 'Data Protection', desc: 'Your personal data is never sold. We are fully GDPR compliant.' },
            ].map(item => (
              <div key={item.title} className="flex gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TRADE_CATEGORIES } from '@/lib/constants/trades';

export default function JoinPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [trade, setTrade] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleStep1(e: React.FormEvent) {
    e.preventDefault();
    if (!trade) return;
    setStep(2);
  }

  function handleStep2(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center max-w-md">
          <span className="text-5xl block mb-4">🎉</span>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Application Received!</h1>
          <p className="text-gray-500 mb-6">
            Thank you for registering with QuoteMyTrade. We&apos;ll review your application and be in touch within 24 hours with your free trial login.
          </p>
          <Link href="/login">
            <Button className="bg-blue-700 hover:bg-blue-800 text-white w-full">Go to Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-blue-700">🔨 QuoteMyTrade</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Create Your Free Account</h1>
          <p className="text-gray-500 mt-1 text-sm">Join thousands of UK tradespeople growing with QuoteMyTrade</p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {[
            { icon: '🆓', text: 'Free to join' },
            { icon: '💷', text: 'From 50p per lead' },
            { icon: '🚫', text: 'No monthly fees' },
            { icon: '🎛️', text: 'Full control panel' },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-2 bg-white border border-gray-100 rounded-lg px-3 py-2 text-sm text-gray-700">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {step === 1 ? (
            <form onSubmit={handleStep1} className="space-y-5">
              <h2 className="font-semibold text-gray-900 text-lg">What type of work do you do?</h2>
              <div className="grid grid-cols-2 gap-2">
                {TRADE_CATEGORIES.map(t => (
                  <button
                    key={t.slug}
                    type="button"
                    onClick={() => setTrade(t.slug)}
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 text-sm font-medium text-left transition-all ${
                      trade === t.slug
                        ? 'border-blue-700 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span>{t.icon}</span>
                    <span className="truncate">{t.name}</span>
                  </button>
                ))}
              </div>
              <Button
                type="submit"
                disabled={!trade}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white disabled:opacity-50"
                size="lg"
              >
                Continue →
              </Button>
            </form>
          ) : (
            <form onSubmit={handleStep2} className="space-y-4">
              <h2 className="font-semibold text-gray-900 text-lg">Your Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" className="mt-1" required autoComplete="given-name" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" className="mt-1" required autoComplete="family-name" />
                </div>
              </div>
              <div>
                <Label htmlFor="company">Company name</Label>
                <Input id="company" className="mt-1" required />
              </div>
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" className="mt-1" required autoComplete="email" />
              </div>
              <div>
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" type="tel" className="mt-1" required autoComplete="tel" />
              </div>
              <div>
                <Label htmlFor="postcode">Your base postcode</Label>
                <Input id="postcode" className="mt-1 uppercase" required placeholder="e.g. SW1A 1AA" />
              </div>
              <p className="text-xs text-gray-400">
                By registering you agree to our <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
              </p>
              <div className="flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>← Back</Button>
                <Button type="submit" className="flex-[2] bg-blue-700 hover:bg-blue-800 text-white" size="lg">Register Free</Button>
              </div>
            </form>
          )}
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already a member?{' '}
          <Link href="/login" className="text-blue-700 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

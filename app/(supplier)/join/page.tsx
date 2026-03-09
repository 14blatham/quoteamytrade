'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TRADE_CATEGORIES } from '@/lib/constants/trades';
import { TradeIcon } from '@/components/shared/TradeIcon';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

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
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center max-w-md w-full">
          <div className="w-14 h-14 bg-green-50 border border-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-7 h-7 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Application Received</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Thank you for registering with QuoteMyTrade. We&apos;ll review your application and be in touch within 24 hours with your free trial login.
          </p>
          <Link href="/login">
            <Button className="bg-blue-700 hover:bg-blue-800 text-white w-full font-semibold">Go to Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        {/* Logo + heading */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">Q</span>
            </div>
            <span className="font-bold text-gray-900 text-lg">QuoteMyTrade</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create Your Free Account</h1>
          <p className="text-gray-500 mt-1 text-sm">Join thousands of UK tradespeople growing with QuoteMyTrade</p>
        </div>

        {/* Benefits strip */}
        <div className="grid grid-cols-2 gap-2 mb-7">
          {[
            { label: 'Free to join' },
            { label: 'From 50p per lead' },
            { label: 'No monthly fees' },
            { label: 'Full control panel' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-3 py-2.5 text-sm text-gray-700">
              <CheckCircle className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-5">
          {[1, 2].map(n => (
            <div key={n} className={`h-1 flex-1 rounded-full transition-all ${n <= step ? 'bg-blue-600' : 'bg-gray-200'}`} />
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
          {step === 1 ? (
            <form onSubmit={handleStep1} className="space-y-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">What type of work do you do?</p>
                <div className="grid grid-cols-2 gap-2">
                  {TRADE_CATEGORIES.map(t => (
                    <button
                      key={t.slug}
                      type="button"
                      onClick={() => setTrade(t.slug)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                        trade === t.slug
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-100 bg-gray-50 text-gray-700 hover:border-gray-200 hover:bg-white'
                      }`}
                    >
                      <TradeIcon
                        slug={t.slug}
                        className={`w-4 h-4 flex-shrink-0 ${trade === t.slug ? 'text-blue-600' : 'text-gray-400'}`}
                      />
                      <span className="truncate">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <Button
                type="submit"
                disabled={!trade}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold h-11 disabled:opacity-40"
                size="lg"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          ) : (
            <form onSubmit={handleStep2} className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Your Details</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-xs text-gray-500 mb-1.5 block">First name</Label>
                  <Input id="firstName" className="h-11 border-gray-200" required autoComplete="given-name" />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-xs text-gray-500 mb-1.5 block">Last name</Label>
                  <Input id="lastName" className="h-11 border-gray-200" required autoComplete="family-name" />
                </div>
              </div>
              <div>
                <Label htmlFor="company" className="text-xs text-gray-500 mb-1.5 block">Company name</Label>
                <Input id="company" className="h-11 border-gray-200" required />
              </div>
              <div>
                <Label htmlFor="email" className="text-xs text-gray-500 mb-1.5 block">Email address</Label>
                <Input id="email" type="email" className="h-11 border-gray-200" required autoComplete="email" />
              </div>
              <div>
                <Label htmlFor="phone" className="text-xs text-gray-500 mb-1.5 block">Phone number</Label>
                <Input id="phone" type="tel" className="h-11 border-gray-200" required autoComplete="tel" />
              </div>
              <div>
                <Label htmlFor="postcode" className="text-xs text-gray-500 mb-1.5 block">Base postcode</Label>
                <Input id="postcode" className="h-11 border-gray-200 uppercase" required placeholder="e.g. SW1A 1AA" />
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                By registering you agree to our{' '}
                <Link href="/terms" className="text-blue-700 hover:underline">Terms of Service</Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-blue-700 hover:underline">Privacy Policy</Link>.
              </p>
              <div className="flex gap-3">
                <Button type="button" variant="outline" className="flex-1 h-11 border-gray-200 text-gray-700" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  Back
                </Button>
                <Button type="submit" className="flex-[2] bg-blue-700 hover:bg-blue-800 text-white font-semibold h-11" size="lg">
                  Register Free
                </Button>
              </div>
            </form>
          )}
        </div>

        <p className="mt-5 text-center text-sm text-gray-500">
          Already a member?{' '}
          <Link href="/login" className="text-blue-700 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useQuoteForm } from './QuoteFormContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export function StepContactInfo() {
  const { formState, updateForm } = useQuoteForm();
  const [firstName, setFirstName] = useState(formState.contact?.firstName ?? '');
  const [lastName, setLastName] = useState(formState.contact?.lastName ?? '');
  const [email, setEmail] = useState(formState.contact?.email ?? '');
  const [phone, setPhone] = useState(formState.contact?.phone ?? '');
  const [preferredContact, setPreferredContact] = useState<'email' | 'phone' | 'either'>(
    formState.contact?.preferredContact ?? 'email'
  );

  const isValid = firstName && lastName && email && phone;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    updateForm({ contact: { firstName, lastName, email, phone, preferredContact } });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">
            First Name
          </Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
            autoComplete="given-name"
            className="h-11 border-gray-200 focus:border-blue-400 focus:ring-blue-100"
          />
        </div>
        <div>
          <Label htmlFor="lastName" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">
            Last Name
          </Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
            autoComplete="family-name"
            className="h-11 border-gray-200 focus:border-blue-400 focus:ring-blue-100"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="h-11 border-gray-200 focus:border-blue-400 focus:ring-blue-100"
        />
      </div>

      <div>
        <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">
          Phone Number
        </Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
          autoComplete="tel"
          className="h-11 border-gray-200 focus:border-blue-400 focus:ring-blue-100"
        />
      </div>

      {/* Preferred contact */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Preferred Contact Method</p>
        <div className="grid grid-cols-2 gap-2">
          {(['email', 'phone'] as const).map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => setPreferredContact(opt)}
              className={`py-2.5 rounded-xl border-2 text-sm font-medium capitalize transition-all ${
                preferredContact === opt
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-100 bg-gray-50 text-gray-700 hover:border-gray-200'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Privacy note */}
      <div className="flex items-start gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
        <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-gray-500 leading-relaxed">
          Your details are shared only with matched tradespeople. We never sell your data to third parties.
        </p>
      </div>

      <div className="flex gap-3 pt-1">
        <Button
          type="button"
          variant="outline"
          className="flex-1 border-gray-200 text-gray-700 h-11"
          onClick={() => updateForm({ step: 2 })}
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back
        </Button>
        <Button
          type="submit"
          disabled={!isValid}
          className="flex-[2] bg-blue-700 hover:bg-blue-800 text-white font-semibold h-11 disabled:opacity-40"
          size="lg"
        >
          Get Free Quotes
        </Button>
      </div>
    </form>
  );
}

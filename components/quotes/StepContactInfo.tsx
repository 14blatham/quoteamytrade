'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useQuoteForm } from './QuoteFormContext';
import type { PreferredContact } from '@/types';

const CONTACT_OPTIONS: { value: PreferredContact; label: string }[] = [
  { value: 'phone', label: 'Phone call' },
  { value: 'email', label: 'Email' },
  { value: 'either', label: 'Either' },
];

export function StepContactInfo() {
  const router = useRouter();
  const { formState, updateForm, clearForm } = useQuoteForm();

  const [firstName, setFirstName] = useState(formState.contact?.firstName ?? '');
  const [lastName, setLastName] = useState(formState.contact?.lastName ?? '');
  const [email, setEmail] = useState(formState.contact?.email ?? '');
  const [phone, setPhone] = useState(formState.contact?.phone ?? '');
  const [preferredContact, setPreferredContact] = useState<PreferredContact>(
    formState.contact?.preferredContact ?? 'either'
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!formState.tradeSlug || !formState.jobDetails) {
    router.replace('/get-quotes');
    return null;
  }

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!email.includes('@') || !email.includes('.')) newErrors.email = 'Please enter a valid email address.';
    if (phone.length < 10) newErrors.phone = 'Please enter a valid UK phone number.';
    return newErrors;
  }

  function handleBack() { router.back(); }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    updateForm({
      contact: { firstName, lastName, email, phone, preferredContact },
    });

    const params = new URLSearchParams({
      trade: formState.tradeSlug!,
      postcode: formState.postcode!,
    });

    clearForm();
    router.push(`/results?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            className="mt-1"
            autoComplete="given-name"
          />
          {errors.firstName && <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            className="mt-1"
            autoComplete="family-name"
          />
          {errors.lastName && <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mt-1"
          autoComplete="email"
          placeholder="your@email.co.uk"
        />
        {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
      </div>

      <div>
        <Label htmlFor="phone">Phone number</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="mt-1"
          autoComplete="tel"
          placeholder="07700 900123"
        />
        {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
      </div>

      <div>
        <Label>Preferred contact method</Label>
        <div className="flex gap-3 mt-2">
          {CONTACT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setPreferredContact(opt.value)}
              className={`flex-1 py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                preferredContact === opt.value
                  ? 'border-blue-700 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-400 bg-gray-50 rounded-lg p-3 border border-gray-100">
        🔒 Your details are shared only with matched tradespeople in your area. We will never sell your data to third parties.
      </p>

      <div className="flex gap-3">
        <Button type="button" variant="outline" className="flex-1" onClick={handleBack}>
          ← Back
        </Button>
        <Button type="submit" className="flex-[2] bg-blue-700 hover:bg-blue-800 text-white" size="lg">
          Find Tradespeople →
        </Button>
      </div>
    </form>
  );
}

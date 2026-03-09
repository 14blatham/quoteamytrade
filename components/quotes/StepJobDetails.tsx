'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useQuoteForm } from './QuoteFormContext';
import type { Urgency, PropertyType } from '@/types';

const URGENCY_OPTIONS: { value: Urgency; label: string; icon: string }[] = [
  { value: 'emergency', label: 'Emergency — ASAP', icon: '🚨' },
  { value: 'within-week', label: 'Within a week', icon: '📅' },
  { value: 'flexible', label: 'I\'m flexible', icon: '🕐' },
];

const PROPERTY_OPTIONS: { value: PropertyType; label: string; icon: string }[] = [
  { value: 'house', label: 'House', icon: '🏠' },
  { value: 'flat', label: 'Flat / Apartment', icon: '🏢' },
  { value: 'commercial', label: 'Commercial', icon: '🏭' },
  { value: 'other', label: 'Other', icon: '🏗️' },
];

export function StepJobDetails() {
  const router = useRouter();
  const { formState, updateForm } = useQuoteForm();

  const [description, setDescription] = useState(formState.jobDetails?.description ?? '');
  const [urgency, setUrgency] = useState<Urgency>(formState.jobDetails?.urgency ?? 'flexible');
  const [propertyType, setPropertyType] = useState<PropertyType>(formState.jobDetails?.propertyType ?? 'house');
  const [error, setError] = useState('');

  if (!formState.tradeSlug) {
    router.replace('/get-quotes');
    return null;
  }

  function handleBack() {
    router.back();
  }

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (description.trim().length < 20) {
      setError('Please describe your job in at least 20 characters.');
      return;
    }
    updateForm({
      step: 3,
      jobDetails: { description: description.trim(), urgency, propertyType },
    });
    router.push('/get-quotes/contact');
  }

  return (
    <form onSubmit={handleNext} className="space-y-6">
      <div>
        <Label>How urgent is this job?</Label>
        <div className="grid grid-cols-3 gap-3 mt-2">
          {URGENCY_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setUrgency(opt.value)}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 text-center text-sm font-medium transition-all ${
                urgency === opt.value
                  ? 'border-blue-700 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="text-xl">{opt.icon}</span>
              <span className="text-xs leading-tight">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label>Property type</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
          {PROPERTY_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setPropertyType(opt.value)}
              className={`flex items-center gap-2 p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                propertyType === opt.value
                  ? 'border-blue-700 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="description">Describe the job</Label>
        <Textarea
          id="description"
          placeholder="e.g. Combi boiler needs replacing, currently a 10-year-old Baxi. Would like like-for-like swap if possible. 3-bed semi-detached."
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="mt-1 min-h-[120px]"
        />
        <p className="mt-1 text-xs text-gray-400">{description.length} characters (min 20)</p>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <Button type="button" variant="outline" className="flex-1" onClick={handleBack}>
          ← Back
        </Button>
        <Button type="submit" className="flex-[2] bg-blue-700 hover:bg-blue-800 text-white" size="lg">
          Continue →
        </Button>
      </div>
    </form>
  );
}

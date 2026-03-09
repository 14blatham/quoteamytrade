'use client';

import { useState } from 'react';
import { useQuoteForm } from './QuoteFormContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const URGENCY_OPTIONS = [
  { value: 'emergency', label: 'Emergency', sub: 'Within 24 hours' },
  { value: 'week', label: 'Within a Week', sub: 'Non-urgent' },
  { value: 'flexible', label: 'Flexible', sub: 'No rush' },
];

const PROPERTY_OPTIONS = [
  { value: 'house', label: 'House' },
  { value: 'flat', label: 'Flat' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'other', label: 'Other' },
];

export function StepJobDetails() {
  const { formState, updateForm } = useQuoteForm();
  const [urgency, setUrgency] = useState(formState.jobDetails?.urgency ?? '');
  const [propertyType, setPropertyType] = useState(formState.jobDetails?.propertyType ?? '');
  const [description, setDescription] = useState(formState.jobDetails?.description ?? '');
  const [error, setError] = useState('');

  const isValid = urgency && propertyType && description.trim().length >= 20;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (description.trim().length < 20) {
      setError('Please provide at least 20 characters describing the job.');
      return;
    }
    updateForm({
      jobDetails: { urgency: urgency as any, propertyType: propertyType as any, description },
      step: 3,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Urgency */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">How urgent is the job?</p>
        <div className="grid grid-cols-3 gap-2">
          {URGENCY_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setUrgency(opt.value)}
              className={`p-3 rounded-xl border-2 text-left transition-all ${
                urgency === opt.value
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-100 bg-gray-50 hover:border-gray-200'
              }`}
            >
              <p className={`text-sm font-semibold ${urgency === opt.value ? 'text-blue-700' : 'text-gray-800'}`}>
                {opt.label}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">{opt.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Property type */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Property Type</p>
        <div className="grid grid-cols-4 gap-2">
          {PROPERTY_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setPropertyType(opt.value)}
              className={`py-2.5 px-3 rounded-xl border-2 text-sm font-medium transition-all ${
                propertyType === opt.value
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-100 bg-gray-50 text-gray-700 hover:border-gray-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 block">
          Describe the Job
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={e => { setDescription(e.target.value); setError(''); }}
          placeholder="Please describe the work needed — e.g. leaking pipe under kitchen sink, needs replacing..."
          rows={4}
          className="resize-none border-gray-200 focus:border-blue-400 focus:ring-blue-100"
        />
        <div className="flex items-center justify-between mt-1.5">
          {error ? (
            <p className="text-xs text-red-600">{error}</p>
          ) : (
            <p className="text-xs text-gray-400">{Math.max(0, 20 - description.trim().length)} characters minimum remaining</p>
          )}
          <p className="text-xs text-gray-400">{description.length} chars</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1 border-gray-200 text-gray-700 h-11"
          onClick={() => updateForm({ step: 1 })}
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
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </form>
  );
}

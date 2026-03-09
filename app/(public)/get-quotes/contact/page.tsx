import { QuoteFormStepper } from '@/components/quotes/QuoteFormStepper';
import { StepContactInfo } from '@/components/quotes/StepContactInfo';

export const metadata = { title: 'Get Free Quotes — Step 3 of 3' };

export default function QuoteContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Get Free Quotes</h1>
          <p className="text-gray-500 mt-1">Last step — enter your contact details</p>
        </div>
        <div className="mb-8">
          <QuoteFormStepper currentStep={3} />
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Your contact details</h2>
          <StepContactInfo />
        </div>
      </div>
    </div>
  );
}

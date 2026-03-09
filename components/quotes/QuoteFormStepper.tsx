import { Check } from 'lucide-react';

const STEPS = [
  { number: 1, label: 'Service & Location' },
  { number: 2, label: 'Job Details' },
  { number: 3, label: 'Contact Info' },
];

interface Props {
  currentStep: 1 | 2 | 3;
}

export function QuoteFormStepper({ currentStep }: Props) {
  return (
    <div className="flex items-center justify-center gap-0">
      {STEPS.map((step, index) => {
        const isCompleted = step.number < currentStep;
        const isActive = step.number === currentStep;

        return (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isCompleted
                    ? 'bg-blue-600 text-white'
                    : isActive
                    ? 'bg-blue-700 text-white ring-4 ring-blue-100'
                    : 'bg-gray-100 text-gray-400 border border-gray-200'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step.number}
              </div>
              <span
                className={`mt-1.5 text-[10px] font-semibold uppercase tracking-wide whitespace-nowrap ${
                  isActive ? 'text-blue-700' : isCompleted ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={`h-px w-16 sm:w-24 mb-5 mx-2 transition-all ${
                  step.number < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

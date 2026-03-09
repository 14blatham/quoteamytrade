interface Step {
  number: number;
  label: string;
}

const STEPS: Step[] = [
  { number: 1, label: 'Service & Location' },
  { number: 2, label: 'Job Details' },
  { number: 3, label: 'Contact Info' },
];

interface QuoteFormStepperProps {
  currentStep: 1 | 2 | 3;
}

export function QuoteFormStepper({ currentStep }: QuoteFormStepperProps) {
  return (
    <div className="flex items-center justify-center gap-0">
      {STEPS.map((step, i) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                step.number < currentStep
                  ? 'bg-blue-700 border-blue-700 text-white'
                  : step.number === currentStep
                  ? 'bg-white border-blue-700 text-blue-700'
                  : 'bg-white border-gray-200 text-gray-400'
              }`}
            >
              {step.number < currentStep ? '✓' : step.number}
            </div>
            <span
              className={`mt-1 text-xs font-medium hidden sm:block ${
                step.number === currentStep ? 'text-blue-700' : 'text-gray-400'
              }`}
            >
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`w-16 sm:w-24 h-0.5 mx-1 mb-5 sm:mb-0 transition-colors ${
                step.number < currentStep ? 'bg-blue-700' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

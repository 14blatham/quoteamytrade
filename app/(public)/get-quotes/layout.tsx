import { QuoteFormProvider } from '@/components/quotes/QuoteFormContext';

export default function QuoteFormLayout({ children }: { children: React.ReactNode }) {
  return <QuoteFormProvider>{children}</QuoteFormProvider>;
}

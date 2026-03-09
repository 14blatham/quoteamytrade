import { Suspense } from 'react';
import { ResultsContent } from './ResultsContent';

export const metadata = { title: 'Results — Local Tradespeople Near You' };

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-400">Finding tradespeople near you…</div>}>
      <ResultsContent />
    </Suspense>
  );
}

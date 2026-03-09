import { MOCK_TESTIMONIALS } from '@/lib/mock-data/testimonials';
import { StarRating } from '@/components/shared/StarRating';

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Reviews</p>
          <h2 className="text-3xl font-black text-gray-950 tracking-tight">What customers say</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOCK_TESTIMONIALS.map(t => (
            <div key={t.id} className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col">
              <StarRating rating={t.rating} />
              <blockquote className="mt-4 text-sm text-gray-600 leading-relaxed flex-1 italic">
                &ldquo;{t.comment}&rdquo;
              </blockquote>
              <div className="mt-5 pt-5 border-t border-gray-50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-black text-xs flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.trade} &middot; {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

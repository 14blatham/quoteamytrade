import { MOCK_TESTIMONIALS } from '@/lib/mock-data/testimonials';
import { StarRating } from '@/components/shared/StarRating';

export function TestimonialsSection() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="mt-2 text-gray-500">Real reviews from real homeowners across the UK</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TESTIMONIALS.map(t => (
            <div key={t.id} className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col">
              <StarRating rating={t.rating} />
              <blockquote className="mt-3 text-sm text-gray-700 leading-relaxed flex-1">
                &ldquo;{t.comment}&rdquo;
              </blockquote>
              <div className="mt-4 flex items-center gap-3 pt-4 border-t border-gray-200">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.trade} · {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

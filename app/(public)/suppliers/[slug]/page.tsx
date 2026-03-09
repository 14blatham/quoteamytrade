import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/shared/StarRating';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { MOCK_SUPPLIERS, getReviewsForSupplier } from '@/lib/mock-data/suppliers';
import { TRADE_CATEGORIES } from '@/lib/constants/trades';
import { formatGBP, formatShortDate } from '@/lib/utils/formatting';
import { generateSupplierMeta, generateJsonLdLocalBusiness } from '@/lib/utils/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MOCK_SUPPLIERS.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const supplier = MOCK_SUPPLIERS.find(s => s.slug === slug);
  if (!supplier) return {};
  return generateSupplierMeta(supplier.companyName, supplier.slug, supplier.bio);
}

export default async function SupplierProfilePage({ params }: Props) {
  const { slug } = await params;
  const supplier = MOCK_SUPPLIERS.find(s => s.slug === slug);
  if (!supplier) notFound();

  const reviews = getReviewsForSupplier(supplier.id);
  const trades = supplier.trades
    .map(t => TRADE_CATEGORIES.find(c => c.slug === t))
    .filter(Boolean);

  const jsonLd = generateJsonLdLocalBusiness({
    companyName: supplier.companyName,
    bio: supplier.bio,
    averageRating: supplier.stats.averageRating,
    reviewCount: supplier.stats.reviewCount,
    coveragePostcodes: supplier.coveragePostcodes,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-start gap-4 flex-wrap">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-2xl flex-shrink-0">
                {supplier.companyName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold text-gray-900">{supplier.companyName}</h1>
                  <VerifiedBadge status={supplier.verification} />
                </div>
                <p className="text-gray-500 text-sm mt-1">{supplier.ownerName}</p>
                <div className="flex items-center gap-4 mt-2 flex-wrap text-sm">
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={supplier.stats.averageRating} size="md" />
                    <span className="font-semibold">{supplier.stats.averageRating}</span>
                    <span className="text-gray-400">({supplier.stats.reviewCount} reviews)</span>
                  </div>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-600">{supplier.stats.jobsCompleted} jobs completed</span>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-600">Member since {new Date(supplier.stats.memberSince).getFullYear()}</span>
                </div>
              </div>
              <Link href={`/get-quotes?trade=${supplier.trades[0]}`}>
                <Button className="bg-blue-700 hover:bg-blue-800 text-white">Get a Quote</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <section className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-3">About</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{supplier.bio}</p>
            </section>

            {/* Services & Pricing */}
            <section className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Services & Pricing</h2>
              <div className="divide-y divide-gray-50">
                {Object.entries(supplier.pricing).map(([id, pricing]) => (
                  <div key={id} className="py-3 flex items-center justify-between">
                    <span className="text-sm text-gray-700 capitalize">{id.replace(/-/g, ' ')}</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatGBP(pricing.priceFrom)} – {formatGBP(pricing.priceTo)}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">
                Customer Reviews ({reviews.length})
              </h2>
              {reviews.length > 0 ? (
                <div className="space-y-5">
                  {reviews.map(review => (
                    <div key={review.id} className="border-b border-gray-50 pb-5 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <StarRating rating={review.rating} />
                          <p className="font-semibold text-sm text-gray-900 mt-1">{review.customerName}</p>
                          <p className="text-xs text-gray-400">{review.serviceType} · {review.location}</p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-xs text-gray-400">{formatShortDate(review.date)}</span>
                          {review.verified && (
                            <span className="text-xs text-green-600 font-medium">✓ Verified</span>
                          )}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No reviews yet.</p>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Trades */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">Trades</h3>
              <div className="flex flex-wrap gap-2">
                {trades.map(t => t && (
                  <Link
                    key={t.slug}
                    href={`/services/${t.slug}`}
                    className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    <span>{t.icon}</span>
                    <span>{t.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Coverage */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">Coverage Areas</h3>
              <div className="flex flex-wrap gap-1.5">
                {supplier.coveragePostcodes.map(pc => (
                  <span key={pc} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{pc}</span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">Quick Stats</h3>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Response time</span>
                <span className="font-medium">~{supplier.stats.responseTimeHours}h</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Jobs completed</span>
                <span className="font-medium">{supplier.stats.jobsCompleted}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Member since</span>
                <span className="font-medium">{new Date(supplier.stats.memberSince).getFullYear()}</span>
              </div>
            </div>

            <Link href={`/get-quotes?trade=${supplier.trades[0]}`}>
              <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white">
                Get a Free Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

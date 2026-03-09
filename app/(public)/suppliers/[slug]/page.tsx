import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/shared/StarRating';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { TradeIcon } from '@/components/shared/TradeIcon';
import { MOCK_SUPPLIERS, getReviewsForSupplier } from '@/lib/mock-data/suppliers';
import { TRADE_CATEGORIES } from '@/lib/constants/trades';
import { formatGBP, formatShortDate } from '@/lib/utils/formatting';
import { generateSupplierMeta, generateJsonLdLocalBusiness } from '@/lib/utils/seo';
import { ShieldCheck, Clock, Briefcase, MapPin, ArrowRight } from 'lucide-react';

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

  const initials = supplier.companyName.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-start gap-5 flex-wrap">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-2xl bg-gray-950 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-lg tracking-tight">{initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <h1 className="text-2xl font-bold text-gray-900">{supplier.companyName}</h1>
                  <VerifiedBadge status={supplier.verification} />
                </div>
                <p className="text-sm text-gray-500 mb-2">{supplier.ownerName}</p>
                <div className="flex items-center gap-3 flex-wrap text-sm">
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={supplier.stats.averageRating} size="md" />
                    <span className="font-bold text-gray-900">{supplier.stats.averageRating}</span>
                    <span className="text-gray-400">({supplier.stats.reviewCount} reviews)</span>
                  </div>
                  <span className="text-gray-200">|</span>
                  <span className="text-gray-600">{supplier.stats.jobsCompleted} jobs</span>
                  <span className="text-gray-200">|</span>
                  <span className="text-gray-600">Since {new Date(supplier.stats.memberSince).getFullYear()}</span>
                </div>
              </div>
              <Link href={`/get-quotes?trade=${supplier.trades[0]}`} className="flex-shrink-0">
                <Button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold">
                  Get a Quote
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-5">
            {/* About */}
            <section className="bg-white rounded-xl border border-gray-100 p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">About</p>
              <p className="text-gray-600 text-sm leading-relaxed">{supplier.bio}</p>
            </section>

            {/* Services & Pricing */}
            <section className="bg-white rounded-xl border border-gray-100 p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Services & Pricing</p>
              <div className="divide-y divide-gray-50">
                {Object.entries(supplier.pricing).map(([id, pricing]) => (
                  <div key={id} className="py-3.5 flex items-center justify-between">
                    <span className="text-sm text-gray-700 capitalize font-medium">{id.replace(/-/g, ' ')}</span>
                    <span className="text-sm font-bold text-gray-900">
                      {formatGBP((pricing as any).priceFrom)} – {formatGBP((pricing as any).priceTo)}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section className="bg-white rounded-xl border border-gray-100 p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
                Customer Reviews ({reviews.length})
              </p>
              {reviews.length > 0 ? (
                <div className="space-y-5">
                  {reviews.map(review => (
                    <div key={review.id} className="border-b border-gray-50 pb-5 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-blue-700">
                              {review.customerName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <StarRating rating={review.rating} />
                            <p className="font-semibold text-sm text-gray-900 mt-1">{review.customerName}</p>
                            <p className="text-xs text-gray-400">{review.serviceType} · {review.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span className="text-xs text-gray-400">{formatShortDate(review.date)}</span>
                          {review.verified && (
                            <span className="flex items-center gap-0.5 text-[10px] text-green-600 font-bold uppercase tracking-wide">
                              <ShieldCheck className="w-3 h-3" />
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-600 leading-relaxed pl-11">{review.comment}</p>
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
            {/* Quick stats */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Quick Stats</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    Response time
                  </div>
                  <span className="text-sm font-bold text-gray-900">~{supplier.stats.responseTimeHours}h</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Briefcase className="w-3.5 h-3.5" />
                    Jobs completed
                  </div>
                  <span className="text-sm font-bold text-gray-900">{supplier.stats.jobsCompleted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-3.5 h-3.5" />
                    Coverage areas
                  </div>
                  <span className="text-sm font-bold text-gray-900">{supplier.coveragePostcodes.length}</span>
                </div>
              </div>
            </div>

            {/* Trades */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Trades</p>
              <div className="flex flex-wrap gap-2">
                {trades.map(t => t && (
                  <Link
                    key={t.slug}
                    href={`/services/${t.slug}`}
                    className="flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-100 text-gray-700 px-2.5 py-1.5 rounded-lg hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium"
                  >
                    <TradeIcon slug={t.slug} className="w-3 h-3" />
                    {t.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Coverage */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Coverage Areas</p>
              <div className="flex flex-wrap gap-1.5">
                {supplier.coveragePostcodes.map(pc => (
                  <span key={pc} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-mono font-medium">{pc}</span>
                ))}
              </div>
            </div>

            <Link href={`/get-quotes?trade=${supplier.trades[0]}`}>
              <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold">
                Get a Free Quote
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

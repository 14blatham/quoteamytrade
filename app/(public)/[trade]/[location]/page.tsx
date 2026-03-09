import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { TRADE_CATEGORIES } from '@/lib/constants/trades';
import { UK_LOCATIONS } from '@/lib/constants/locations';
import { MOCK_SUPPLIERS } from '@/lib/mock-data/suppliers';
import { SupplierCard } from '@/components/results/SupplierCard';
import { TradeIcon } from '@/components/shared/TradeIcon';
import { formatGBP } from '@/lib/utils/formatting';
import { generateTradeLocationMeta, generateJsonLdFAQ } from '@/lib/utils/seo';
import { MapPin, ChevronRight } from 'lucide-react';

// Trade-specific photos
const TRADE_PHOTOS: Record<string, string> = {
  plumbers:             'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1400&q=85&auto=format&fit=crop',
  electricians:         'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1400&q=85&auto=format&fit=crop',
  builders:             'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=85&auto=format&fit=crop',
  surveyors:            'https://images.unsplash.com/photo-1485739681457-ec53f5fcab7e?w=1400&q=85&auto=format&fit=crop',
  'gas-engineers':      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1400&q=85&auto=format&fit=crop',
  roofers:              'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=85&auto=format&fit=crop',
  plasterers:           'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1400&q=85&auto=format&fit=crop',
  'painters-decorators':'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1400&q=85&auto=format&fit=crop',
  'joiners-carpenters': 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1400&q=85&auto=format&fit=crop',
  tilers:               'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=85&auto=format&fit=crop',
};

interface Props {
  params: Promise<{ trade: string; location: string }>;
}

export async function generateStaticParams() {
  return TRADE_CATEGORIES.flatMap(trade =>
    UK_LOCATIONS.map(loc => ({ trade: trade.slug, location: loc.slug }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { trade: tradeSlug, location: locationSlug } = await params;
  const trade = TRADE_CATEGORIES.find(t => t.slug === tradeSlug);
  const loc = UK_LOCATIONS.find(l => l.slug === locationSlug);
  if (!trade || !loc) return {};
  return generateTradeLocationMeta(trade, loc);
}

export default async function TradeLocationPage({ params }: Props) {
  const { trade: tradeSlug, location: locationSlug } = await params;
  const trade = TRADE_CATEGORIES.find(t => t.slug === tradeSlug);
  const loc = UK_LOCATIONS.find(l => l.slug === locationSlug);
  if (!trade || !loc) notFound();
  const location = loc;

  const suppliers = MOCK_SUPPLIERS.filter(s => {
    const hasTrade = s.trades.includes(tradeSlug as any);
    const isActive = s.status === 'active' && s.leadsEnabled;
    const coversArea = s.coveragePostcodes.some(p =>
      location.postcodeDistricts.some(d => d.startsWith(p) || p.startsWith(d.slice(0, 2)))
    );
    return hasTrade && isActive && coversArea;
  });

  const photo = TRADE_PHOTOS[tradeSlug] ?? TRADE_PHOTOS.builders;

  const faqs = [
    {
      question: `How much do ${trade.name.toLowerCase()} cost in ${location.city}?`,
      answer: `${trade.name} in ${location.city} typically charge between ${formatGBP(trade.averageCostFrom)} and ${formatGBP(trade.averageCostTo)} depending on the job. Get free, no-obligation quotes through QuoteMyTrade.`,
    },
    {
      question: `How quickly can I find a ${trade.singularName.toLowerCase()} in ${location.city}?`,
      answer: `Using QuoteMyTrade, you can receive contact details for vetted local ${trade.name.toLowerCase()} in ${location.city} in under 2 minutes.`,
    },
    {
      question: `Do I need to pay to use QuoteMyTrade in ${location.city}?`,
      answer: `No — QuoteMyTrade is completely free for customers in ${location.city}. We don't charge any fees or take commission on completed jobs.`,
    },
  ];

  const jsonLd = generateJsonLdFAQ(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <div className="min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-1.5 text-xs text-gray-400">
            <Link href="/" className="hover:text-blue-700 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/services/${trade.slug}`} className="hover:text-blue-700 transition-colors">{trade.name}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-700 font-medium">{location.city}</span>
          </div>
        </div>

        {/* Photo hero */}
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <Image
            src={photo}
            alt={`${trade.name} in ${location.city}`}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/65 to-gray-950" />
          <div className="relative h-full flex flex-col items-center justify-center text-center px-4 animate-slide-up">
            <div className="w-12 h-12 bg-blue-600/80 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TradeIcon slug={trade.slug} className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
              {trade.name} in {location.city}
            </h1>
            <p className="text-gray-400 text-sm mb-1">{location.region}</p>
            <p className="text-gray-500 text-xs mb-5">
              Typical cost:{' '}
              <strong className="text-white">{formatGBP(trade.averageCostFrom)} – {formatGBP(trade.averageCostTo)}</strong>
            </p>
            <Link href={`/get-quotes?trade=${trade.slug}&postcode=${location.postcodeDistricts[0]}`}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-semibold px-7 shadow-lg transition-all">
                Get Free Quotes in {location.city}
              </Button>
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          {/* Suppliers */}
          {suppliers.length > 0 ? (
            <section className="mb-10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Available Now</p>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {suppliers.length} {trade.name} in {location.city}
              </h2>
              <div className="space-y-4">
                {suppliers.map(supplier => (
                  <SupplierCard key={supplier.id} supplier={supplier} />
                ))}
              </div>
            </section>
          ) : (
            <section className="mb-10">
              <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center">
                <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-gray-700 font-semibold mb-1">Growing our network in {location.city}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Request quotes now and we&apos;ll match you with available {trade.name.toLowerCase()}.
                </p>
                <Link href={`/get-quotes?trade=${trade.slug}`}>
                  <Button className="bg-blue-700 hover:bg-blue-600 active:scale-95 text-white font-semibold transition-all">
                    Request Quotes
                  </Button>
                </Link>
              </div>
            </section>
          )}

          {/* Nearby locations */}
          <section className="mb-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Nearby</p>
            <h2 className="text-xl font-bold text-gray-900 mb-4">{trade.name} in Nearby Midlands Areas</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {UK_LOCATIONS.filter(l => l.slug !== location.slug).slice(0, 8).map(nearbyLoc => (
                <Link
                  key={nearbyLoc.slug}
                  href={`/${trade.slug}/${nearbyLoc.slug}`}
                  className="flex items-center gap-2 text-sm bg-white border border-gray-100 rounded-xl px-3 py-2.5 text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 hover:-translate-y-0.5 transition-all font-medium"
                >
                  <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  {nearbyLoc.city}
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">FAQs</p>
            <h2 className="text-xl font-bold text-gray-900 mb-4">{trade.name} in {location.city}</h2>
            <div className="space-y-3">
              {faqs.map(faq => (
                <div key={faq.question} className="bg-white border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

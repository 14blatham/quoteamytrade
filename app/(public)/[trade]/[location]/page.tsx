import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TRADE_CATEGORIES } from '@/lib/constants/trades';
import { UK_LOCATIONS } from '@/lib/constants/locations';
import { MOCK_SUPPLIERS } from '@/lib/mock-data/suppliers';
import { SupplierCard } from '@/components/results/SupplierCard';
import { TradeIcon } from '@/components/shared/TradeIcon';
import { formatGBP } from '@/lib/utils/formatting';
import { generateTradeLocationMeta, generateJsonLdFAQ } from '@/lib/utils/seo';
import { MapPin, ChevronRight } from 'lucide-react';

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

  const faqs = [
    {
      question: `How much do ${trade.name.toLowerCase()} cost in ${location.city}?`,
      answer: `${trade.name} in ${location.city} typically charge between ${formatGBP(trade.averageCostFrom)} and ${formatGBP(trade.averageCostTo)} depending on the job. Prices vary by area, job complexity and individual contractor. Get free, no-obligation quotes through QuoteMyTrade.`,
    },
    {
      question: `How quickly can I find a ${trade.singularName.toLowerCase()} in ${location.city}?`,
      answer: `Using QuoteMyTrade, you can receive contact details for vetted local ${trade.name.toLowerCase()} in ${location.city} in under 2 minutes. Simply fill in a short form and we match you instantly with available tradespeople in your area.`,
    },
    {
      question: `Do I need to pay to use QuoteMyTrade in ${location.city}?`,
      answer: `No — QuoteMyTrade is completely free for customers in ${location.city} and across the UK. We don't charge any fees or take commission on completed jobs.`,
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

        {/* Hero */}
        <div className="bg-gray-950 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TradeIcon slug={trade.slug} className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
              {trade.name} in {location.city}
            </h1>
            <p className="text-gray-400 text-lg mb-2">
              Free quotes from vetted local {trade.name.toLowerCase()} in {location.city} and {location.region}
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Typical cost:{' '}
              <strong className="text-white">{formatGBP(trade.averageCostFrom)} – {formatGBP(trade.averageCostTo)}</strong>
            </p>
            <Link href={`/get-quotes?trade=${trade.slug}&postcode=${location.postcodeDistricts[0]}`}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10">
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
                  <Button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold">Request Quotes</Button>
                </Link>
              </div>
            </section>
          )}

          {/* Nearby locations */}
          <section className="mb-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Nearby</p>
            <h2 className="text-xl font-bold text-gray-900 mb-4">{trade.name} in Nearby Areas</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {UK_LOCATIONS.filter(l => l.slug !== location.slug).slice(0, 8).map(nearbyLoc => (
                <Link
                  key={nearbyLoc.slug}
                  href={`/${trade.slug}/${nearbyLoc.slug}`}
                  className="flex items-center gap-2 text-sm bg-white border border-gray-100 rounded-xl px-3 py-2.5 text-gray-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium"
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
                <div key={faq.question} className="bg-white border border-gray-100 rounded-xl p-5">
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

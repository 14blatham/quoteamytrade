import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TRADE_CATEGORIES } from '@/lib/constants/trades';
import { UK_LOCATIONS } from '@/lib/constants/locations';
import { MOCK_SUPPLIERS } from '@/lib/mock-data/suppliers';
import { SupplierCard } from '@/components/results/SupplierCard';
import { formatGBP } from '@/lib/utils/formatting';
import { generateTradeLocationMeta, generateJsonLdFAQ } from '@/lib/utils/seo';

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
          <div className="max-w-4xl mx-auto px-4 py-3 text-sm text-gray-500 flex gap-2">
            <Link href="/" className="hover:text-blue-700">Home</Link>
            <span>/</span>
            <Link href={`/services/${trade.slug}`} className="hover:text-blue-700">{trade.name}</Link>
            <span>/</span>
            <span className="text-gray-900">{location.city}</span>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="text-4xl block mb-3">{trade.icon}</span>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              {trade.name} in {location.city}
            </h1>
            <p className="text-blue-100 text-lg mb-2">
              Free quotes from vetted local {trade.name.toLowerCase()} in {location.city} and {location.region}
            </p>
            <p className="text-blue-200 text-sm mb-8">
              Typical cost: <strong className="text-white">{formatGBP(trade.averageCostFrom)} – {formatGBP(trade.averageCostTo)}</strong>
            </p>
            <Link href={`/get-quotes?trade=${trade.slug}&postcode=${location.postcodeDistricts[0]}`}>
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-10">
                Get Free Quotes in {location.city}
              </Button>
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          {/* Suppliers */}
          {suppliers.length > 0 ? (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {suppliers.length} {trade.name} Available in {location.city}
              </h2>
              <div className="space-y-4">
                {suppliers.map(supplier => (
                  <SupplierCard key={supplier.id} supplier={supplier} />
                ))}
              </div>
            </section>
          ) : (
            <section className="mb-10 bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
              <p className="text-blue-800 font-medium mb-3">
                We&apos;re growing our network in {location.city}. Request quotes now and we&apos;ll match you with available {trade.name.toLowerCase()}.
              </p>
              <Link href={`/get-quotes?trade=${trade.slug}`}>
                <Button className="bg-blue-700 hover:bg-blue-800 text-white">Request Quotes</Button>
              </Link>
            </section>
          )}

          {/* Nearby locations */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{trade.name} in Nearby Areas</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {UK_LOCATIONS.filter(l => l.slug !== location.slug).slice(0, 8).map(loc => (
                <Link
                  key={loc.slug}
                  href={`/${trade.slug}/${loc.slug}`}
                  className="text-sm bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-blue-700 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                >
                  {trade.singularName} in {loc.city}
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">FAQs: {trade.name} in {location.city}</h2>
            <div className="space-y-4">
              {faqs.map(faq => (
                <div key={faq.question} className="bg-white border border-gray-100 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
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

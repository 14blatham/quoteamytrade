import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TRADE_CATEGORIES } from '@/lib/constants/trades';
import { UK_LOCATIONS } from '@/lib/constants/locations';
import { MOCK_SUPPLIERS } from '@/lib/mock-data/suppliers';
import { SupplierCard } from '@/components/results/SupplierCard';
import { formatGBP } from '@/lib/utils/formatting';
import { generateTradeMeta, generateJsonLdFAQ } from '@/lib/utils/seo';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return TRADE_CATEGORIES.map(t => ({ category: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const trade = TRADE_CATEGORIES.find(t => t.slug === category);
  if (!trade) return {};
  return generateTradeMeta(trade);
}

export default async function ServiceCategoryPage({ params }: Props) {
  const { category } = await params;
  const trade = TRADE_CATEGORIES.find(t => t.slug === category);
  if (!trade) notFound();

  const suppliers = MOCK_SUPPLIERS.filter(
    s => s.trades.includes(category as any) && s.status === 'active' && s.leadsEnabled
  );

  const faqs = [
    {
      question: `How much does a ${trade.singularName.toLowerCase()} cost in the UK?`,
      answer: `The cost of hiring a ${trade.singularName.toLowerCase()} in the UK typically ranges from ${formatGBP(trade.averageCostFrom)} to ${formatGBP(trade.averageCostTo)} depending on the scope of work, location, and the specific service required. Get free quotes from local ${trade.name.toLowerCase()} through QuoteMyTrade.`,
    },
    {
      question: `How do I find a reliable ${trade.singularName.toLowerCase()} near me?`,
      answer: `The best way to find a reliable ${trade.singularName.toLowerCase()} is to use a trusted platform like QuoteMyTrade. Simply enter your postcode and describe your job to receive contact details and price estimates from vetted local ${trade.name.toLowerCase()} in your area.`,
    },
    {
      question: `Are the ${trade.name.toLowerCase()} on QuoteMyTrade vetted?`,
      answer: `Yes. All tradespeople on QuoteMyTrade are required to verify their qualifications and insurance. We also use a customer review system — any tradesperson who consistently receives poor feedback is removed from the platform.`,
    },
    {
      question: `Is it free to get quotes from ${trade.name.toLowerCase()}?`,
      answer: `Absolutely. QuoteMyTrade is completely free for customers. There are no hidden charges, no call-out fees, and we don't take commission from the job. You receive direct contact details for tradespeople at no cost.`,
    },
  ];

  const jsonLd = generateJsonLdFAQ(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <div className="min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-14">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="text-5xl block mb-4">{trade.icon}</span>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Find Local {trade.name}</h1>
            <p className="text-blue-100 text-lg max-w-xl mx-auto mb-4">{trade.description}</p>
            <p className="text-blue-200 text-sm mb-8">
              Typical cost: <strong className="text-white">{formatGBP(trade.averageCostFrom)} – {formatGBP(trade.averageCostTo)}</strong>
            </p>
            <Link href={`/get-quotes?trade=${trade.slug}`}>
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-10">
                Get Free Quotes
              </Button>
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          {/* Common services */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common {trade.name} Services</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {trade.commonServices.map(service => (
                <div key={service} className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-sm text-blue-800 font-medium">
                  ✓ {service}
                </div>
              ))}
            </div>
          </section>

          {/* Suppliers */}
          {suppliers.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Featured {trade.name} on QuoteMyTrade
              </h2>
              <div className="space-y-4">
                {suppliers.slice(0, 3).map(supplier => (
                  <SupplierCard key={supplier.id} supplier={supplier} />
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link href={`/get-quotes?trade=${trade.slug}`}>
                  <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                    Find {trade.name} Near Me
                  </Button>
                </Link>
              </div>
            </section>
          )}

          {/* Popular locations */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{trade.name} by Location</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {UK_LOCATIONS.slice(0, 12).map(loc => (
                <Link
                  key={loc.slug}
                  href={`/${trade.slug}/${loc.slug}`}
                  className="text-sm bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-blue-700 hover:bg-blue-50 hover:border-blue-200 transition-colors font-medium"
                >
                  {trade.name} in {loc.city}
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
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

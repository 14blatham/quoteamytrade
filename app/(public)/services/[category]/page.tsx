import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TRADE_CATEGORIES } from '@/lib/constants/trades';
import { UK_LOCATIONS } from '@/lib/constants/locations';
import { MOCK_SUPPLIERS } from '@/lib/mock-data/suppliers';
import { SupplierCard } from '@/components/results/SupplierCard';
import { TradeIcon } from '@/components/shared/TradeIcon';
import { formatGBP } from '@/lib/utils/formatting';
import { generateTradeMeta, generateJsonLdFAQ } from '@/lib/utils/seo';
import { CheckCircle, MapPin } from 'lucide-react';

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
      answer: `The cost of hiring a ${trade.singularName.toLowerCase()} in the UK typically ranges from ${formatGBP(trade.averageCostFrom)} to ${formatGBP(trade.averageCostTo)} depending on the scope of work, location, and the specific service required.`,
    },
    {
      question: `How do I find a reliable ${trade.singularName.toLowerCase()} near me?`,
      answer: `The best way to find a reliable ${trade.singularName.toLowerCase()} is to use a trusted platform like QuoteMyTrade. Simply enter your postcode and describe your job to receive contact details from vetted local ${trade.name.toLowerCase()}.`,
    },
    {
      question: `Are the ${trade.name.toLowerCase()} on QuoteMyTrade vetted?`,
      answer: `Yes. All tradespeople on QuoteMyTrade are required to verify their qualifications and insurance. We also use a customer review system — any tradesperson who consistently receives poor feedback is removed from the platform.`,
    },
    {
      question: `Is it free to get quotes from ${trade.name.toLowerCase()}?`,
      answer: `Absolutely. QuoteMyTrade is completely free for customers. There are no hidden charges, no call-out fees, and we don't take commission from the job.`,
    },
  ];

  const jsonLd = generateJsonLdFAQ(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <div className="min-h-screen">
        {/* Hero */}
        <div className="bg-gray-950 text-white py-14">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <TradeIcon slug={trade.slug} className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">Find Local {trade.name}</h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-3 leading-relaxed">{trade.description}</p>
            <p className="text-gray-500 text-sm mb-8">
              Typical cost:{' '}
              <strong className="text-white">{formatGBP(trade.averageCostFrom)} – {formatGBP(trade.averageCostTo)}</strong>
            </p>
            <Link href={`/get-quotes?trade=${trade.slug}`}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10">
                Get Free Quotes
              </Button>
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10">
          {/* Common services */}
          <section className="mb-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">What&apos;s Included</p>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common {trade.name} Services</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {trade.commonServices.map(service => (
                <div key={service} className="flex items-center gap-2.5 bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 font-medium">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  {service}
                </div>
              ))}
            </div>
          </section>

          {/* Suppliers */}
          {suppliers.length > 0 && (
            <section className="mb-10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">On the Platform</p>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Featured {trade.name}
              </h2>
              <div className="space-y-4 mb-5">
                {suppliers.slice(0, 3).map(supplier => (
                  <SupplierCard key={supplier.id} supplier={supplier} />
                ))}
              </div>
              <div className="text-center">
                <Link href={`/get-quotes?trade=${trade.slug}`}>
                  <Button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold">
                    Find {trade.name} Near Me
                  </Button>
                </Link>
              </div>
            </section>
          )}

          {/* Popular locations */}
          <section className="mb-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">By Location</p>
            <h2 className="text-xl font-bold text-gray-900 mb-4">{trade.name} by Location</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {UK_LOCATIONS.slice(0, 12).map(loc => (
                <Link
                  key={loc.slug}
                  href={`/${trade.slug}/${loc.slug}`}
                  className="flex items-center gap-2 text-sm bg-white border border-gray-100 rounded-xl px-3 py-2.5 text-gray-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium"
                >
                  <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  {loc.city}
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">FAQs</p>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
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

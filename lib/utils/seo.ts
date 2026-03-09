import type { Metadata } from 'next';
import type { TradeCategory, UKLocation } from '@/types';

const SITE_NAME = 'QuoteMyTrade';
const SITE_URL = 'https://quotemytrade.co.uk';

export function generateTradeLocationMeta(trade: TradeCategory, location: UKLocation): Metadata {
  const title = `${trade.name} in ${location.city} | Free Quotes | ${SITE_NAME}`;
  const description = `Get free quotes from trusted ${trade.name.toLowerCase()} in ${location.city}. Compare prices, read reviews, and connect with verified local tradespeople. No joining fees, no commission.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${trade.slug}/${location.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_GB',
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function generateTradeMeta(trade: TradeCategory): Metadata {
  const title = `${trade.name} | Compare Local ${trade.name} | ${SITE_NAME}`;
  const description = `Find trusted local ${trade.name.toLowerCase()} near you. Get free quotes, compare prices and read genuine reviews. ${trade.singularName} services from £${Math.round(trade.averageCostFrom / 100)}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/services/${trade.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_GB',
      siteName: SITE_NAME,
    },
  };
}

export function generateSupplierMeta(companyName: string, slug: string, bio: string): Metadata {
  const title = `${companyName} | ${SITE_NAME}`;
  return {
    title,
    description: bio.slice(0, 160),
    alternates: {
      canonical: `${SITE_URL}/suppliers/${slug}`,
    },
    openGraph: {
      title,
      description: bio.slice(0, 160),
      type: 'website',
      locale: 'en_GB',
      siteName: SITE_NAME,
    },
  };
}

export function generateJsonLdBreadcrumbs(items: { name: string; url: string }[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

export function generateJsonLdLocalBusiness(supplier: {
  companyName: string;
  bio: string;
  averageRating: number;
  reviewCount: number;
  coveragePostcodes: string[];
}): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: supplier.companyName,
    description: supplier.bio,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: supplier.averageRating.toFixed(1),
      reviewCount: supplier.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
    areaServed: supplier.coveragePostcodes,
    currenciesAccepted: 'GBP',
    priceRange: '££',
  });
}

export function generateJsonLdFAQ(faqs: { question: string; answer: string }[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  });
}

import type { MetadataRoute } from 'next';
import { TRADE_CATEGORIES } from '@/lib/constants/trades';
import { UK_LOCATIONS } from '@/lib/constants/locations';
import { MOCK_SUPPLIERS } from '@/lib/mock-data/suppliers';

const BASE_URL = 'https://quotemytrade.co.uk';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/how-it-works`, lastModified: new Date(), priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/for-businesses`, lastModified: new Date(), priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/pricing`, lastModified: new Date(), priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/services`, lastModified: new Date(), priority: 0.8, changeFrequency: 'weekly' },
  ];

  const tradePages: MetadataRoute.Sitemap = TRADE_CATEGORIES.map(t => ({
    url: `${BASE_URL}/services/${t.slug}`,
    lastModified: new Date(),
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  }));

  const locationPages: MetadataRoute.Sitemap = TRADE_CATEGORIES.flatMap(t =>
    UK_LOCATIONS.map(loc => ({
      url: `${BASE_URL}/${t.slug}/${loc.slug}`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    }))
  );

  const supplierPages: MetadataRoute.Sitemap = MOCK_SUPPLIERS.map(s => ({
    url: `${BASE_URL}/suppliers/${s.slug}`,
    lastModified: new Date(),
    priority: 0.6,
    changeFrequency: 'weekly' as const,
  }));

  return [...staticPages, ...tradePages, ...locationPages, ...supplierPages];
}

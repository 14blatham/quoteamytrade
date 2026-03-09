import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'QuoteMyTrade | Free Quotes from Local Tradespeople',
    template: '%s | QuoteMyTrade',
  },
  description: 'Get free quotes from vetted local tradespeople across the UK. Compare prices, read genuine reviews and contact professionals directly. No fees, no commission.',
  keywords: ['tradespeople', 'quotes', 'plumbers', 'electricians', 'builders', 'UK', 'local', 'compare prices'],
  authors: [{ name: 'QuoteMyTrade' }],
  creator: 'QuoteMyTrade',
  publisher: 'QuoteMyTrade Ltd',
  metadataBase: new URL('https://quotemytrade.co.uk'),
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'QuoteMyTrade',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@quotemytrade',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={inter.className}>
      <body className="bg-white text-gray-900 antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

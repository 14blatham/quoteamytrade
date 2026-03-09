import Link from 'next/link';
import { TRADE_CATEGORIES } from '@/lib/constants/trades';
import { UK_LOCATIONS } from '@/lib/constants/locations';

export function SiteFooter() {
  const featuredLocations = UK_LOCATIONS.slice(0, 8);

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-3">
              <span className="text-2xl">🔨</span>
              <span>QuoteMyTrade</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              The UK&apos;s trusted platform for connecting homeowners with vetted local tradespeople. Free quotes, no commission.
            </p>
            <div className="mt-4 flex gap-3">
              <span className="inline-flex items-center gap-1 text-xs bg-green-900/50 text-green-400 px-2 py-1 rounded-full">
                ✓ Free for customers
              </span>
              <span className="inline-flex items-center gap-1 text-xs bg-blue-900/50 text-blue-400 px-2 py-1 rounded-full">
                ✓ Vetted tradespeople
              </span>
            </div>
          </div>

          {/* Trades */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Find a Tradesperson</h3>
            <ul className="space-y-1.5">
              {TRADE_CATEGORIES.map(trade => (
                <li key={trade.slug}>
                  <Link href={`/services/${trade.slug}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {trade.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Popular Locations</h3>
            <ul className="space-y-1.5">
              {featuredLocations.map(loc => (
                <li key={loc.slug}>
                  <Link href={`/plumbers/${loc.slug}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                    Plumbers in {loc.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Company</h3>
            <ul className="space-y-1.5">
              <li><Link href="/how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How it Works</Link></li>
              <li><Link href="/for-businesses" className="text-sm text-gray-400 hover:text-white transition-colors">For Tradespeople</Link></li>
              <li><Link href="/pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/join" className="text-sm text-gray-400 hover:text-white transition-colors">Join as a Tradesperson</Link></li>
              <li><Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">Supplier Login</Link></li>
            </ul>
            <h3 className="text-white font-semibold text-sm mb-3 mt-6">Legal</h3>
            <ul className="space-y-1.5">
              <li><Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} QuoteMyTrade Ltd. Registered in England & Wales.
          </p>
          <p className="text-xs text-gray-500">
            QuoteMyTrade is an introduction service. We do not take commission on completed jobs.
          </p>
        </div>
      </div>
    </footer>
  );
}

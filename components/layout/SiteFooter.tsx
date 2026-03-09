import Link from 'next/link';
import { TRADE_CATEGORIES } from '@/lib/constants/trades';
import { UK_LOCATIONS } from '@/lib/constants/locations';

export function SiteFooter() {
  const featuredLocations = UK_LOCATIONS.slice(0, 8);
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-5">
              <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <span className="font-black text-white text-[17px] tracking-tight">QuoteMyTrade</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">The Midlands&apos; trusted platform for connecting homeowners with vetted local tradespeople. Free quotes. No commission.</p>
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center gap-2 text-xs text-gray-500"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />Free for customers</span>
              <span className="inline-flex items-center gap-2 text-xs text-gray-500"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" />Vetted tradespeople</span>
              <span className="inline-flex items-center gap-2 text-xs text-gray-500"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" />No commission charged</span>
            </div>
          </div>
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Trades</h3>
            <ul className="space-y-2.5">
              {TRADE_CATEGORIES.map(trade => (
                <li key={trade.slug}><Link href={`/services/${trade.slug}`} className="text-sm text-gray-500 hover:text-white transition-colors">{trade.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Locations</h3>
            <ul className="space-y-2.5">
              {featuredLocations.map(loc => (
                <li key={loc.slug}><Link href={`/plumbers/${loc.slug}`} className="text-sm text-gray-500 hover:text-white transition-colors">Plumbers in {loc.city}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Company</h3>
            <ul className="space-y-2.5 mb-7">
              <li><Link href="/how-it-works" className="text-sm text-gray-500 hover:text-white transition-colors">How it Works</Link></li>
              <li><Link href="/for-businesses" className="text-sm text-gray-500 hover:text-white transition-colors">For Tradespeople</Link></li>
              <li><Link href="/pricing" className="text-sm text-gray-500 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/join" className="text-sm text-gray-500 hover:text-white transition-colors">Join as a Tradesperson</Link></li>
              <li><Link href="/login" className="text-sm text-gray-500 hover:text-white transition-colors">Supplier Login</Link></li>
            </ul>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Legal</h3>
            <ul className="space-y-2.5">
              <li><Link href="/privacy" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-500 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-sm text-gray-500 hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} QuoteMyTrade Ltd. Registered in England &amp; Wales.</p>
          <p className="text-xs text-gray-600">An introduction service. We do not take commission on completed jobs.</p>
        </div>
      </div>
    </footer>
  );
}

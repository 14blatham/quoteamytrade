'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Bell, Wrench, MapPin, CreditCard, Settings, Globe, LogOut } from 'lucide-react';
import { useMockAuth } from '@/lib/auth/MockAuthContext';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/leads', label: 'Leads', icon: Bell },
  { href: '/dashboard/services', label: 'Services & Prices', icon: Wrench },
  { href: '/dashboard/coverage', label: 'Coverage Areas', icon: MapPin },
  { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { supplier, logout } = useMockAuth();
  return (
    <aside className="w-60 bg-gray-950 min-h-screen flex flex-col flex-shrink-0">
      <div className="px-5 py-5 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
            </svg>
          </div>
          <div>
            <p className="font-black text-white text-[14px] tracking-tight leading-none">QuoteMyTrade</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Supplier Portal</p>
          </div>
        </Link>
      </div>
      {supplier && (
        <div className="px-5 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/15 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm flex-shrink-0">
              {supplier.companyName.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate leading-tight">{supplier.companyName}</p>
              <p className="text-xs text-gray-500 truncate">{supplier.ownerName}</p>
            </div>
          </div>
        </div>
      )}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map(item => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-600/15 text-blue-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <Icon className="w-4 h-4 flex-shrink-0" />{item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-white/5 space-y-0.5">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
          <Globe className="w-4 h-4 flex-shrink-0" />Public Site
        </Link>
        <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-colors">
          <LogOut className="w-4 h-4 flex-shrink-0" />Sign Out
        </button>
      </div>
    </aside>
  );
}

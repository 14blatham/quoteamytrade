'use client';

import { useMockAuth } from '@/lib/auth/MockAuthContext';
import { MOCK_LEADS, MOCK_DASHBOARD_STATS } from '@/lib/mock-data/leads';
import { formatGBP, formatRelativeDate } from '@/lib/utils/formatting';
import { Bell, TrendingUp, CreditCard, Target, ArrowRight, Circle } from 'lucide-react';
import Link from 'next/link';

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  viewed: 'bg-yellow-100 text-yellow-700',
  contacted: 'bg-purple-100 text-purple-700',
  won: 'bg-green-100 text-green-700',
  lost: 'bg-gray-100 text-gray-600',
  refunded: 'bg-orange-100 text-orange-700',
};

export default function DashboardPage() {
  const { supplier } = useMockAuth();
  const recentLeads = MOCK_LEADS.filter(l => l.supplierId === 'sup-001').slice(0, 5);
  const stats = MOCK_DASHBOARD_STATS;

  const statCards = [
    { label: 'Leads Today', value: String(stats.leadsToday), icon: Bell, color: 'text-blue-700', bg: 'bg-blue-50' },
    { label: 'Leads This Month', value: String(stats.leadsThisMonth), icon: TrendingUp, color: 'text-purple-700', bg: 'bg-purple-50' },
    {
      label: 'Account Balance',
      value: formatGBP(stats.accountBalancePence),
      icon: CreditCard,
      color: stats.accountBalancePence < 1000 ? 'text-red-600' : 'text-green-700',
      bg: stats.accountBalancePence < 1000 ? 'bg-red-50' : 'bg-green-50',
    },
    { label: 'Conversion Rate', value: `${Math.round(stats.conversionRate * 100)}%`, icon: Target, color: 'text-amber-700', bg: 'bg-amber-50' },
  ];

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto">
      {/* Greeting */}
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Dashboard</p>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {supplier?.ownerName?.split(' ')[0]}
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">Here&apos;s your overview for today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        {statCards.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider leading-none">{stat.label}</p>
                <div className={`w-7 h-7 ${stat.bg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
                </div>
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Status row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-7">
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Lead Generation</p>
          <div className="flex items-center gap-2">
            <Circle className={`w-2.5 h-2.5 fill-current ${supplier?.leadsEnabled ? 'text-green-500' : 'text-gray-300'}`} />
            <span className="text-sm font-medium text-gray-700">
              {supplier?.leadsEnabled ? 'Active — receiving leads' : 'Paused'}
            </span>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Services</p>
          <p className="text-sm font-medium text-gray-700">
            {stats.activeServicesCount} active service{stats.activeServicesCount !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Coverage</p>
          <p className="text-sm font-medium text-gray-700">
            {supplier?.coveragePostcodes.length ?? 0} postcode district{(supplier?.coveragePostcodes.length ?? 0) !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Recent leads */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <p className="font-semibold text-gray-900">Recent Leads</p>
          <Link href="/dashboard/leads" className="flex items-center gap-1 text-sm text-blue-700 hover:underline font-medium">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {recentLeads.map(lead => (
            <div key={lead.id} className="px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{lead.service.serviceName}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {lead.customer.firstName} {lead.customer.lastInitial}. · {lead.customer.postcode}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${STATUS_STYLES[lead.status]}`}>
                  {lead.status}
                </span>
                <span className="text-xs text-gray-400">{formatRelativeDate(lead.createdAt)}</span>
                <span className="text-xs font-bold text-gray-700">{formatGBP(lead.cost)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

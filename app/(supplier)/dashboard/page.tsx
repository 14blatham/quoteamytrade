'use client';

import { useMockAuth } from '@/lib/auth/MockAuthContext';
import { MOCK_LEADS, MOCK_DASHBOARD_STATS } from '@/lib/mock-data/leads';
import { formatGBP, formatRelativeDate } from '@/lib/utils/formatting';
import { Badge } from '@/components/ui/badge';

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

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {supplier?.ownerName?.split(' ')[0]}
        </h1>
        <p className="text-gray-500 text-sm mt-1">Here&apos;s your overview for today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Leads Today', value: stats.leadsToday, icon: '🔔', color: 'text-blue-700' },
          { label: 'Leads This Month', value: stats.leadsThisMonth, icon: '📊', color: 'text-purple-700' },
          {
            label: 'Account Balance',
            value: formatGBP(stats.accountBalancePence),
            icon: '💳',
            color: stats.accountBalancePence < 1000 ? 'text-red-600' : 'text-green-700',
          },
          {
            label: 'Conversion Rate',
            value: `${Math.round(stats.conversionRate * 100)}%`,
            icon: '🎯',
            color: 'text-amber-700',
          },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
              <span className="text-xl">{stat.icon}</span>
            </div>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm font-semibold text-gray-900 mb-1">Lead Generation</p>
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${supplier?.leadsEnabled ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span className="text-sm text-gray-600">{supplier?.leadsEnabled ? 'Active — receiving leads' : 'Paused'}</span>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm font-semibold text-gray-900 mb-1">Services</p>
          <p className="text-sm text-gray-600">{stats.activeServicesCount} active service{stats.activeServicesCount !== 1 ? 's' : ''}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm font-semibold text-gray-900 mb-1">Coverage</p>
          <p className="text-sm text-gray-600">{supplier?.coveragePostcodes.length ?? 0} postcode district{(supplier?.coveragePostcodes.length ?? 0) !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Recent leads */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Recent Leads</h2>
          <a href="/dashboard/leads" className="text-sm text-blue-700 hover:underline">View all</a>
        </div>
        <div className="divide-y divide-gray-50">
          {recentLeads.map(lead => (
            <div key={lead.id} className="px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{lead.service.serviceName}</p>
                <p className="text-xs text-gray-400">{lead.customer.firstName} {lead.customer.lastInitial}. · {lead.customer.postcode}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[lead.status]}`}>
                  {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                </span>
                <span className="text-xs text-gray-400">{formatRelativeDate(lead.createdAt)}</span>
                <span className="text-xs font-semibold text-gray-700">{formatGBP(lead.cost)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

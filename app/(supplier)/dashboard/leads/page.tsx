'use client';

import { MOCK_LEADS } from '@/lib/mock-data/leads';
import { formatGBP, formatShortDate } from '@/lib/utils/formatting';

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  viewed: 'bg-yellow-100 text-yellow-700',
  contacted: 'bg-purple-100 text-purple-700',
  won: 'bg-green-100 text-green-700',
  lost: 'bg-gray-100 text-gray-600',
  refunded: 'bg-orange-100 text-orange-700',
};

export default function LeadsPage() {
  const leads = MOCK_LEADS.filter(l => l.supplierId === 'sup-001');

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
        <p className="text-gray-500 text-sm mt-1">All leads received, with customer contact details.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Customer</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Service</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Postcode</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Status</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700 hidden md:table-cell">Date</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-700">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {leads.map(lead => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900">{lead.customer.firstName} {lead.customer.lastInitial}.</p>
                    {lead.customer.phone && (
                      <p className="text-xs text-gray-400">{lead.customer.phone}</p>
                    )}
                    {!lead.customer.phone && (
                      <p className="text-xs text-gray-300 italic">Contact not yet revealed</p>
                    )}
                  </td>
                  <td className="px-5 py-4 text-gray-600">{lead.service.serviceName}</td>
                  <td className="px-5 py-4 text-gray-600">{lead.customer.postcode}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[lead.status]}`}>
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-400 hidden md:table-cell">{formatShortDate(lead.createdAt)}</td>
                  <td className="px-5 py-4 text-right font-semibold text-gray-900">{formatGBP(lead.cost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useMockAuth } from '@/lib/auth/MockAuthContext';
import { MOCK_TRANSACTIONS } from '@/lib/mock-data/leads';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatGBP, formatShortDate } from '@/lib/utils/formatting';
import { useState } from 'react';

export default function BillingPage() {
  const { supplier } = useMockAuth();
  const [topUpAmount, setTopUpAmount] = useState('10');
  const [topUpDone, setTopUpDone] = useState(false);

  const transactions = MOCK_TRANSACTIONS.filter(t => t.supplierId === 'sup-001');

  function handleTopUp(e: React.FormEvent) {
    e.preventDefault();
    setTopUpDone(true);
    setTimeout(() => setTopUpDone(false), 3000);
  }

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account balance and view transaction history.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Balance */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <p className="text-sm font-medium text-gray-500 mb-1">Current Balance</p>
          <p className={`text-3xl font-bold ${(supplier?.accountBalance ?? 0) < 1000 ? 'text-red-600' : 'text-gray-900'}`}>
            {formatGBP(supplier?.accountBalance ?? 0)}
          </p>
          {(supplier?.accountBalance ?? 0) < 1000 && (
            <p className="text-xs text-red-500 mt-1">⚠️ Low balance — top up to keep receiving leads</p>
          )}
        </div>

        {/* Top-up */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 lg:col-span-2">
          <p className="text-sm font-semibold text-gray-900 mb-3">Top Up Balance</p>
          <form onSubmit={handleTopUp} className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">£</span>
              <Input
                type="number"
                min="5"
                step="5"
                value={topUpAmount}
                onChange={e => setTopUpAmount(e.target.value)}
                className="pl-7"
              />
            </div>
            <Button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white">
              {topUpDone ? '✓ Topped up!' : 'Top Up'}
            </Button>
          </form>
          <div className="flex gap-2 mt-3">
            {[5, 10, 20, 50].map(amount => (
              <button
                key={amount}
                type="button"
                onClick={() => setTopUpAmount(String(amount))}
                className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                £{amount}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">Payments processed securely via Stripe. No card details stored on our servers.</p>
        </div>
      </div>

      {/* Transaction history */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50">
          <h2 className="font-semibold text-gray-900">Transaction History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Date</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Description</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-700">Amount</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-700 hidden sm:table-cell">Balance After</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map(txn => (
                <tr key={txn.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-400">{formatShortDate(txn.createdAt)}</td>
                  <td className="px-5 py-3 text-gray-700">{txn.description}</td>
                  <td className={`px-5 py-3 text-right font-semibold ${txn.amountPence > 0 ? 'text-green-700' : 'text-red-600'}`}>
                    {txn.amountPence > 0 ? '+' : ''}{formatGBP(txn.amountPence)}
                  </td>
                  <td className="px-5 py-3 text-right text-gray-500 hidden sm:table-cell">
                    {formatGBP(txn.balanceAfterPence)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

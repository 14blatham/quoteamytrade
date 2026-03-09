'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/shared/StarRating';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { ContactRevealDialog } from './ContactRevealDialog';
import { formatGBP } from '@/lib/utils/formatting';
import { TRADE_CATEGORIES } from '@/lib/constants/trades';
import type { SupplierProfile } from '@/types';

interface SupplierCardProps {
  supplier: SupplierProfile;
  serviceId?: string;
}

export function SupplierCard({ supplier, serviceId }: SupplierCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const pricing = serviceId ? supplier.pricing[serviceId] : null;
  const trades = supplier.trades
    .map(slug => TRADE_CATEGORIES.find(t => t.slug === slug)?.name)
    .filter(Boolean)
    .join(', ');

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-4">
          {/* Avatar + name */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg flex-shrink-0">
              {supplier.companyName.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  href={`/suppliers/${supplier.slug}`}
                  className="font-bold text-gray-900 hover:text-blue-700 transition-colors truncate"
                >
                  {supplier.companyName}
                </Link>
                <VerifiedBadge status={supplier.verification} />
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{trades}</p>
            </div>
          </div>

          {/* Price */}
          {pricing && (
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-gray-400">Estimate</p>
              <p className="font-bold text-gray-900 text-sm">
                {formatGBP(pricing.priceFrom)} – {formatGBP(pricing.priceTo)}
              </p>
            </div>
          )}
        </div>

        {/* Bio */}
        <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-2">{supplier.bio}</p>

        {/* Stats */}
        <div className="mt-3 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <StarRating rating={supplier.stats.averageRating} />
            <span className="font-semibold text-gray-900">{supplier.stats.averageRating}</span>
            <span className="text-gray-400">({supplier.stats.reviewCount})</span>
          </div>
          <div className="text-gray-400 text-xs flex items-center gap-1">
            ✅ <span className="text-gray-700">{supplier.stats.jobsCompleted} jobs completed</span>
          </div>
          <div className="text-gray-400 text-xs flex items-center gap-1">
            ⚡ <span className="text-gray-700">Responds in ~{supplier.stats.responseTimeHours}h</span>
          </div>
        </div>

        {/* Coverage */}
        <div className="mt-3 flex flex-wrap gap-1">
          {supplier.coveragePostcodes.slice(0, 6).map(pc => (
            <span key={pc} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{pc}</span>
          ))}
          {supplier.coveragePostcodes.length > 6 && (
            <span className="text-xs text-gray-400">+{supplier.coveragePostcodes.length - 6} more</span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <Button
            className="flex-1 bg-blue-700 hover:bg-blue-800 text-white"
            onClick={() => setDialogOpen(true)}
          >
            Reveal Contact Details
          </Button>
          <Link href={`/suppliers/${supplier.slug}`}>
            <Button variant="outline" size="default">View Profile</Button>
          </Link>
        </div>
      </div>

      <ContactRevealDialog
        supplier={supplier}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/shared/StarRating';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { TradeIcon } from '@/components/shared/TradeIcon';
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
  const primaryTrade = TRADE_CATEGORIES.find(t => t.slug === supplier.trades[0]);

  return (
    <>
      <div className="group bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-900/5 transition-all duration-200 overflow-hidden">
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
              {primaryTrade ? (
                <TradeIcon slug={primaryTrade.slug} className="w-5 h-5 text-blue-600" />
              ) : (
                <span className="font-black text-blue-600 text-lg">{supplier.companyName.charAt(0)}</span>
              )}
            </div>

            {/* Header info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <Link href={`/suppliers/${supplier.slug}`} className="font-bold text-gray-900 hover:text-blue-600 transition-colors text-[15px]">
                  {supplier.companyName}
                </Link>
                <VerifiedBadge status={supplier.verification} />
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <StarRating rating={supplier.stats.averageRating} />
                  <span className="text-sm font-semibold text-gray-900">{supplier.stats.averageRating}</span>
                  <span className="text-xs text-gray-400">({supplier.stats.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Price */}
            {pricing && (
              <div className="text-right flex-shrink-0 hidden sm:block">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Estimate</p>
                <p className="font-black text-gray-900 text-sm">{formatGBP(pricing.priceFrom)} – {formatGBP(pricing.priceTo)}</p>
              </div>
            )}
          </div>

          {/* Bio */}
          <p className="mt-4 text-sm text-gray-500 leading-relaxed line-clamp-2">{supplier.bio}</p>

          {/* Stats row */}
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-green-500" />
              {supplier.stats.jobsCompleted} jobs completed
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              Responds in ~{supplier.stats.responseTimeHours}h
            </span>
          </div>

          {/* Coverage */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {supplier.coveragePostcodes.slice(0, 7).map(pc => (
              <span key={pc} className="text-[11px] font-medium bg-gray-50 border border-gray-100 text-gray-500 px-2 py-0.5 rounded-md">{pc}</span>
            ))}
            {supplier.coveragePostcodes.length > 7 && (
              <span className="text-[11px] text-gray-400">+{supplier.coveragePostcodes.length - 7} more</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 sm:px-6 py-4 bg-gray-50/50 border-t border-gray-50 flex items-center gap-3">
          <Button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm h-9"
            onClick={() => setDialogOpen(true)}
          >
            Reveal Contact Details
          </Button>
          <Link href={`/suppliers/${supplier.slug}`}>
            <Button variant="outline" size="sm" className="h-9 px-3 text-gray-600 hover:text-gray-900">
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      <ContactRevealDialog supplier={supplier} open={dialogOpen} onOpenChange={() => setDialogOpen(false)} />
    </>
  );
}

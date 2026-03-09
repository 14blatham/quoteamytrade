import { ShieldCheck, Star } from 'lucide-react';
import type { VerificationStatus } from '@/types';

interface VerifiedBadgeProps { status: VerificationStatus; }

export function VerifiedBadge({ status }: VerifiedBadgeProps) {
  if (status === 'unverified') return null;
  if (status === 'featured') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wide">
        <Star className="w-2.5 h-2.5" />Featured
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full uppercase tracking-wide">
      <ShieldCheck className="w-2.5 h-2.5" />Verified
    </span>
  );
}

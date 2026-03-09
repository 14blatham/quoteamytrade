import type { VerificationStatus } from '@/types';

interface VerifiedBadgeProps {
  status: VerificationStatus;
}

export function VerifiedBadge({ status }: VerifiedBadgeProps) {
  if (status === 'unverified') return null;

  if (status === 'featured') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
        ⭐ Featured
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
      ✓ Verified
    </span>
  );
}

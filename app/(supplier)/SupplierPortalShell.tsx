'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useMockAuth } from '@/lib/auth/MockAuthContext';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';

const PUBLIC_PATHS = ['/login', '/join'];

export function SupplierPortalShell({ children }: { children: React.ReactNode }) {
  const { supplier, isLoading } = useMockAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicPath = PUBLIC_PATHS.some(p => pathname.endsWith(p));

  useEffect(() => {
    if (!isLoading && !supplier && !isPublicPath) {
      router.replace('/login');
    }
  }, [supplier, isLoading, isPublicPath, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading…</div>
      </div>
    );
  }

  // Auth pages (login/join) — no sidebar
  if (isPublicPath) {
    return <>{children}</>;
  }

  // Protected pages — show sidebar
  if (!supplier) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

import { MockAuthProvider } from '@/lib/auth/MockAuthContext';
import { SupplierPortalShell } from './SupplierPortalShell';

export default function SupplierLayout({ children }: { children: React.ReactNode }) {
  return (
    <MockAuthProvider>
      <SupplierPortalShell>{children}</SupplierPortalShell>
    </MockAuthProvider>
  );
}

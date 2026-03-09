'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { MOCK_SUPPLIERS } from '@/lib/mock-data/suppliers';
import type { SupplierProfile } from '@/types';

const AUTH_KEY = 'qmt-supplier-id';

interface AuthContextValue {
  supplier: SupplierProfile | null;
  login: (supplierId: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [supplier, setSupplier] = useState<SupplierProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const id = localStorage.getItem(AUTH_KEY);
      if (id) {
        const found = MOCK_SUPPLIERS.find(s => s.id === id) ?? null;
        setSupplier(found);
      }
    } catch {
      // ignore
    }
    setIsLoading(false);
  }, []);

  function login(supplierId: string): boolean {
    const found = MOCK_SUPPLIERS.find(s => s.id === supplierId);
    if (!found) return false;
    setSupplier(found);
    try { localStorage.setItem(AUTH_KEY, supplierId); } catch { /* ignore */ }
    return true;
  }

  function logout() {
    setSupplier(null);
    try { localStorage.removeItem(AUTH_KEY); } catch { /* ignore */ }
  }

  return (
    <AuthContext.Provider value={{ supplier, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useMockAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useMockAuth must be used inside MockAuthProvider');
  return ctx;
}

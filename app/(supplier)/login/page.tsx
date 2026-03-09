'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMockAuth } from '@/lib/auth/MockAuthContext';
import { MOCK_SUPPLIERS } from '@/lib/mock-data/suppliers';
import { LogIn, ChevronRight } from 'lucide-react';

export default function LoginPage() {
  const { login } = useMockAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const supplier = MOCK_SUPPLIERS.find(s => s.contact.email === email);
    if (!supplier) {
      setError('No account found with that email address.');
      return;
    }
    login(supplier.id);
    router.push('/dashboard');
  }

  function handleDemoLogin(supplierId: string) {
    login(supplierId);
    router.push('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">Q</span>
            </div>
            <span className="font-bold text-gray-900 text-lg">QuoteMyTrade</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Supplier Sign In</h1>
          <p className="text-sm text-gray-500 mt-1">Access your dashboard and leads</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                required
                autoComplete="email"
                className="h-11 border-gray-200 focus:border-blue-400"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                  Password
                </Label>
                <Link href="#" className="text-xs text-blue-700 hover:underline">Forgot password?</Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="h-11 border-gray-200 focus:border-blue-400"
              />
            </div>
            {error && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
            )}
            <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold h-11 mt-1" size="lg">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </form>
        </div>

        {/* Demo logins */}
        <div className="mt-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center mb-3">Demo Accounts</p>
          <div className="space-y-2">
            {MOCK_SUPPLIERS.slice(0, 3).map(s => (
              <button
                key={s.id}
                onClick={() => handleDemoLogin(s.id)}
                className="w-full flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3 hover:border-blue-200 hover:bg-blue-50 transition-colors group"
              >
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-700">{s.companyName}</p>
                  <p className="text-xs text-gray-400">{s.contact.email}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500" />
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Not yet a member?{' '}
          <Link href="/join" className="text-blue-700 font-semibold hover:underline">Join free</Link>
        </p>
      </div>
    </div>
  );
}

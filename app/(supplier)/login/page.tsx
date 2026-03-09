'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMockAuth } from '@/lib/auth/MockAuthContext';
import { MOCK_SUPPLIERS } from '@/lib/mock-data/suppliers';

// Demo credentials for mock auth
const DEMO_CREDENTIALS = [
  { email: 'james@swiftplumbing.co.uk', supplierId: 'sup-001', label: 'Swift Plumbing & Heating' },
  { email: 'helen@midlandsurveys.co.uk', supplierId: 'sup-004', label: 'Midland Surveys Ltd' },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useMockAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    // Mock auth: match by email
    const found = MOCK_SUPPLIERS.find(s => s.contact.email === email);
    if (!found) {
      setError('No account found with that email address.');
      return;
    }

    const success = login(found.id);
    if (success) {
      router.push('/dashboard');
    } else {
      setError('Login failed. Please try again.');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-blue-700">🔨 QuoteMyTrade</Link>
          <p className="text-gray-500 mt-2 text-sm">Supplier Portal Login</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h1 className="text-xl font-bold text-gray-900 mb-6">Sign in to your account</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mt-1"
                autoComplete="email"
                placeholder="your@email.co.uk"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="mt-1"
                autoComplete="current-password"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white" size="lg">
              Sign In
            </Button>
          </form>

          {/* Demo logins */}
          <div className="mt-6 border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-400 mb-3 text-center">Demo accounts — click to pre-fill:</p>
            <div className="space-y-2">
              {DEMO_CREDENTIALS.map(cred => (
                <button
                  key={cred.supplierId}
                  type="button"
                  onClick={() => setEmail(cred.email)}
                  className="w-full text-left text-xs bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-gray-600 hover:bg-blue-50 hover:border-blue-100 hover:text-blue-700 transition-colors"
                >
                  <span className="font-medium">{cred.label}</span>
                  <span className="text-gray-400 ml-2">{cred.email}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link href="/join" className="text-blue-700 font-medium hover:underline">
              Register free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useMockAuth } from '@/lib/auth/MockAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  const { supplier } = useMockAuth();
  const [leadsEnabled, setLeadsEnabled] = useState(supplier?.leadsEnabled ?? true);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!supplier) return null;

  return (
    <div className="p-6 sm:p-8 max-w-2xl">
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Account</p>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-0.5">Manage your account profile and preferences.</p>
      </div>

      {/* Lead toggle */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Lead Generation</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Receive leads</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {leadsEnabled
                ? 'You are currently receiving leads. Turn off when fully booked or on holiday.'
                : 'Lead generation is paused. Turn on to start receiving new leads.'}
            </p>
          </div>
          <Switch
            checked={leadsEnabled}
            onCheckedChange={setLeadsEnabled}
            className="data-[state=checked]:bg-green-600"
          />
        </div>
        {!leadsEnabled && (
          <div className="mt-3 bg-amber-50 border border-amber-100 rounded-lg p-3 text-xs text-amber-800">
            Your leads are currently paused. Customers in your area will not see your listing until you turn this back on.
          </div>
        )}
      </div>

      {/* Profile */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Company Profile</p>
        <div className="space-y-4">
          <div>
            <Label htmlFor="companyName">Company name</Label>
            <Input id="companyName" defaultValue={supplier.companyName} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="ownerName">Your name</Label>
            <Input id="ownerName" defaultValue={supplier.ownerName} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="phone">Phone number</Label>
            <Input id="phone" defaultValue={supplier.contact.phone} className="mt-1" type="tel" />
          </div>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input id="email" defaultValue={supplier.contact.email} className="mt-1" type="email" />
          </div>
          {supplier.contact.website !== undefined && (
            <div>
              <Label htmlFor="website">Website (optional)</Label>
              <Input id="website" defaultValue={supplier.contact.website} className="mt-1" type="url" />
            </div>
          )}
        </div>
      </div>

      <Button onClick={handleSave} className="bg-blue-700 hover:bg-blue-800 text-white">
        {saved ? 'Saved' : 'Save Changes'}
      </Button>
    </div>
  );
}

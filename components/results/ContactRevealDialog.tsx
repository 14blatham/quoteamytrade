'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SupplierProfile } from '@/types';
import { StarRating } from '@/components/shared/StarRating';
import { Phone, Mail, Globe, MapPin, ShieldCheck, Lock, CheckCircle } from 'lucide-react';

interface Props {
  supplier: SupplierProfile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactRevealDialog({ supplier, open, onOpenChange }: Props) {
  const [revealed, setRevealed] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden rounded-2xl border border-gray-100">
        {/* Header */}
        <div className="bg-gray-950 px-6 py-5">
          <DialogHeader>
            <DialogTitle className="text-white text-lg font-bold">
              {supplier.companyName}
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-3 mt-2">
            <StarRating rating={supplier.stats.averageRating} size="sm" />
            <span className="text-gray-400 text-xs">{supplier.stats.reviewCount} reviews</span>
            {supplier.verification === 'verified' && (
              <span className="flex items-center gap-1 text-blue-400 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified
              </span>
            )}
          </div>
        </div>

        <div className="px-6 py-5">
          {!revealed ? (
            <>
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: 'Years active', value: supplier.stats.memberSince ? new Date().getFullYear() - new Date(supplier.stats.memberSince).getFullYear() : '—' },
                  { label: 'Jobs completed', value: supplier.stats.jobsCompleted },
                  { label: 'Response time', value: `~${supplier.stats.responseTimeHours}h` },
                ].map(stat => (
                  <div key={stat.label} className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-3 text-center">
                    <p className="text-sm font-bold text-gray-900">{stat.value}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-wide font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Assurance list */}
              <ul className="space-y-2 mb-5">
                {[
                  'Direct contact — no middlemen',
                  'No obligation to proceed',
                  'Free for you to contact',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5">
                <p className="text-xs text-blue-700 leading-relaxed">
                  <strong>Your details are shared with this tradesperson</strong> when you reveal their contact information. They may follow up about your enquiry.
                </p>
              </div>

              <Button
                onClick={() => setRevealed(true)}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold h-11"
                size="lg"
              >
                <Lock className="w-4 h-4 mr-2" />
                Reveal Contact Details
              </Button>
            </>
          ) : (
            <>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Contact Information</p>
              <div className="space-y-3 mb-5">
                {supplier.contact.phone && (
                  <a
                    href={`tel:${supplier.contact.phone}`}
                    className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 hover:border-blue-200 hover:bg-blue-50 transition-colors group"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">Phone</p>
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">{supplier.contact.phone}</p>
                    </div>
                  </a>
                )}
                {supplier.contact.email && (
                  <a
                    href={`mailto:${supplier.contact.email}`}
                    className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 hover:border-blue-200 hover:bg-blue-50 transition-colors group"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">Email</p>
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">{supplier.contact.email}</p>
                    </div>
                  </a>
                )}
                {supplier.contact.website && (
                  <a
                    href={supplier.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 hover:border-blue-200 hover:bg-blue-50 transition-colors group"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">Website</p>
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">{supplier.contact.website.replace(/^https?:\/\//, '')}</p>
                    </div>
                  </a>
                )}
                {supplier.contact.address && (
                  <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">Address</p>
                      <p className="text-sm font-semibold text-gray-900">{supplier.contact.address}</p>
                    </div>
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                className="w-full border-gray-200 text-gray-700"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

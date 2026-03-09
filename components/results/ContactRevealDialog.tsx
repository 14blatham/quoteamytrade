'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { SupplierProfile } from '@/types';

interface ContactRevealDialogProps {
  supplier: SupplierProfile;
  open: boolean;
  onClose: () => void;
}

export function ContactRevealDialog({ supplier, open, onClose }: ContactRevealDialogProps) {
  const [revealed, setRevealed] = useState(false);

  function handleReveal() {
    setRevealed(true);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{supplier.companyName}</DialogTitle>
          <DialogDescription>
            {revealed
              ? 'Contact details revealed. The tradesperson has been notified of your enquiry.'
              : 'Confirm you want to contact this tradesperson. Their details will be shown immediately.'}
          </DialogDescription>
        </DialogHeader>

        {!revealed ? (
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
              <p className="font-medium mb-1">About this tradesperson</p>
              <p className="text-blue-600">{supplier.bio.slice(0, 140)}…</p>
              <div className="mt-2 flex gap-3 text-xs">
                <span>⭐ {supplier.stats.averageRating} ({supplier.stats.reviewCount} reviews)</span>
                <span>✅ {supplier.stats.jobsCompleted} jobs</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              By revealing contact details, you agree to our terms of service. This is a free service for customers.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
              <Button className="flex-1 bg-blue-700 hover:bg-blue-800 text-white" onClick={handleReveal}>
                Show Contact Details
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-600">📞</span>
                <span className="font-semibold text-gray-900">{supplier.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-600">✉️</span>
                <span className="font-semibold text-gray-900">{supplier.contact.email}</span>
              </div>
              {supplier.contact.website && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">🌐</span>
                  <a
                    href={supplier.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-700 hover:underline"
                  >
                    {supplier.contact.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              {supplier.contact.address && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">📍</span>
                  <span className="text-gray-700">{supplier.contact.address}</span>
                </div>
              )}
            </div>
            <Button className="w-full" variant="outline" onClick={onClose}>Close</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

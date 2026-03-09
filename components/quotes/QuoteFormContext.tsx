'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { QuoteFormState } from '@/types';

const STORAGE_KEY = 'qmt-quote-form';

const defaultState: QuoteFormState = { step: 1 };

interface QuoteFormContextValue {
  formState: QuoteFormState;
  updateForm: (updates: Partial<QuoteFormState>) => void;
  clearForm: () => void;
}

const QuoteFormContext = createContext<QuoteFormContextValue | null>(null);

export function QuoteFormProvider({ children }: { children: ReactNode }) {
  const [formState, setFormState] = useState<QuoteFormState>(defaultState);

  // Rehydrate from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) setFormState(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  function updateForm(updates: Partial<QuoteFormState>) {
    setFormState(prev => {
      const next = { ...prev, ...updates };
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }

  function clearForm() {
    setFormState(defaultState);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  return (
    <QuoteFormContext.Provider value={{ formState, updateForm, clearForm }}>
      {children}
    </QuoteFormContext.Provider>
  );
}

export function useQuoteForm() {
  const ctx = useContext(QuoteFormContext);
  if (!ctx) throw new Error('useQuoteForm must be used inside QuoteFormProvider');
  return ctx;
}

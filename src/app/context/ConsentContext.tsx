import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

/**
 * ConsentContext - strict opt-in consent management for r352.com.
 *
 * EU jurisdiction (Mallorca, Spain) → GDPR + LOPDGDD apply.
 * Default state = "pending" → banner shows, GTM does NOT load.
 * Only "accepted" triggers GTM script injection (see GTM.tsx).
 * "denied" keeps GTM off and remembers the choice across sessions.
 *
 * Storage: localStorage["r352-consent-v1"]
 * SSR-safe: prerender (no window) defaults to "pending" without storage read.
 */

export type ConsentStatus = 'pending' | 'accepted' | 'denied';

export interface ConsentContextValue {
  status: ConsentStatus;
  accept: () => void;
  deny: () => void;
  reset: () => void;
}

const STORAGE_KEY = 'r352-consent-v1';

const defaultValue: ConsentContextValue = {
  status: 'pending',
  accept: () => {},
  deny: () => {},
  reset: () => {},
};

const ConsentContext = createContext<ConsentContextValue>(defaultValue);

function readStoredStatus(): ConsentStatus {
  if (typeof window === 'undefined') return 'pending';
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === 'accepted' || raw === 'denied') return raw;
  } catch {
    // localStorage may be unavailable (Safari private mode, etc.) - fall through
  }
  return 'pending';
}

function persistStatus(status: ConsentStatus): void {
  if (typeof window === 'undefined') return;
  try {
    if (status === 'pending') {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, status);
    }
  } catch {
    // Silently swallow - consent will simply not persist across sessions.
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  // Always start with "pending" during the initial render so SSR/CSR markup matches.
  // Hydrate the real value from localStorage in an effect.
  const [status, setStatus] = useState<ConsentStatus>('pending');

  useEffect(() => {
    setStatus(readStoredStatus());
  }, []);

  const accept = useCallback(() => {
    setStatus('accepted');
    persistStatus('accepted');
  }, []);

  const deny = useCallback(() => {
    setStatus('denied');
    persistStatus('denied');
  }, []);

  const reset = useCallback(() => {
    setStatus('pending');
    persistStatus('pending');
  }, []);

  return (
    <ConsentContext.Provider value={{ status, accept, deny, reset }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  return useContext(ConsentContext);
}

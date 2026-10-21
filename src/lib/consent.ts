export type Consent = 'granted' | 'denied';

const KEY = 'analytics-consent';
// Storage can throw (blocked cookies, private modes), so the choice also lives for this page view.
let current: Consent | null = null;

export function readStore(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStore(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {}
}

export function getConsent(): Consent | null {
  if (current) return current;
  const stored = readStore(KEY);
  return stored === 'granted' || stored === 'denied' ? stored : null;
}

export function setConsent(choice: Consent) {
  current = choice;
  writeStore(KEY, choice);
  document.dispatchEvent(new CustomEvent('consentchange', { detail: choice }));
}

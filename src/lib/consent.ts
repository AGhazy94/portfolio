export type Consent = 'granted' | 'denied';

const KEY = 'analytics-consent';
// Bump when the privacy notice changes what consent covers, so every visitor is asked again.
const VERSION = 1;
const MAX_AGE = 365 * 24 * 60 * 60 * 1000;
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

// A choice older than a year, or given under an earlier notice, counts as no choice.
export function getConsent(): Consent | null {
  if (current) return current;
  try {
    const { choice, at, version } = JSON.parse(readStore(KEY) ?? '');
    if ((choice === 'granted' || choice === 'denied') && version === VERSION && Date.now() - at < MAX_AGE) {
      return choice;
    }
  } catch {}
  return null;
}

export function setConsent(choice: Consent) {
  current = choice;
  writeStore(KEY, JSON.stringify({ choice, at: Date.now(), version: VERSION }));
  document.dispatchEvent(new CustomEvent('consentchange', { detail: choice }));
}

import { getConsent, readStore, writeStore } from './consent';

export const utmKeys = ['source', 'medium', 'campaign', 'content', 'term'] as const;

export interface FirstTouch {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
  landingPage: string;
  referrer: string;
}

// Hidden form field → first-touch value; Contact renders these so Netlify's build-time detection sees them.
export const attributionFields = [
  ['first-utm-source', 'source'],
  ['first-utm-medium', 'medium'],
  ['first-utm-campaign', 'campaign'],
  ['first-utm-content', 'content'],
  ['first-utm-term', 'term'],
  ['first-landing-page', 'landingPage'],
  ['first-referrer', 'referrer'],
] as const satisfies readonly (readonly [string, keyof FirstTouch])[];

const KEY = 'first-touch';
const TTL = 90 * 24 * 60 * 60 * 1000;

export function cleanTag(value: string | null) {
  const text = (value ?? '')
    .replace(/[\u0000-\u001f\u007f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 100);
  // An address in a tag is personal data, not a campaign name.
  return /\S@\S/.test(text) ? '' : text;
}

let entry: FirstTouch | null | undefined;

// This page is an entry when the visitor arrived from outside the site or through a tagged link.
function pageEntry() {
  if (entry !== undefined) return entry;
  const params = new URLSearchParams(location.search);
  const utm = Object.fromEntries(utmKeys.map((key) => [key, cleanTag(params.get(`utm_${key}`))])) as Record<
    (typeof utmKeys)[number],
    string
  >;
  let internal = false;
  let referrer = '';
  try {
    const url = new URL(document.referrer);
    internal = url.origin === location.origin;
    if (!internal && /^https?:$/.test(url.protocol)) referrer = url.hostname;
  } catch {}
  const tagged = Object.values(utm).some(Boolean);
  entry = internal && !tagged ? null : { ...utm, landingPage: location.pathname, referrer };
  return entry;
}

function stored(): FirstTouch | null {
  const raw = readStore(KEY);
  if (!raw) return null;
  try {
    const { at, ...touch } = JSON.parse(raw);
    if (typeof at === 'number' && Date.now() - at < TTL) return touch;
  } catch {}
  writeStore(KEY, null);
  return null;
}

// First touch wins: a later campaign visit never replaces it until its 90 days run out.
export function rememberEntry() {
  const current = pageEntry();
  if (getConsent() !== 'granted' || stored() || !current) return;
  writeStore(KEY, JSON.stringify({ ...current, at: Date.now() }));
}

export const forgetEntry = () => writeStore(KEY, null);

// Without consent nothing is kept, so only a form sent from the entry page itself carries its source.
export const firstTouch = () => (getConsent() === 'granted' && stored()) || pageEntry();

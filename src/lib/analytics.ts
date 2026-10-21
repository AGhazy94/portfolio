import { cleanTag, utmKeys } from './attribution';
import { getConsent } from './consent';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Only campaign tags reach Google; any other query string (a token, an address in a link) is dropped.
function pageLocation() {
  const url = new URL(location.pathname, location.origin);
  const params = new URLSearchParams(location.search);
  for (const key of utmKeys) {
    const value = cleanTag(params.get(`utm_${key}`));
    if (value) url.searchParams.set(`utm_${key}`, value);
  }
  return url.href;
}

function pageReferrer() {
  try {
    const url = new URL(document.referrer);
    return url.origin + (url.origin === location.origin ? url.pathname : '/');
  } catch {
    return '';
  }
}

// Called only after the visitor allows analytics, so nothing reaches Google before that.
export function loadAnalytics(measurementId: string, debug: boolean) {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function () {
    // gtag.js reads the Arguments object itself, not an array copy.
    window.dataLayer!.push(arguments);
  };
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_location: pageLocation(),
    page_referrer: pageReferrer(),
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    ...(debug && { debug_mode: true }),
  });

  // Queued calls wait in dataLayer, so the script can load after the page without losing the page view.
  const inject = () => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.append(script);
  };
  if (document.readyState === 'complete') inject();
  else window.addEventListener('load', inject, { once: true });
}

// Fired only after Netlify accepts the message; no form values are sent.
export function trackLead() {
  if (getConsent() === 'granted') window.gtag?.('event', 'generate_lead', { form_name: 'contact' });
}

export function clearAnalyticsCookies() {
  const names = document.cookie
    .split('; ')
    .map((cookie) => cookie.split('=')[0])
    .filter((name) => name === '_ga' || name.startsWith('_ga_'));
  for (const name of names) {
    for (const domain of ['', `; domain=.${location.hostname}`]) {
      document.cookie = `${name}=; max-age=0; path=/${domain}`;
    }
  }
}

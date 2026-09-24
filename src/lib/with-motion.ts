type Motion = typeof import('./motion');

// GSAP waits for load and an idle moment so it never competes with the first paint (LCP).
export function withMotion(run: (motion: Motion) => void) {
  if (!matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
  const idle = window.requestIdleCallback ?? ((callback: () => void) => setTimeout(callback, 1));
  const start = () => idle(() => import('./motion').then(run));
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}

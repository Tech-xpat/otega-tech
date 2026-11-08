/**
 * Scroll helpers that understand the stacked section layers.
 *
 * Layers are `position: sticky`, so once a layer is "stuck" its on-screen position no longer
 * matches where it sits in the page. The natural position is the container top plus the heights
 * of the layers before it, which is what we scroll to.
 */
type LenisLike = { scrollTo: (target: number | HTMLElement, opts?: Record<string, unknown>) => void };

function getLenis(): LenisLike | undefined {
  return (window as unknown as { __lenis?: LenisLike }).__lenis;
}

export function naturalTop(el: HTMLElement): number {
  const layer = el.closest<HTMLElement>('[data-stack-layer]');
  if (!layer || !layer.parentElement) return el.getBoundingClientRect().top + window.scrollY;

  let top = layer.parentElement.getBoundingClientRect().top + window.scrollY;
  for (const sibling of Array.from(layer.parentElement.children)) {
    if (sibling === layer) break;
    top += (sibling as HTMLElement).offsetHeight;
  }
  return top;
}

export function scrollToHash(hash: string, duration = 1.2): boolean {
  const lenis = getLenis();
  if (hash === '#home' || hash === '#') {
    lenis ? lenis.scrollTo(0, { duration }) : window.scrollTo({ top: 0, behavior: 'smooth' });
    return true;
  }
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return false;
  const top = naturalTop(el);
  lenis ? lenis.scrollTo(top, { duration }) : window.scrollTo({ top, behavior: 'smooth' });
  return true;
}

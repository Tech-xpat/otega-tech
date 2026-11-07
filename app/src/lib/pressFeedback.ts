/**
 * Premium press feedback for every tappable element.
 *
 * On press the element visibly sinks (see .is-pressed in index.css). The real action
 * (navigation, scroll, submit, toggle...) is then held back for HOLD_MS so the depth of
 * the press can actually be seen, and is replayed once the animation has played.
 *
 * Opt out per element with data-no-press.
 */
const TAPPABLE = 'a[href], button, [role="button"], summary, .cursor-pointer, [data-press]';
const IGNORE = '[disabled], [aria-disabled="true"], [data-no-press]';
const HOLD_MS = 240;

export function initPressFeedback() {
  if (typeof document === 'undefined') return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let pending: HTMLElement | null = null;
  const replaying = new WeakSet<HTMLElement>();

  const find = (target: EventTarget | null): HTMLElement | null => {
    const el = (target as HTMLElement | null)?.closest?.(TAPPABLE) as HTMLElement | null;
    return el && !el.matches(IGNORE) ? el : null;
  };

  const onDown = (e: PointerEvent) => {
    if (e.button > 0 || pending) return;
    find(e.target)?.classList.add('is-pressed');
  };

  // Release the pressed look only if no click follows (finger dragged away / cancelled).
  const onUp = () => {
    window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>('.is-pressed').forEach((n) => {
        if (n !== pending) n.classList.remove('is-pressed');
      });
    }, 80);
  };

  const onClick = (e: MouseEvent) => {
    const el = find(e.target);
    if (!el) return;

    // Second pass: the replayed click goes straight through to the app.
    if (replaying.has(el)) {
      replaying.delete(el);
      return;
    }
    // Ignore taps on other elements while a press is playing.
    if (pending) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }
    // Keep new-tab / modifier clicks and reduced-motion users instant.
    if (reduceMotion || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button > 0) return;

    e.preventDefault();
    e.stopImmediatePropagation();
    pending = el;
    el.classList.add('is-pressed');

    window.setTimeout(() => {
      replaying.add(el);
      pending = null;
      el.click();
      window.requestAnimationFrame(() => el.classList.remove('is-pressed'));
    }, HOLD_MS);
  };

  document.addEventListener('pointerdown', onDown, true);
  document.addEventListener('pointerup', onUp, true);
  document.addEventListener('pointercancel', onUp, true);
  document.addEventListener('click', onClick, true);
}

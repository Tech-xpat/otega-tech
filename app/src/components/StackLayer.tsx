import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * One layer of the stacked page. Layers are sticky, so each new section slides up and
 * covers the one before it. A layer taller than the screen scrolls normally until its bottom
 * edge reaches the bottom of the screen, then stays put while the next layer slides over it.
 */
const StackLayer = ({ children, index }: { children: ReactNode; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      el.style.top = `${Math.min(0, window.innerHeight - el.offsetHeight)}px`;
    };
    update();
    // When a layer changes height (images/data loading), re-measure scroll positions once things settle
    let timer = 0;
    const onResize = () => {
      update();
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      window.clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-stack-layer
      data-stack-index={index}
      className={`stack-layer ${index > 0 ? 'stack-sheet' : ''}`}
      style={{ zIndex: index + 1 }}
    >
      {children}
      <div className="stack-dim" aria-hidden="true" />
    </div>
  );
};

export default StackLayer;

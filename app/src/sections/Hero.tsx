import { useEffect, useRef } from 'react';

const NAME = 'OTEGA TECH';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  // Subtle mouse parallax. Writes the transform straight to the DOM inside
  // requestAnimationFrame, so moving the mouse never triggers a React re-render.
  useEffect(() => {
    const el = portraitRef.current;
    const section = sectionRef.current;
    if (!el || !section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 14;
      ty = (e.clientY / window.innerHeight - 0.5) * 10;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
          raf = 0;
        });
      }
    };
    section.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      section.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex w-full min-h-screen flex-col overflow-hidden bg-background lg:block"
    >
      {/* Soft brand glow behind the portrait (static gradient, no blur filter, so it costs nothing on scroll) */}
      <div
        className="pointer-events-none absolute -right-[10%] top-[8%] hidden h-[85%] w-[60%] lg:block"
        style={{ background: 'radial-gradient(closest-side, hsl(var(--brand) / 0.13), transparent 72%)' }}
        aria-hidden="true"
      />

      {/* Portrait: transparent cut-out blended straight into the page, no frame */}
      <div
        ref={portraitRef}
        className="hero-in pointer-events-none relative z-0 order-2 mx-auto -mt-4 w-full max-w-[520px] lg:absolute lg:bottom-0 lg:right-0 lg:order-none lg:mx-0 lg:mt-0 lg:h-[88vh] lg:max-h-[980px] lg:w-auto lg:max-w-none"
        style={{ animationDelay: '0.15s', willChange: 'transform' }}
      >
        <img
          src="/hero-portrait.webp"
          srcSet="/hero-portrait-720.webp 720w, /hero-portrait.webp 1226w"
          sizes="(min-width: 1024px) 45vw, 90vw"
          width={1226}
          height={1283}
          alt="Otega Tech founder in a black polo shirt"
          className="block h-auto w-full lg:h-full lg:w-auto"
          style={{
            WebkitMaskImage:
              'linear-gradient(to bottom, #000 86%, transparent 100%), linear-gradient(to right, transparent 0, #000 16%)',
            maskImage:
              'linear-gradient(to bottom, #000 86%, transparent 100%), linear-gradient(to right, transparent 0, #000 16%)',
            WebkitMaskComposite: 'source-in',
            maskComposite: 'intersect',
          }}
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col justify-center px-6 pb-4 pt-28 md:px-12 lg:px-20 lg:pb-16">
        <div className="max-w-2xl lg:max-w-[52%]">
          <p
            className="hero-in mb-6 flex items-center gap-3 font-body text-sm text-foreground/70"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
            Websites, brands and automation for growing businesses
          </p>

          <h1
            className="hero-in font-display text-[clamp(3.5rem,11vw,9.5rem)] font-bold leading-[0.9] tracking-tight text-foreground"
            style={{ animationDelay: '0.2s' }}
          >
            {NAME.split(' ').map((word) => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
          </h1>

          <p
            className="hero-in mt-8 max-w-xl font-body text-lg leading-relaxed text-foreground/75 md:text-xl"
            style={{ animationDelay: '0.4s' }}
          >
            Otega Tech builds fast, good-looking websites, memorable brand identities and
            AI automation that saves your team hours every week.
          </p>

          <div
            className="hero-in mt-10 flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: '0.55s' }}
          >
            <a
              href="#portfolio"
              className="bg-brand px-8 py-4 text-center font-body text-sm font-medium tracking-wide text-brand-foreground transition-colors duration-300 hover:bg-brand/90"
            >
              See our work
            </a>
            <a
              href="#contact"
              className="border border-foreground/25 px-8 py-4 text-center font-body text-sm font-medium tracking-wide text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
            >
              Start a project
            </a>
          </div>

          <p
            className="hero-in mt-10 flex items-center gap-2 font-body text-xs text-foreground/62"
            style={{ animationDelay: '0.7s' }}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-600" aria-hidden="true" />
            Taking on new projects in Delta State, Nigeria and worldwide
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

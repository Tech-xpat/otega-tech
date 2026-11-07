import { useEffect, useRef } from 'react';

const TICKER = ['Web Development', 'Brand Design', 'AI Automation', 'Software Development', 'Delta State, Nigeria'];

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Gentle mouse parallax. Writes the transform straight to the DOM inside rAF,
  // so moving the mouse never triggers a React re-render.
  useEffect(() => {
    const el = stageRef.current;
    const section = sectionRef.current;
    if (!el || !section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 12;
      ty = (e.clientY / window.innerHeight - 0.5) * 8;
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

  const tag =
    'absolute z-20 border border-foreground bg-card px-3.5 py-2 font-body text-[11px] font-semibold uppercase tracking-wider text-foreground sm:text-xs';
  const tagShadow = { boxShadow: '4px 4px 0 hsl(var(--foreground))' };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-background lg:block"
    >
      {/* ---------- Copy ---------- */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col justify-center px-6 pb-10 pt-28 md:px-12 lg:min-h-screen lg:px-20 lg:pb-24 lg:pt-24">
        <div className="max-w-2xl lg:max-w-[50%]">
          <p
            className="hero-in mb-5 flex items-center gap-3 font-body text-sm font-medium text-foreground/75"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="h-2.5 w-2.5 bg-brand" aria-hidden="true" />
            Digital studio in Delta State, Nigeria
          </p>

          <h1
            className="hero-in font-display text-[clamp(4rem,min(12vw,19vh),10.5rem)] font-bold leading-[0.86] tracking-tight text-foreground"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="block">OTEGA</span>
            <span className="block text-brand">TECH</span>
          </h1>

          <p
            className="hero-in mt-6 max-w-lg font-body text-lg leading-relaxed text-foreground/75 md:text-xl"
            style={{ animationDelay: '0.4s' }}
          >
            We build fast websites, memorable brands and AI automation that give growing businesses
            more customers and fewer hours of busywork.
          </p>

          <div className="hero-in mt-7 flex flex-col gap-4 sm:flex-row" style={{ animationDelay: '0.55s' }}>
            <a
              href="#portfolio"
              className="press-deep bg-brand px-8 py-4 text-center font-body text-sm font-medium tracking-wide text-brand-foreground"
            >
              See our work
            </a>
            <a
              href="#contact"
              className="border border-foreground px-8 py-4 text-center font-body text-sm font-medium tracking-wide text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
            >
              Start a project
            </a>
          </div>

          <p
            className="hero-in mt-7 flex items-center gap-2 font-body text-xs text-foreground/65"
            style={{ animationDelay: '0.7s' }}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-600" aria-hidden="true" />
            5+ years building for startups, agencies and established brands
          </p>
        </div>
      </div>

      {/* ---------- Portrait stage ---------- */}
      <div
        className="relative z-0 mx-auto mt-2 w-full max-w-[440px] sm:max-w-[500px] lg:absolute lg:bottom-0 lg:-right-[3%] lg:mx-0 lg:mt-0 lg:h-[80vh] lg:max-h-[900px] lg:w-auto lg:max-w-none"
        style={{ aspectRatio: '1226 / 1283' }}
      >
        <div ref={stageRef} className="hero-in absolute inset-0" style={{ animationDelay: '0.15s', willChange: 'transform' }}>
          {/* flat cobalt disc + offset outline ring */}
          <div
            className="absolute rounded-full border border-foreground"
            style={{ left: '12%', top: '25%', width: '78%', aspectRatio: '1', transform: 'translate(14px, 14px)' }}
            aria-hidden="true"
          />
          <div
            className="absolute rounded-full bg-brand"
            style={{ left: '12%', top: '25%', width: '78%', aspectRatio: '1' }}
            aria-hidden="true"
          />

          <img
            src="/hero-portrait.webp"
            srcSet="/hero-portrait-720.webp 720w, /hero-portrait.webp 1226w"
            sizes="(min-width: 1024px) 42vw, 90vw"
            width={1226}
            height={1283}
            alt="Otega Tech founder in a black polo shirt"
            className="absolute inset-0 h-full w-full"
            fetchPriority="high"
            decoding="async"
          />

          {/* floating tags */}
          <span className={`${tag} animate-float`} style={{ ...tagShadow, left: '2%', top: '38%' }}>
            Web Development
          </span>
          <span className={`${tag} animate-float`} style={{ ...tagShadow, right: '15%', top: '55%', animationDelay: '-2s' }}>
            AI Automation
          </span>
          <span className={`${tag} animate-float`} style={{ ...tagShadow, left: '2%', top: '70%', animationDelay: '-4s' }}>
            Brand Design
          </span>

          {/* rotating badge */}
          <div
            className="absolute z-20 hidden h-28 w-28 items-center justify-center rounded-full border border-foreground bg-card sm:flex"
            style={{ right: '12%', top: '7%' }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-spin-slow">
              <defs>
                <path id="badgePath" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
              </defs>
              <text fontSize="10.5" fontWeight="600" fill="currentColor" className="font-body uppercase text-foreground">
                <textPath href="#badgePath" textLength="274" lengthAdjust="spacing">Delta State • Nigeria • Otega Tech •</textPath>
              </text>
            </svg>
            <span className="font-display text-2xl font-bold text-brand">OT</span>
          </div>
        </div>
      </div>

      {/* ---------- Ticker band: the portrait stands on this ---------- */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex h-14 items-center overflow-hidden bg-foreground md:h-16" aria-hidden="true">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {TICKER.map((t) => (
                <span key={t + dup} className="flex items-center font-display text-sm font-bold uppercase tracking-[0.22em] text-background md:text-base">
                  <span className="px-6 md:px-9">{t}</span>
                  <span className="h-4 w-px bg-background/30" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

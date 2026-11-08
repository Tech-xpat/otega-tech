import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Palette, Bot, Terminal, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  features: string[];
}

const services: Service[] = [
  {
    id: 1,
    title: 'Web Development',
    description:
      'Building high-performance, responsive websites and web applications using modern technologies.',
    icon: Code,
    features: [
      'React & Next.js',
      'TypeScript',
      'Node.js Backend',
      'API Integration',
    ],
  },
  {
    id: 2,
    title: 'Brand Design',
    description:
      'Creating distinctive brand identities that communicate your values and resonate with your audience.',
    icon: Palette,
    features: [
      'Logo Design',
      'Brand Strategy',
      'Visual Identity',
      'Brand Guidelines',
    ],
  },
  {
    id: 3,
    title: 'AI Automation',
    description:
      'Implementing intelligent automation solutions to streamline workflows and boost productivity.',
    icon: Bot,
    features: [
      'Workflow Automation',
      'Chatbot Development',
      'Data Processing',
      'AI Integration',
    ],
  },
  {
    id: 4,
    title: 'Software Dev',
    description:
      'Developing custom software solutions tailored to your specific business requirements.',
    icon: Terminal,
    features: [
      'Custom Applications',
      'SaaS Products',
      'Database Design',
      'Cloud Solutions',
    ],
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 88%', toggleActions: 'play none none reverse' },
        }
      );

      if (reduceMotion) return;

      const sheets = gsap.utils.toArray<HTMLElement>('.paper-sheet');
      sheets.forEach((sheet, i) => {
        const inner = sheet.querySelector<HTMLElement>('.paper-inner');
        const shade = sheet.querySelector<HTMLElement>('.paper-shade');
        if (!inner) return;

        // 1) The sheet is laid onto the stack: rises, un-tilts and fades in as it scrolls into view.
        gsap.fromTo(
          inner,
          { y: 90, rotate: i % 2 === 0 ? -2 : 2, opacity: 0.2 },
          {
            y: 0,
            rotate: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: { trigger: sheet, start: 'top 98%', end: 'top 62%', scrub: 0.6 },
          }
        );

        // 2) When the next sheet is laid on top, this one sinks back and dims slightly.
        const next = sheets[i + 1];
        if (next) {
          gsap.to(inner, {
            scale: 0.94,
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top 80%', end: 'top 22%', scrub: 0.6 },
          });
          if (shade) {
            gsap.to(shade, {
              opacity: 1,
              ease: 'none',
              scrollTrigger: { trigger: next, start: 'top 80%', end: 'top 22%', scrub: 0.6 },
            });
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative w-full bg-background py-20 md:py-32">
      <div className="w-full px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div ref={headingRef} className="mb-12 md:mb-20">
          <p className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-foreground/62">What We Do</p>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-responsive-lg font-bold text-foreground">OUR EXPERTISE</h2>
            <p className="max-w-md font-body text-sm text-foreground/62">
              Combining technical expertise with creative vision to deliver comprehensive digital solutions.
            </p>
          </div>
        </div>

        {/* Stack of paper sheets */}
        <div ref={stackRef} className="mx-auto max-w-5xl pb-10">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <article
                key={service.id}
                className="paper-sheet sticky mb-[16vh] last:mb-0"
                style={{ top: `calc(88px + ${i * 18}px)`, zIndex: i + 1 }}
              >
                <div
                  className="paper-inner relative origin-top overflow-hidden rounded-md border border-foreground/[0.08] bg-card p-7 md:p-12"
                  style={{
                    boxShadow:
                      '0 -14px 36px -18px rgba(14,17,26,0.28), 0 18px 40px -16px rgba(14,17,26,0.22), 0 2px 6px rgba(14,17,26,0.06)',
                    willChange: 'transform',
                  }}
                >
                  {/* folded paper corner */}
                  <div
                    className="pointer-events-none absolute right-0 top-0 h-9 w-9"
                    style={{ background: 'linear-gradient(225deg, hsl(var(--background)) 50%, hsl(var(--muted)) 50%)' }}
                    aria-hidden="true"
                  />
                  {/* dims the sheet as the next one covers it */}
                  <div
                    className="paper-shade pointer-events-none absolute inset-0 bg-black/[0.05] opacity-0 dark:bg-black/35"
                    aria-hidden="true"
                  />

                  <div className="relative grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-14">
                    <div>
                      <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center bg-brand text-brand-foreground">
                          <Icon size={24} />
                        </div>
                        <span className="font-display text-5xl font-bold text-foreground/10">0{service.id}</span>
                      </div>
                      <h3 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">{service.title}</h3>
                      <p className="max-w-md font-body text-base leading-relaxed text-foreground/70">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex flex-col justify-between gap-8">
                      <ul className="space-y-3">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-3 border-b border-foreground/[0.08] pb-3 font-body text-sm text-foreground/75"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <a
                        href="#portfolio"
                        className="group inline-flex items-center gap-2 font-body text-sm font-medium uppercase tracking-wider text-brand"
                      >
                        <span>See our work</span>
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-2" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;

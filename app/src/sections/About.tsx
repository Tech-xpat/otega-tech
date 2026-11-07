import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: '5+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Completed' },
    { value: '30+', label: 'Happy Clients' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading character reveal
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll('.char');
        gsap.fromTo(
          chars,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.03,
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Content fade up
      gsap.fromTo(
        contentRef.current?.querySelectorAll('.content-item') || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats counter animation
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll('.stat-item');
        gsap.fromTo(
          statItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const heading = 'ABOUT US';

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen bg-background py-20 md:py-32"
    >
      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Sticky Image */}
          <div className="relative lg:sticky lg:top-32">
            <div
              ref={imageRef}
              className="relative aspect-[4/5] overflow-hidden"
            >
              <img
                src="/about-portrait.webp"
                srcSet="/about-portrait-640.webp 640w, /about-portrait.webp 1049w"
                sizes="(min-width: 1024px) 45vw, 100vw"
                width={1049}
                height={1312}
                alt="Otega Tech founder working at his desk with code on screen"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-brand/30" />
            <div className="absolute -top-4 -left-4 w-20 h-20 border border-brand/30" />
          </div>

          {/* Right Column - Content */}
          <div className="lg:pt-20">
            {/* Heading */}
            <h2
              ref={headingRef}
              className="font-display text-responsive-lg font-bold text-foreground mb-8 overflow-hidden"
            >
              {heading.split('').map((char, index) => (
                <span key={index} className="char inline-block">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h2>

            {/* Content */}
            <div ref={contentRef} className="space-y-6">
              <p className="content-item text-lg md:text-xl text-foreground/85 font-body leading-relaxed">
                Otega Tech is a digital studio that builds websites, brands and
                automation for businesses that want to look sharp and run
                smoothly online. From brand identity to full-stack development,
                we deliver work that gets results.
              </p>

              <p className="content-item text-base text-foreground/70 font-body leading-relaxed">
                With over 5 years in the digital space, we have worked with
                startups, agencies and established brands across industries. Our
                approach pairs clear strategy with close attention to detail, so
                every project is delivered on time and ready to grow.
              </p>

              <p className="content-item text-base text-foreground/70 font-body leading-relaxed">
                Whether it is a new brand identity, a high-performance web
                application or AI-driven automation, Otega Tech brings the same
                dedication and expertise to every project.
              </p>

              {/* Skills Tags */}
              <div className="content-item flex flex-wrap gap-3 pt-4">
                {[
                  'React',
                  'TypeScript',
                  'Node.js',
                  'Python',
                  'Figma',
                  'AI/ML',
                  'Brand Strategy',
                  'UI/UX',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 border border-foreground/20 text-sm text-foreground/78 font-body tracking-wider uppercase hover:border-foreground/35 hover:text-foreground transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-foreground/[0.12]"
            >
              {stats.map((stat, index) => (
                <div key={index} className="stat-item text-center md:text-left">
                  <span className="block font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
                    {stat.value}
                  </span>
                  <span className="text-xs text-foreground/62 font-body tracking-wider uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

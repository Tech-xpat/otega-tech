import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSeo } from './lib/seo';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Portfolio from './sections/Portfolio';
import WebDevelopment from './sections/WebDevelopment';
import BrandDesign from './sections/BrandDesign';
import AIAutomation from './sections/AIAutomation';
import Services from './sections/Services';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import StackLayer from './components/StackLayer';
import { scrollToHash } from './lib/scroll';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  useSeo({
    title: 'Otega Tech | Web Development, Brand Design & AI Automation',
    description:
      'Otega Tech builds fast websites, memorable brands and AI automation for growing businesses in Nigeria and beyond. Browse our web development, brand design and automation work.',
    path: '/',
  });

  useEffect(() => {
    // Always start homepage at the top on load/refresh
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Lenis is driven by the single GSAP ticker below (no second rAF loop).
    // Touch devices keep native momentum scrolling, which is smoother than JS smoothing there.
    const lenis = new Lenis({
      lerp: 0.1,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !reduceMotion,
      wheelMultiplier: 1,
      syncTouch: false,
      infinite: false,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    // Snap to top immediately after Lenis boots
    lenis.scrollTo(0, { immediate: true });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const backToTopBtn = document.getElementById('back-to-top');
    let backVisible = false;
    const handleScroll = () => {
      if (!backToTopBtn) return;
      const show = window.scrollY > 500;
      if (show === backVisible) return; // only touch the DOM when the state actually flips
      backVisible = show;
      if (show) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth, stack-aware scrolling for every in-page "#section" link
    const onAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const hash = link.getAttribute('href') || '';
      if (hash.length < 2 || !document.querySelector(hash)) return;
      e.preventDefault();
      scrollToHash(hash);
    };
    document.addEventListener('click', onAnchorClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', onAnchorClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as any).__lenis;
    };
  }, []);

  // As each layer is covered by the next one it dims slightly; once fully covered it stops painting.
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray<HTMLElement>('[data-stack-layer]');
      layers.forEach((layer, i) => {
        const next = layers[i + 1];
        if (!next) return;

        // fully covered -> skip painting and pause its animations
        ScrollTrigger.create({
          trigger: next,
          start: 'top top-=40',
          end: 'max',
          onToggle: (self) => layer.classList.toggle('stack-hidden', self.isActive),
        });

        const dim = layer.querySelector<HTMLElement>('.stack-dim');
        if (reduceMotion || !dim) return;
        gsap.fromTo(
          dim,
          { opacity: 0 },
          {
            opacity: 0.4,
            ease: 'none',
            scrollTrigger: {
              trigger: next,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
              onToggle: (self) => {
                dim.style.display = self.isActive ? 'block' : 'none';
              },
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  // Scroll to a section requested from another page (no "#" in the URL)
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!target || target === '#home') return;
    const t = setTimeout(() => {
      scrollToHash(target);
    }, 400);
    return () => clearTimeout(t);
  }, [location.state]);

  return (
    <div className="relative bg-background min-h-screen">
      <Navbar />
      <main>
        <div>
          {[Hero, About, Portfolio, WebDevelopment, BrandDesign, AIAutomation, Services, Contact].map(
            (Section, i) => (
              <StackLayer key={i} index={i}>
                <Section />
              </StackLayer>
            )
          )}
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default App;

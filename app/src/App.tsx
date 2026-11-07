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

    return () => {
      window.removeEventListener('scroll', handleScroll);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as any).__lenis;
    };
  }, []);

  // Scroll to a section requested from another page (no "#" in the URL)
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!target || target === '#home') return;
    const t = setTimeout(() => {
      const el = document.querySelector(target);
      const lenis = (window as any).__lenis;
      if (el && lenis?.scrollTo) lenis.scrollTo(el as HTMLElement, { duration: 1.1 });
      else el?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
    return () => clearTimeout(t);
  }, [location.state]);

  return (
    <div className="relative bg-background min-h-screen">
      <div className="grain-overlay" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <WebDevelopment />
        <BrandDesign />
        <AIAutomation />
        <Services />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;

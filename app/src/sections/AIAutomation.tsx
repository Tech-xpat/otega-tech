import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { firestore } from '../lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

gsap.registerPlugin(ScrollTrigger);

interface AIProject {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: any;
}

const AIAutomation = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<AIProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(firestore, 'aiAutomation'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data: AIProject[] = [];
        snapshot.forEach((doc) => {
          const project = { id: doc.id, ...doc.data() } as AIProject;
          data.push(project);
        });
        data.sort(
          (a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0)
        );
        setProjects(data);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-background px-6 md:px-12 lg:px-20"
    >
      <div ref={headingRef} className="mb-16">
        <p className="text-xs tracking-[0.3em] text-foreground/62 uppercase font-body mb-4">
          Portfolio
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
          AI Automation
        </h2>
        <p className="text-lg text-foreground/70 max-w-2xl">
          AI-powered solutions and automation projects. View the complete collection.
        </p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-foreground/62">Loading...</div>
      ) : (
        <Link
          to="/portfolio/ai-automation"
          className="group inline-block p-8 rounded-xl bg-foreground/[0.04] border border-foreground/[0.12] hover:border-foreground/35 hover:bg-foreground/[0.06] transition-all max-w-md"
        >
          <h3 className="text-2xl font-semibold text-foreground mb-3">All AI Projects</h3>
          <p className="text-foreground/62 mb-4">
            {projects.length} project{projects.length === 1 ? '' : 's'}
          </p>
          <p className="text-sm text-foreground/78 group-hover:text-foreground">View full list →</p>
        </Link>
      )}
    </section>
  );
};

export default AIAutomation;

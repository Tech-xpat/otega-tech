import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { firestore } from '../lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

gsap.registerPlugin(ScrollTrigger);

interface BrandProject {
  id: string;
  subcategory: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: any;
}

const brandSubcategories = [
  'Church Branding',
  'Flyers',
  'Birthday Flyers',
  'Logo',
  'Other Visuals',
];

function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const BrandDesign = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Record<string, BrandProject[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init: Record<string, BrandProject[]> = {};
    brandSubcategories.forEach((cat) => {
      init[cat] = [];
    });
    setProjects(init);

    const q = query(collection(firestore, 'brandDesign'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data: Record<string, BrandProject[]> = { ...init };
        snapshot.forEach((doc) => {
          const project = { id: doc.id, ...doc.data() } as BrandProject;
          if (data[project.subcategory]) {
            data[project.subcategory].push(project);
          }
        });

        Object.keys(data).forEach((key) => {
          data[key].sort(
            (a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0)
          );
        });

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
          Brand Design
        </h2>
        <p className="text-lg text-foreground/70 max-w-2xl">
          Creative branding and design work. Tap any category to view the full collection.
        </p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-foreground/62">Loading categories...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {brandSubcategories.map((category) => (
            <Link
              key={category}
              to={`/portfolio/brand-design/${titleToSlug(category)}`}
              className="group p-6 rounded-xl bg-foreground/[0.04] border border-foreground/[0.12] hover:border-foreground/35 hover:bg-foreground/[0.06] transition-all"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-foreground">
                {category}
              </h3>
              <p className="text-sm text-foreground/62">
                {projects[category]?.length || 0} design
                {(projects[category]?.length || 0) === 1 ? '' : 's'}
              </p>
              <p className="mt-4 text-sm text-foreground/78 group-hover:text-foreground">View full list →</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default BrandDesign;

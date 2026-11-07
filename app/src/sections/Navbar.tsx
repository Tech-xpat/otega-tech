import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [adminClicks, setAdminClicks] = useState(0);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // Add background when scrolled
      setIsScrolled(currentScrollY > 50);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        y: isVisible ? 0 : -100,
        duration: 0.4,
        ease: 'expo.out',
      });
    }
  }, [isVisible]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    // On any page other than the homepage, go home first, then scroll.
    // Uses router state instead of "#..." so the address bar stays clean.
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: href } });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      const lenis = (window as any).__lenis;
      if (lenis?.scrollTo) lenis.scrollTo(target, { offset: 0, duration: 1.1 });
      else target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAdminLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const newCount = adminClicks + 1;
    setAdminClicks(newCount);
    
    // Navigate to admin after 5 clicks
    if (newCount >= 5) {
      navigate('/greatness');
      setAdminClicks(0);
    }
    
    // Reset counter after 3 seconds of inactivity
    setTimeout(() => {
      setAdminClicks(0);
    }, 3000);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/95 border-b border-foreground/[0.08]'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#home"
              onClick={handleAdminLogoClick}
              className="font-display text-2xl font-bold text-foreground tracking-tight hover:opacity-80 transition-opacity cursor-pointer relative group"
              title={adminClicks > 0 ? `Admin: ${adminClicks}/5` : 'Otega Tech'}
            >
              Otega Tech
              {adminClicks > 0 && (
                <span className="absolute -bottom-1 -right-2 text-xs opacity-50 text-foreground">
                  {adminClicks}/5
                </span>
              )}
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="relative text-sm text-foreground/78 hover:text-foreground font-body tracking-wider uppercase transition-colors duration-300 group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="hidden md:block px-6 py-3 border border-foreground/25 text-foreground text-sm font-body tracking-wider uppercase hover:bg-foreground hover:text-background transition-all duration-300"
            >
              Let's Talk
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-opacity duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-display text-4xl font-bold text-foreground hover:text-foreground/78 transition-colors"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="mt-8 px-8 py-4 bg-brand text-brand-foreground font-body text-sm tracking-wider uppercase"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;

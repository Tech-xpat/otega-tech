import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Home } from 'lucide-react';
import { useSeo } from '../lib/seo';

const NotFound = () => {
  useSeo({ title: 'Page not found | Otega Tech', description: 'Page not found', path: typeof window !== 'undefined' ? window.location.pathname : '/', noindex: true });
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(5);

  useEffect(() => {
    // Animate the 404 text
    gsap.fromTo(
      '.error-code',
      { opacity: 0, scale: 0.5, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'elastic.out(1, 0.3)' }
    );

    // Animate the message
    gsap.fromTo(
      '.error-message',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
    );

    // Animate the location text
    gsap.fromTo(
      '.location-text',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: 'power3.out' }
    );

    // Animate the button
    gsap.fromTo(
      '.action-button',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.9, ease: 'power3.out' }
    );

    // Floating animation for 404
    gsap.to('.error-code', {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1.3,
    });

    // Auto redirect timer
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden flex flex-col items-center justify-center relative px-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(0deg, transparent 24%, rgba(14,17,26,.06) 25%, rgba(14,17,26,.06) 26%, transparent 27%, transparent 74%, rgba(14,17,26,.06) 75%, rgba(14,17,26,.06) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(14,17,26,.06) 25%, rgba(14,17,26,.06) 26%, transparent 27%, transparent 74%, rgba(14,17,26,.06) 75%, rgba(14,17,26,.06) 76%, transparent 77%, transparent)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-foreground/[0.04] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-foreground/[0.04] rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-6">
        {/* 404 Code */}
        <div className="error-code space-y-2">
          <h1 className="text-8xl md:text-9xl font-bold text-foreground/92 tracking-tight">
            404
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-transparent via-foreground to-transparent mx-auto" />
        </div>

        {/* Error Message */}
        <div className="error-message space-y-2 max-w-md mx-auto">
          <p className="text-2xl md:text-3xl font-bold text-foreground">
            Page Not Found
          </p>
          <p className="text-lg text-foreground/78">
            Sorry about that. Check your network while we redirect you.
          </p>
        </div>

        {/* Location Information */}
        <div className="location-text px-6 py-4 rounded-lg bg-foreground/[0.04] border border-foreground/[0.12] max-w-sm mx-auto">
          <p className="text-sm text-foreground/70">
            <span className="block mb-1 text-xs font-semibold text-foreground/85">
              Service Location
            </span>
            Delta State, Nigeria
          </p>
        </div>

        {/* Redirect Info */}
        <div className="space-y-4">
          <p className="text-sm text-foreground/62">
            Redirecting to home in{' '}
            <span className="font-semibold text-foreground">
              {remainingTime}s
            </span>
          </p>

          {/* Action Button */}
          <button
            onClick={handleGoHome}
            className="action-button inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-all duration-300 group"
          >
            <Home size={20} />
            <span>Go Back Home</span>
          </button>
        </div>

        {/* Decorative Text */}
        <div className="pt-8 text-xs text-foreground/45 tracking-widest uppercase">
          <p>The page you're looking for doesn't exist</p>
        </div>
      </div>

      {/* Animated Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground to-transparent opacity-20" />
    </div>
  );
};

export default NotFound;

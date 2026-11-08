import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { applyTheme, getTheme, type Theme } from '@/lib/theme';

const ThemeToggle = ({ className = '' }: { className?: string }) => {
  const [theme, setTheme] = useState<Theme>(() => getTheme());
  const isDark = theme === 'dark';

  const toggle = () => {
    const next: Theme = isDark ? 'light' : 'dark';
    applyTheme(next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      title={isDark ? 'Light theme' : 'Dark theme'}
      className={`relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden border border-foreground/25 text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background ${className}`}
    >
      <Sun
        size={19}
        className={`absolute transition-all duration-500 ease-out ${
          isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
      />
      <Moon
        size={19}
        className={`absolute transition-all duration-500 ease-out ${
          isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        }`}
      />
    </button>
  );
};

export default ThemeToggle;

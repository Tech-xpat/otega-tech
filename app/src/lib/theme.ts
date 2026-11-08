export type Theme = 'light' | 'dark';

const KEY = 'otega-theme';
const META_COLOR: Record<Theme, string> = { light: '#F5F6F8', dark: '#0E1119' };

export function getTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META_COLOR[theme]);
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* storage can be unavailable (private mode); the theme still applies for this visit */
  }
}

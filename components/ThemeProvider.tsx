'use client';

import { useEffect } from 'react';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const res = await fetch('/api/theme-settings');
        if (!res.ok) return;
        const theme = await res.json();

        const root = document.documentElement.style;
        if (theme.primaryColor)   root.setProperty('--color-primary',    theme.primaryColor);
        if (theme.secondaryColor) root.setProperty('--color-secondary',  theme.secondaryColor);
        if (theme.accentColor)    root.setProperty('--color-accent',     theme.accentColor);
        if (theme.roseColor)      root.setProperty('--color-rose',       theme.roseColor);
        if (theme.burgundyColor)  root.setProperty('--color-burgundy',   theme.burgundyColor);
        if (theme.champagneColor) root.setProperty('--color-champagne',  theme.champagneColor);
        if (theme.ivoryColor)     root.setProperty('--color-ivory',      theme.ivoryColor);
        if (theme.buttonColor)    root.setProperty('--color-button',     theme.buttonColor);
      } catch {}
    };

    loadTheme();
  }, []);

  return <>{children}</>;
}

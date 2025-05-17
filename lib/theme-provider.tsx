"use client"
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'forest' | 'cold' | 'underwater' | 'halloween';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('forest');

  useEffect(() => {
    // Apply theme to document element
    document.documentElement.setAttribute('data-theme', theme);
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Load theme from localStorage on initial render
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
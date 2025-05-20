"use client"
import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'forest' | 'cold' | 'underwater' | 'halloween';

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


// bg-gradient-to-br from-blue-500 to-purple-600
// bg-white border  bg-opacity-10 backdrop-blur-md

/*
========== Forset ==========
TEXT  = #FFC857
TILE FRONT =  bg-gradient-to-br from-[#274156] to-[#3B6978]
hover border  =  border-[#3FD1FF]
bg image src = /assets/background/Nature.jpg

=========  COLD ==========
TEXT text-blue-200
TILE FRONT  = bg-gradient-to-br from-blue-300 via-blue-100 to-blue-50
hover border-white
bg image src = /assets/background/Snow.jpg

========= UNDERWATER ==========
TEXT text-cyan-400
TILE FRONT  = bg-gradient-to-b from-blue-800 via-teal-700 to-cyan-500
hover border-teal-300
bg image src = /assets/background/Underwater.jpg

========= HALLOWEEN ==========
TEXT text-yellow-400
TILE FRONT = bg-gradient-to-b from-yellow-200 via-orange-300 to-red-400
hover border-teal-300
bg image src = /assets/background/Snow.jpg

*/
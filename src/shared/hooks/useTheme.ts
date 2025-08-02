import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored as 'light' | 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    // Create professional fade overlay
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-professional';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999;
      pointer-events: none;
      background: ${newTheme === 'dark' ? '#111827' : '#ffffff'};
      opacity: 0;
      transition: opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;
    
    document.body.appendChild(overlay);
    
    // Add subtle blur effect to content
    const content = document.querySelector('body');
    if (content) {
      content.style.filter = 'blur(0px)';
      content.style.transition = 'filter 0.3s ease-out';
    }
    
    // Phase 1: Fade in overlay with subtle blur
    requestAnimationFrame(() => {
      overlay.style.opacity = '0.95';
      if (content) {
        content.style.filter = 'blur(1px)';
      }
    });
    
    // Phase 2: Change theme at peak opacity
    setTimeout(() => {
      setTheme(newTheme);
    }, 150);
    
    // Phase 3: Fade out overlay and remove blur
    setTimeout(() => {
      overlay.style.opacity = '0';
      if (content) {
        content.style.filter = 'blur(0px)';
      }
    }, 200);
    
    // Cleanup
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
      if (content) {
        content.style.filter = '';
        content.style.transition = '';
      }
      setIsTransitioning(false);
    }, 500);
  };

  return { theme, toggleTheme, isTransitioning };
};

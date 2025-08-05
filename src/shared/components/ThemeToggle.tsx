import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Check if user has a theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const newTheme = !isDark;
    
    // Create smooth transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999;
      pointer-events: none;
      background: ${newTheme ? 'linear-gradient(135deg, #0a0a0a, #1a1a1a)' : 'linear-gradient(135deg, #ffffff, #f8fafc)'};
      opacity: 0;
      transition: opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;
    
    document.body.appendChild(overlay);
    
    // Phase 1: Fade in overlay
    requestAnimationFrame(() => {
      overlay.style.opacity = '0.95';
    });
    
    // Phase 2: Change theme at peak opacity
    setTimeout(() => {
      setIsDark(newTheme);
      
      if (newTheme) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }, 150);
    
    // Phase 3: Fade out overlay
    setTimeout(() => {
      overlay.style.opacity = '0';
    }, 200);
    
    // Cleanup
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <button
      onClick={toggleTheme}
      disabled={isTransitioning}
      className="relative min-w-[44px] min-h-[44px] p-3 rounded-xl bg-transparent hover:bg-light-surface dark:hover:bg-dark-surface transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed group"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      type="button"
    >
      {/* Background hover effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      
      {/* Icon container */}
      <div className="relative z-10 flex items-center justify-center">
        {isDark ? (
          <Sun className="h-5 w-5 text-warning-600 dark:text-warning-400 transition-all duration-200 group-hover:rotate-12 group-hover:scale-110" />
        ) : (
          <Moon className="h-5 w-5 text-primary-600 dark:text-primary-400 transition-all duration-200 group-hover:-rotate-12 group-hover:scale-110" />
        )}
      </div>
      
      {/* Loading indicator */}
      {isTransitioning && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-xl bg-white/20 dark:bg-white/10 scale-0 group-active:scale-100 transition-transform duration-150" />
    </button>
  );
};

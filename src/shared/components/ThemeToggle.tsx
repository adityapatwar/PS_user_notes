import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { Button } from './Button';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, isTransitioning } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      disabled={isTransitioning}
      className="p-2 relative group"
      aria-label="Toggle theme"
    >
      <div className={`transition-all duration-300 ${isTransitioning ? 'scale-95 opacity-60' : 'scale-100 opacity-100'}`}>
        {theme === 'dark' ? (
          <Sun className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12" />
        ) : (
          <Moon className="h-4 w-4 transition-transform duration-200 group-hover:-rotate-12" />
        )}
      </div>
      
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 rounded-lg bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </Button>
  );
};

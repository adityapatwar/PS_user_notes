import React from 'react';
import { Header } from './Header';
import { ThemeTransition } from '../components/ThemeTransition';
import { useTheme } from '../hooks/useTheme';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, isTransitioning } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      
      {/* Theme transition overlay */}
      <ThemeTransition 
        isActive={isTransitioning} 
        targetTheme={theme} 
      />
    </div>
  );
};

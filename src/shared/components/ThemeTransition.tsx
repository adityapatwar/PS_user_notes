import React from 'react';

interface ThemeTransitionProps {
  isActive: boolean;
  targetTheme: 'light' | 'dark';
}

export const ThemeTransition: React.FC<ThemeTransitionProps> = ({ isActive, targetTheme }) => {
  if (!isActive) return null;

  const backgroundColor = targetTheme === 'dark' ? '#111827' : '#ffffff';

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none transition-opacity duration-300 ease-out"
      style={{
        background: backgroundColor,
        opacity: isActive ? 0.95 : 0,
        backdropFilter: 'blur(2px)',
      }}
    />
  );
};

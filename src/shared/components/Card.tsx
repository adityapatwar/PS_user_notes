import React from 'react';
import { cn } from '../utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'glass' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  padding = 'md',
  hover = false,
  onClick,
}) => {
  const baseClasses = 'rounded-xl transition-all duration-300 ease-out';
  
  const variants = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm',
    elevated: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg',
    glass: 'glass backdrop-blur-xl',
    gradient: 'gradient-surface border border-gray-200 dark:border-gray-700',
  };
  
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };
  
  const hoverClasses = hover ? 'hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={cn(
        baseClasses,
        variants[variant],
        paddings[padding],
        hoverClasses,
        clickableClasses,
        'animate-fade-in',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

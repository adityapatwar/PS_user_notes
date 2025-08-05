import React from 'react';
import { cn } from '../utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'shimmer' | 'none';
  lines?: number;}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  animation = 'shimmer',
  lines = 1,
}) => {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';
  
  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };
  
  const animations = {
    pulse: 'animate-pulse',
    shimmer: 'animate-shimmer',
    none: '',
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              variants[variant],
              animations[animation],
              index === lines - 1 ? 'w-3/4' : 'w-full',
              className
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        baseClasses,
        variants[variant],
        animations[animation],
        className
      )}
    />
  );
};

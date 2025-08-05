import React from 'react';
import { cn } from '../utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gradient';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group';
  
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20 hover:scale-105 active:scale-95',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-400 dark:hover:bg-gray-800 hover:scale-105 active:scale-95',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',
    gradient: 'gradient-primary text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 focus:ring-primary-500',
  };
  
  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  const iconSizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
    xl: 'h-6 w-6',
  };

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        loading && 'cursor-wait',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {/* Ripple effect overlay */}
      <span className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 transition-transform duration-200 rounded-xl" />
      
      {loading && (
        <svg className={cn('animate-spin mr-2', iconSizes[size])} fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <span className={cn('mr-2', iconSizes[size])}>{icon}</span>
      )}
      
      <span className="relative z-10">{children}</span>
      
      {icon && iconPosition === 'right' && !loading && (
        <span className={cn('ml-2', iconSizes[size])}>{icon}</span>
      )}
    </button>
  );
};

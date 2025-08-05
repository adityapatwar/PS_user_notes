import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'glass';
  inputSize?: 'sm' | 'md' | 'lg';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  success,
  icon,
  rightIcon,
  variant = 'default',
  inputSize = 'md',
  type,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  // Filter out custom props that shouldn't be passed to DOM
  const {
    rightIcon: _rightIcon,
    ...inputProps
  } = props;

  const variants = {
    default: 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-400',
    filled: 'bg-gray-50 dark:bg-gray-700 border border-transparent focus:border-primary-500 dark:focus:border-primary-400 focus:bg-white dark:focus:bg-gray-800',
    glass: 'glass border border-white/20 focus:border-primary-400',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
          {label}
        </label>
      )}
      
      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
            <div className={cn(
              'transition-colors duration-200',
              isFocused ? 'text-primary-500' : 'text-gray-400'
            )}>
              {icon}
            </div>
          </div>
        )}
        
        <input
          type={inputType}
          className={cn(
            'block w-full rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200',
            variants[variant],
            sizes[inputSize],
            icon && 'pl-10',
            (isPassword || rightIcon) && 'pr-10',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            success && 'border-green-500 focus:border-green-500 focus:ring-green-500/20',
            'hover:shadow-md focus:shadow-lg',
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...inputProps}
        />
        
        {/* Right Icon or Password Toggle */}
        {(isPassword || rightIcon) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {isPassword ? (
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            ) : (
              <div className="text-gray-400">
                {rightIcon}
              </div>
            )}
          </div>
        )}
        
        {/* Focus ring effect */}
        <div className={cn(
          'absolute inset-0 rounded-xl transition-all duration-200 pointer-events-none',
          isFocused && !error && !success && 'ring-2 ring-primary-500/20 ring-offset-2 ring-offset-white dark:ring-offset-gray-900'
        )} />
      </div>
      
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 animate-slide-in flex items-center">
          <svg className="h-4 w-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {success && (
        <p className="text-sm text-green-600 dark:text-green-400 animate-slide-in flex items-center">
          <svg className="h-4 w-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {success}
        </p>
      )}
    </div>
  );
};

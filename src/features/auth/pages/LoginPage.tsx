import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Mail, Lock, StickyNote } from 'lucide-react';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { ThemeToggle } from '../../../shared/components/ThemeToggle';
import { useAuth } from '../hooks/useAuth';
import { useAuthStore } from '../store/authStore';
import { validateEmail, validatePassword } from '../../../shared/utils';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const { login, error } = useAuth();
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setEmailError('');
    setPasswordError('');
    
    // Validate
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    
    await login({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-all duration-300">
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md animate-subtle-fade-in">
        <div className="glass-professional rounded-2xl shadow-xl p-8 border">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg mx-auto mb-4 transition-transform duration-200 hover:scale-105">
              <StickyNote className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Sign in to your account to continue</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-50/80 dark:bg-red-900/20 border border-red-200/50 dark:border-red-800/50 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              icon={<Mail className="h-4 w-4" />}
              required
            />

            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              icon={<Lock className="h-4 w-4" />}
              required
            />

            <Button
              type="submit"
              className="w-full btn-professional"
              loading={isLoading}
              size="lg"
            >
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

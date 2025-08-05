import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Card } from '../../../shared/components/Card';
import { ThemeToggle } from '../../../shared/components/ThemeToggle';
import { showToast, showAdvancedToast } from '../../../shared/utils/toast';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth, setLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      showToast.warning('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setLoading(true);
    
    try {
      const response = await authService.login({ email, password });
      
      if (response.success) {
        // Store token and navigate
        localStorage.setItem('auth_token', response.data.token);
        
        // Create a mock user object since login only returns token
        const mockUser = {
          id: 'user_' + Date.now(),
          email: email,
          role: 'user',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        setAuth(mockUser, response.data.token);
        
        showAdvancedToast.success(
          'Welcome back!', 
          'You have successfully logged in to your account.'
        );
        
        navigate('/notes');
      } else {
        showAdvancedToast.error(
          'Login Failed', 
          response.message || 'Invalid email or password. Please try again.'
        );
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Something went wrong. Please try again.';
      
      showAdvancedToast.error('Login Error', errorMessage);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('demo@example.com');
    setPassword('demo123');
    
    // Trigger form submission after setting values
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-bg dark:to-dark-surface flex items-center justify-center p-4 relative">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-secondary-500 dark:to-secondary-600 rounded-2xl shadow-lg mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-light-text dark:text-dark-text mb-2">
            Welcome Back
          </h1>
          <p className="text-light-textSecondary dark:text-dark-textSecondary">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Form */}
        <Card variant="elevated" className="bg-white/80 dark:bg-dark-surface/80 backdrop-blur-xl border-light-border dark:border-dark-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="h-4 w-4 icon-theme-muted" />}
                variant="filled"
                className="bg-light-surface dark:bg-dark-bg border-light-border dark:border-dark-border"
                required
              />
            </div>

            <div>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="h-4 w-4 icon-theme-muted" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 hover:bg-light-surface dark:hover:bg-dark-surface rounded transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 icon-theme-muted" />
                    ) : (
                      <Eye className="h-4 w-4 icon-theme-muted" />
                    )}
                  </button>
                }
                variant="filled"
                className="bg-light-surface dark:bg-dark-bg border-light-border dark:border-dark-border"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 dark:text-secondary-500 bg-light-surface dark:bg-dark-bg border-light-border dark:border-dark-border rounded focus:ring-primary-500 dark:focus:ring-secondary-500"
                />
                <span className="ml-2 text-sm text-light-textSecondary dark:text-dark-textSecondary">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-primary-600 dark:text-secondary-400 hover:text-primary-700 dark:hover:text-secondary-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-light-border dark:border-dark-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-dark-surface text-light-textMuted dark:text-dark-textMuted">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={handleDemoLogin}
              disabled={isLoading}
            >
              Try Demo Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-primary-600 dark:text-secondary-400 hover:text-primary-700 dark:hover:text-secondary-300 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-light-textMuted dark:text-dark-textMuted">
            By signing in, you agree to our{' '}
            <a href="#" className="text-primary-600 dark:text-secondary-400 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary-600 dark:text-secondary-400 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

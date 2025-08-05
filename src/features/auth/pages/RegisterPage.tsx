import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, UserPlus } from 'lucide-react';
import { authService } from '../services/authService';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Card } from '../../../shared/components/Card';
import { ThemeToggle } from '../../../shared/components/ThemeToggle';
import { showToast, showAdvancedToast } from '../../../shared/utils/toast';

export const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      showToast.warning('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      showToast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      showToast.warning('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await authService.register({ email, password });
      
      if (response.success) {
        showAdvancedToast.success(
          'Registration Successful!', 
          'Your account has been created. Please sign in to continue.'
        );
        
        navigate('/login');
      } else {
        showAdvancedToast.error(
          'Registration Failed', 
          response.message || 'Unable to create account. Please try again.'
        );
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Something went wrong. Please try again.';
      
      showAdvancedToast.error('Registration Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
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
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-light-text dark:text-dark-text mb-2">
            Create Account
          </h1>
          <p className="text-light-textSecondary dark:text-dark-textSecondary">
            Join us and start organizing your notes
          </p>
        </div>

        {/* Register Form */}
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
                placeholder="Create a password"
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

            <div>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={<Lock className="h-4 w-4 icon-theme-muted" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="p-1 hover:bg-light-surface dark:hover:bg-dark-surface rounded transition-colors"
                  >
                    {showConfirmPassword ? (
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

            <div className="flex items-start">
              <input
                type="checkbox"
                className="w-4 h-4 mt-1 text-primary-600 dark:text-secondary-500 bg-light-surface dark:bg-dark-bg border-light-border dark:border-dark-border rounded focus:ring-primary-500 dark:focus:ring-secondary-500"
                required
              />
              <span className="ml-2 text-sm text-light-textSecondary dark:text-dark-textSecondary">
                I agree to the{' '}
                <a href="#" className="text-primary-600 dark:text-secondary-400 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary-600 dark:text-secondary-400 hover:underline">
                  Privacy Policy
                </a>
              </span>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-primary-600 dark:text-secondary-400 hover:text-primary-700 dark:hover:text-secondary-300 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-light-textMuted dark:text-dark-textMuted">
            By creating an account, you agree to our terms and conditions
          </p>
        </div>
      </div>
    </div>
  );
};

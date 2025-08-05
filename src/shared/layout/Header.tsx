import React from 'react';
import { LogOut, User, Settings, Bell, Search } from 'lucide-react';
import { useAuthStore } from '../../features/auth/store/authStore';
import { ThemeToggle } from '../components/ThemeToggle';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, searchQuery = '' }) => {
  const { user, logout } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-dropdown]')) {
        setShowUserMenu(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl border-b border-light-border dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-secondary-500 dark:to-secondary-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-light-text dark:text-dark-text">
                  Notes
                </h1>
                <p className="text-xs text-light-textMuted dark:text-dark-textMuted -mt-1">
                  Personal workspace
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => onSearch?.(e.target.value)}
              icon={<Search className="h-4 w-4 icon-theme-muted" />}
              variant="filled"
              className="w-full bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border"
            />
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Mobile search button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
            >
              <Search className="h-4 w-4 icon-theme" />
            </Button>

            {/* Notifications */}
            <div className="relative" data-dropdown>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 relative hover:bg-light-surface dark:hover:bg-dark-surface"
              >
                <Bell className="h-4 w-4 icon-theme" />
                {/* Notification badge */}
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-error-light dark:bg-error-dark rounded-full text-xs flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                </span>
              </Button>

              {showNotifications && (
                <Card
                  variant="elevated"
                  padding="none"
                  className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-y-auto z-50 bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border"
                >
                  <div className="p-4 border-b border-light-border dark:border-dark-border">
                    <h3 className="font-semibold text-light-text dark:text-dark-text">Notifications</h3>
                  </div>
                  <div className="p-4 text-center text-light-textMuted dark:text-dark-textMuted">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-50 icon-theme-muted" />
                    <p className="text-sm">No new notifications</p>
                  </div>
                </Card>
              )}
            </div>

            {/* Theme Toggle - Isolated container */}
            <div className="flex items-center">
              <ThemeToggle />
            </div>

            {/* User Menu */}
            <div className="relative" data-dropdown>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-2 flex items-center space-x-2 hover:bg-light-surface dark:hover:bg-dark-surface"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-secondary-500 dark:to-secondary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="hidden sm:block text-sm font-medium text-light-text dark:text-dark-text">
                  {user?.email?.split('@')[0] || 'User'}
                </span>
              </Button>

              {showUserMenu && (
                <Card
                  variant="elevated"
                  padding="none"
                  className="absolute right-0 top-full mt-2 w-56 z-50 bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border"
                >
                  <div className="p-4 border-b border-light-border dark:border-dark-border">
                    <p className="text-sm font-medium text-light-text dark:text-dark-text">
                      {user?.email?.split('@')[0] || 'User'}
                    </p>
                    <p className="text-xs text-light-textMuted dark:text-dark-textMuted truncate">
                      {user?.email}
                    </p>
                  </div>
                  
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-left text-sm text-light-textSecondary dark:text-dark-textSecondary hover:bg-light-surface dark:hover:bg-dark-surface flex items-center">
                      <User className="h-4 w-4 mr-3 icon-theme" />
                      Profile
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-light-textSecondary dark:text-dark-textSecondary hover:bg-light-surface dark:hover:bg-dark-surface flex items-center">
                      <Settings className="h-4 w-4 mr-3 icon-theme" />
                      Settings
                    </button>
                  </div>
                  
                  <div className="border-t border-light-border dark:border-dark-border py-2">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-error-light dark:text-error-dark hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign out
                    </button>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden px-4 pb-3">
        <Input
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => onSearch?.(e.target.value)}
          icon={<Search className="h-4 w-4 icon-theme-muted" />}
          variant="filled"
          className="bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border"
        />
      </div>
    </header>
  );
};

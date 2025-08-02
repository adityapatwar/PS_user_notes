import React from 'react';
import { LogOut, StickyNote } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { Button } from '../components/Button';
import { useAuthStore } from '../../features/auth/store/authStore';

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg">
              <StickyNote className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">NotesApp</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Modern note-taking</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-400">
              Welcome, <span className="font-medium">{user?.email}</span>
            </div>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

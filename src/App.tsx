import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './features/auth/store/authStore';
import { LoginPage } from './features/auth/pages/LoginPage';
import { RegisterPage } from './features/auth/pages/RegisterPage';
import { NotesPage } from './features/notes/pages/NotesPage';
import { ToastProvider } from './shared/components/ToastProvider';
import { ErrorBoundary } from './shared/components/ErrorBoundary';
import './shared/styles/design-tokens.css';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-theme transition-colors duration-300">
        <Router>
          <Routes>
            <Route 
              path="/login" 
              element={!isAuthenticated ? <LoginPage /> : <Navigate to="/notes" replace />} 
            />
            <Route 
              path="/register" 
              element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/notes" replace />} 
            />
            <Route 
              path="/notes" 
              element={isAuthenticated ? (
                <ErrorBoundary>
                  <NotesPage />
                </ErrorBoundary>
              ) : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/" 
              element={<Navigate to={isAuthenticated ? "/notes" : "/login"} replace />} 
            />
          </Routes>
        </Router>
        <ToastProvider />
      </div>
    </ErrorBoundary>
  );
}

export default App;

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center p-4">
          <Card className="max-w-lg w-full text-center bg-white dark:bg-dark-surface border-light-border dark:border-dark-border">
            <div className="p-8">
              {/* Error Icon */}
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>

              {/* Error Title */}
              <h1 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
                Oops! Something went wrong
              </h1>

              {/* Error Description */}
              <p className="text-light-textSecondary dark:text-dark-textSecondary mb-6 leading-relaxed">
                We encountered an unexpected error. This has been logged and we'll look into it.
              </p>

              {/* Error Details (Development only) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-6 text-left">
                  <summary className="cursor-pointer text-sm font-medium text-light-textMuted dark:text-dark-textMuted hover:text-light-text dark:hover:text-dark-text mb-2">
                    Show error details
                  </summary>
                  <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4 text-xs">
                    <div className="font-mono text-red-800 dark:text-red-200 mb-2">
                      <strong>Error:</strong> {this.state.error.message}
                    </div>
                    {this.state.error.stack && (
                      <div className="font-mono text-red-700 dark:text-red-300 whitespace-pre-wrap">
                        <strong>Stack:</strong>
                        <br />
                        {this.state.error.stack}
                      </div>
                    )}
                    {this.state.errorInfo && (
                      <div className="font-mono text-red-700 dark:text-red-300 mt-2">
                        <strong>Component Stack:</strong>
                        <br />
                        {this.state.errorInfo.componentStack}
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="primary"
                  onClick={this.handleRetry}
                  className="flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Try Again</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={this.handleGoHome}
                  className="flex items-center justify-center space-x-2"
                >
                  <Home className="h-4 w-4" />
                  <span>Go Home</span>
                </Button>
              </div>

              {/* Support Info */}
              <div className="mt-8 pt-6 border-t border-light-border dark:border-dark-border">
                <p className="text-xs text-light-textMuted dark:text-dark-textMuted">
                  If this problem persists, please contact support with the error details above.
                </p>
              </div>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook version for functional components
export const useErrorHandler = () => {
  return (error: Error, errorInfo?: ErrorInfo) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo);
    
    // You can integrate with error reporting services here
    // Example: Sentry.captureException(error);
  };
};

// Higher-order component wrapper
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
  onError?: (error: Error, errorInfo: ErrorInfo) => void
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback} onError={onError}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

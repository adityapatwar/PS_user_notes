import toast from 'react-hot-toast';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import React from 'react';

// Custom toast utilities with theme-aware styling
export const showToast = {
  success: (message: string, description?: string, options?: any) => {
    return toast.success(message, {
      ...options,
      icon: React.createElement(CheckCircle, { 
        key: 'success-icon',
        className: 'w-5 h-5',
        style: { color: 'var(--color-success)' }
      }),
    });
  },

  error: (message: string, description?: string, options?: any) => {
    return toast.error(message, {
      ...options,
      icon: React.createElement(AlertCircle, { 
        key: 'error-icon',
        className: 'w-5 h-5',
        style: { color: 'var(--color-error)' }
      }),
    });
  },

  warning: (message: string, description?: string, options?: any) => {
    return toast(message, {
      ...options,
      icon: React.createElement(AlertTriangle, { 
        key: 'warning-icon',
        className: 'w-5 h-5',
        style: { color: 'var(--color-warning)' }
      }),
      style: {
        background: 'var(--color-surface-primary)',
        color: 'var(--color-text-primary)',
        border: '1px solid var(--color-warning)',
        borderLeft: '4px solid var(--color-warning)',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '500',
        padding: '16px 20px',
        boxShadow: 'var(--shadow-lg)',
        maxWidth: '420px',
        minWidth: '320px',
      },
    });
  },

  info: (message: string, description?: string, options?: any) => {
    return toast(message, {
      ...options,
      icon: React.createElement(Info, { 
        key: 'info-icon',
        className: 'w-5 h-5',
        style: { color: 'var(--color-info)' }
      }),
      style: {
        background: 'var(--color-surface-primary)',
        color: 'var(--color-text-primary)',
        border: '1px solid var(--color-info)',
        borderLeft: '4px solid var(--color-info)',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '500',
        padding: '16px 20px',
        boxShadow: 'var(--shadow-lg)',
        maxWidth: '420px',
        minWidth: '320px',
      },
    });
  },

  loading: (message: string, options?: any) => {
    return toast.loading(message, {
      ...options,
    });
  },

  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    },
    options?: any
  ) => {
    return toast.promise(promise, messages, {
      ...options,
      success: {
        icon: React.createElement(CheckCircle, { 
          key: 'promise-success-icon',
          className: 'w-5 h-5',
          style: { color: 'var(--color-success)' }
        }),
      },
      error: {
        icon: React.createElement(AlertCircle, { 
          key: 'promise-error-icon',
          className: 'w-5 h-5',
          style: { color: 'var(--color-error)' }
        }),
      },
    });
  },

  custom: (component: React.ReactNode, options?: any) => {
    return toast.custom(component, options);
  },

  dismiss: (toastId?: string) => {
    return toast.dismiss(toastId);
  },

  remove: (toastId?: string) => {
    return toast.remove(toastId);
  },
};

// Advanced toast with custom styling
export const showAdvancedToast = {
  success: (title: string, message?: string, options?: any) => {
    return toast.custom(
      (t) => React.createElement('div', {
        key: `advanced-success-${t.id}`,
        className: `${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white dark:bg-dark-surface shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 border-l-4 border-green-500`,
        style: {
          background: 'var(--color-surface-primary)',
          borderColor: 'var(--color-success)',
          boxShadow: 'var(--shadow-lg)',
        }
      }, [
        React.createElement('div', { 
          key: 'content',
          className: 'flex-1 w-0 p-4' 
        }, [
          React.createElement('div', { 
            key: 'inner',
            className: 'flex items-start' 
          }, [
            React.createElement('div', { 
              key: 'icon-container',
              className: 'flex-shrink-0' 
            }, [
              React.createElement(CheckCircle, { 
                key: 'success-check-icon',
                className: 'h-6 w-6',
                style: { color: 'var(--color-success)' }
              })
            ]),
            React.createElement('div', { 
              key: 'text-container',
              className: 'ml-3 flex-1' 
            }, [
              React.createElement('p', { 
                key: 'title',
                className: 'text-sm font-medium',
                style: { color: 'var(--color-text-primary)' }
              }, title),
              message && React.createElement('p', { 
                key: 'message',
                className: 'mt-1 text-sm',
                style: { color: 'var(--color-text-secondary)' }
              }, message)
            ])
          ])
        ]),
        React.createElement('div', { 
          key: 'close-button',
          className: 'flex border-l border-gray-200 dark:border-gray-700' 
        }, [
          React.createElement('button', {
            key: 'close-btn',
            onClick: () => toast.dismiss(t.id),
            className: 'w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none',
            style: { color: 'var(--color-text-secondary)' }
          }, [
            React.createElement(X, { 
              key: 'close-x-icon',
              className: 'h-5 w-5' 
            })
          ])
        ])
      ]),
      { ...options, duration: 5000 }
    );
  },

  error: (title: string, message?: string, options?: any) => {
    return toast.custom(
      (t) => React.createElement('div', {
        key: `advanced-error-${t.id}`,
        className: `${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white dark:bg-dark-surface shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 border-l-4 border-red-500`,
        style: {
          background: 'var(--color-surface-primary)',
          borderColor: 'var(--color-error)',
          boxShadow: 'var(--shadow-lg)',
        }
      }, [
        React.createElement('div', { 
          key: 'content',
          className: 'flex-1 w-0 p-4' 
        }, [
          React.createElement('div', { 
            key: 'inner',
            className: 'flex items-start' 
          }, [
            React.createElement('div', { 
              key: 'icon-container',
              className: 'flex-shrink-0' 
            }, [
              React.createElement(AlertCircle, { 
                key: 'error-alert-icon',
                className: 'h-6 w-6',
                style: { color: 'var(--color-error)' }
              })
            ]),
            React.createElement('div', { 
              key: 'text-container',
              className: 'ml-3 flex-1' 
            }, [
              React.createElement('p', { 
                key: 'title',
                className: 'text-sm font-medium',
                style: { color: 'var(--color-text-primary)' }
              }, title),
              message && React.createElement('p', { 
                key: 'message',
                className: 'mt-1 text-sm',
                style: { color: 'var(--color-text-secondary)' }
              }, message)
            ])
          ])
        ]),
        React.createElement('div', { 
          key: 'close-button',
          className: 'flex border-l border-gray-200 dark:border-gray-700' 
        }, [
          React.createElement('button', {
            key: 'close-btn',
            onClick: () => toast.dismiss(t.id),
            className: 'w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none',
            style: { color: 'var(--color-text-secondary)' }
          }, [
            React.createElement(X, { 
              key: 'close-x-icon',
              className: 'h-5 w-5' 
            })
          ])
        ])
      ]),
      { ...options, duration: 6000 }
    );
  },
};

// Export default toast for backward compatibility
export default showToast;

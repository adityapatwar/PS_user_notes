import React from 'react';
import { Toaster } from 'react-hot-toast';

export const ToastProvider: React.FC = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{
        top: 20,
        right: 20,
      }}
      toastOptions={{
        // Default options for all toasts
        duration: 4000,
        style: {
          background: 'var(--color-surface-primary)',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border-primary)',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '500',
          padding: '16px 20px',
          boxShadow: 'var(--shadow-lg)',
          maxWidth: '420px',
          minWidth: '320px',
        },
        // Success toast styling
        success: {
          duration: 4000,
          style: {
            background: 'var(--color-surface-primary)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-success)',
            borderLeft: '4px solid var(--color-success)',
          },
          iconTheme: {
            primary: 'var(--color-success)',
            secondary: 'var(--color-surface-primary)',
          },
        },
        // Error toast styling
        error: {
          duration: 6000,
          style: {
            background: 'var(--color-surface-primary)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-error)',
            borderLeft: '4px solid var(--color-error)',
          },
          iconTheme: {
            primary: 'var(--color-error)',
            secondary: 'var(--color-surface-primary)',
          },
        },
        // Loading toast styling
        loading: {
          style: {
            background: 'var(--color-surface-primary)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border-primary)',
            borderLeft: '4px solid var(--color-text-accent)',
          },
        },
      }}
    />
  );
};

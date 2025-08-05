// Legacy hook for backward compatibility
// This file is kept for any existing components that might still use it
// New components should use the showToast utility directly

import { showToast } from '../utils/toast';

export const useToast = () => {
  return {
    addToast: (toast: {
      type: 'success' | 'error' | 'warning' | 'info';
      title: string;
      message?: string;
      duration?: number;
    }) => {
      const { type, title, message, duration } = toast;
      const fullMessage = message ? `${title}: ${message}` : title;
      
      switch (type) {
        case 'success':
          return showToast.success(fullMessage, { duration });
        case 'error':
          return showToast.error(fullMessage, { duration });
        case 'warning':
          return showToast.warning(fullMessage, { duration });
        case 'info':
          return showToast.info(fullMessage, { duration });
        default:
          return showToast.info(fullMessage, { duration });
      }
    },
    removeToast: showToast.dismiss,
    clearToasts: () => showToast.dismiss(),
    toasts: [], // Not used with react-hot-toast
  };
};

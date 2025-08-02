import { clsx, type ClassValue } from 'clsx';
import { parseISO, format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatApiDate(dateString: string): string {
  try {
    if (!dateString) {
      return 'Invalid Date';
    }
    
    const date = parseISO(dateString);
    
    if (isNaN(date.getTime())) {
      console.warn('Invalid date string provided:', dateString);
      return 'Invalid Date';
    }
    
    // Format using date-fns
    return format(date, 'MMM d, yyyy h:mm a');
  } catch (error) {
    console.error('Error formatting date:', error, 'Input:', dateString);
    return 'Invalid Date';
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= 6;
}

export function snakeToCamel(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(v => snakeToCamel(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => {
        const newKey = key.replace(/_([a-z])/g, g => g[1].toUpperCase());
        result[newKey] = snakeToCamel(obj[key]);
        return result;
      },
      {} as any
    );
  }
  return obj;
}

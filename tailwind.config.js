/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light Theme - White dominant with Blue secondary
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',  // Main blue
          600: '#2563eb',  // Darker blue for light theme
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',  // Very dark blue for light theme
          950: '#172554',
        },
        // Dark Theme - Elegant Purple secondary
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',  // Light purple for dark theme
          500: '#a855f7',  // Main purple
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        // Neutral colors for themes
        light: {
          bg: '#ffffff',
          surface: '#f8fafc',
          border: '#e2e8f0',
          text: '#0f172a',      // Dark text for light theme
          textSecondary: '#475569',
          textMuted: '#64748b',
        },
        dark: {
          bg: '#0a0a0a',         // Metallic black
          surface: '#1a1a1a',    // Slightly lighter metallic
          border: '#2a2a2a',
          text: '#f1f5f9',       // Light text for dark theme
          textSecondary: '#cbd5e1',
          textMuted: '#94a3b8',
        },
        // Semantic colors
        success: {
          light: '#059669',      // Dark green for light theme
          dark: '#34d399',       // Light green for dark theme
        },
        warning: {
          light: '#d97706',      // Dark orange for light theme
          dark: '#fbbf24',       // Light orange for dark theme
        },
        error: {
          light: '#dc2626',      // Dark red for light theme
          dark: '#f87171',       // Light red for dark theme
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.3)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'shimmer': 'shimmer 2s infinite linear',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '40px',
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        // Light theme utilities
        '.text-theme': {
          '@apply text-light-text dark:text-dark-text': {},
        },
        '.text-theme-secondary': {
          '@apply text-light-textSecondary dark:text-dark-textSecondary': {},
        },
        '.text-theme-muted': {
          '@apply text-light-textMuted dark:text-dark-textMuted': {},
        },
        '.bg-theme': {
          '@apply bg-light-bg dark:bg-dark-bg': {},
        },
        '.bg-theme-surface': {
          '@apply bg-light-surface dark:bg-dark-surface': {},
        },
        '.border-theme': {
          '@apply border-light-border dark:border-dark-border': {},
        },
        '.icon-theme': {
          '@apply text-primary-900 dark:text-secondary-400': {},
        },
        '.icon-theme-muted': {
          '@apply text-primary-700 dark:text-secondary-300': {},
        },
        '.icon-success': {
          '@apply text-success-light dark:text-success-dark': {},
        },
        '.icon-warning': {
          '@apply text-warning-light dark:text-warning-dark': {},
        },
        '.icon-error': {
          '@apply text-error-light dark:text-error-dark': {},
        },
        // Gradient utilities
        '.gradient-primary': {
          '@apply bg-gradient-to-r from-primary-500 to-primary-600': {},
        },
        '.gradient-secondary': {
          '@apply bg-gradient-to-r from-secondary-500 to-secondary-600': {},
        },
        '.gradient-theme': {
          '@apply bg-gradient-to-br from-primary-500 to-primary-600 dark:from-secondary-500 dark:to-secondary-600': {},
        },
        // Glass morphism
        '.glass': {
          '@apply bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10': {},
        },
        // Button variants
        '.btn-primary': {
          '@apply bg-primary-600 hover:bg-primary-700 text-white dark:bg-secondary-500 dark:hover:bg-secondary-600': {},
        },
        '.btn-secondary': {
          '@apply bg-light-surface hover:bg-primary-50 text-primary-700 border border-primary-200 dark:bg-dark-surface dark:hover:bg-secondary-900/20 dark:text-secondary-300 dark:border-secondary-700': {},
        },
      });
    },
  ],
}

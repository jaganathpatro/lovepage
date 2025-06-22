/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'dancing': ['Dancing Script', 'cursive'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'heart-beat': 'heartbeat 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        heartbeat: {
          '0%, 50%, 100%': { transform: 'scale(1)' },
          '25%, 75%': { transform: 'scale(1.1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        romantic: {
          pink: '#ec4899',
          purple: '#8b5cf6',
          rose: '#f43f5e',
          lavender: '#e6e6fa',
        }
      }
    },
  },
  plugins: [],
};
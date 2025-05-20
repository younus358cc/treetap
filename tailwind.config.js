/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f3f8f5',
          100: '#e7f1ec',
          200: '#cfe3d8',
          300: '#a8cbb9',
          400: '#77ab95',
          500: '#40916C', // Primary forest green
          600: '#296349',
          700: '#2D6A4F', // Dark forest green
          800: '#1e3e2f',
          900: '#1a3429',
        },
        wood: {
          50: '#fbf7f4',
          100: '#f5ece6',
          200: '#e9d5c8',
          300: '#d9b8a3',
          400: '#c29b80',
          500: '#B08968', // Medium wood brown
          600: '#9c7358',
          700: '#7F5539', // Dark wood brown
          800: '#63442e',
          900: '#523a2a',
        },
      },
      animation: {
        'float': 'float 2s ease-out forwards',
        'bounce-once': 'bounce 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-100px)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
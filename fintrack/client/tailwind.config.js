/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        success: '#10B981',
        danger: '#EF4444',
        bg: '#0F0F1A',
        surface: '#1A1A2E',
        border: '#2D2D4A',
      },
      fontFamily: {
        sans: ['"Outfit"', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        'shine': 'shine 1.5s ease-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shine: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
      },
      boxShadow: {
        'neon': '0 0 15px rgba(99, 102, 241, 0.4)',
        'neon-success': '0 0 15px rgba(16, 185, 129, 0.4)',
      }
    },
  },
  plugins: [],
}

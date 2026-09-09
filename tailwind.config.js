/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        udemm: {
          blue: '#003366', // Azul institucional
          light: '#E6F0FA', // Azul muy claro para fondos
          gray: '#F3F4F6'
        }
      },
      animation: {
        'breathe': 'breathe 4s ease-in-out infinite',
        'blink': 'blink 4s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scaleY(1) translateY(0)' },
          '50%': { transform: 'scaleY(1.02) translateY(-2px)' },
        },
        blink: {
          '0%, 96%, 100%': { transform: 'scaleY(1)' },
          '98%': { transform: 'scaleY(0.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [],
}
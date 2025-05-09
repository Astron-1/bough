import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--font-eb-garamond)", ...defaultTheme.fontFamily.sans],
        secondary: ["var(--font-source-sans)", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        slideUp: 'slideUp 0.6s ease-out forwards',
        spin: 'spin 0.6s linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        spin: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' }
        }
      }
    },
  },
  plugins: [],
};

import defaultTheme from "tailwindcss/defaultTheme";
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Adjust based on where your components are
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // Add this to include src directory
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
        checkmarkAppear: 'checkmarkAppear 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        shine: 'shine 5s ease-in-out infinite',
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
        checkmarkAppear: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '60%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        shine: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' }
        }
      }
    },
  },
  plugins: [],
};

const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Adjust based on where your components are
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--font-eb-garamond)", ...defaultTheme.fontFamily.sans],
        secondary: ["var(--font-source-sans)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

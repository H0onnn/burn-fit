/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#57C2FF",
        black: "#121212",
        white: "#ffffff",
        red: "#FF3C3C",
      },
    },
  },
  plugins: [],
};

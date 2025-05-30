/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      white: "#ffffff",
      greenie: "#ebefeb",
      customBlue: "#4d4dff",
      red: "#EF4444", // Example red color (you can use any hex, rgb, etc.)
      yellow: "#FACC15", // Example yellow color
      green: "#22C55E",
    },
  },
  plugins: [],
};

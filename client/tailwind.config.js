/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "max-sm": { max: "430px" },
        "max-md": { max: "1024px" },
        "max-lg": { max: "1366px" },
      },
    },
  },
  plugins: [],
}

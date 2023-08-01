/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        arial: ["Arial", "sans-serif"],
      },
      colors: {
        cwhite: "#fff",
        cblack: "#0e1217",
        cgray: "#17191f",
        ctextcolor: "#a8b3cf",
        cyellow: "#ffe923",
        cgrayborder: "#a8b3cf33",
      },
    },
  },
  plugins: [require("daisyui")],
};

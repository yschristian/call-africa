/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#DA091F",
        primaryHover: "#ea3c4f",
        secondary: "#173B3F",
        "light-bg": "#F9F9FB",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

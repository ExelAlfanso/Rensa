/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          50: "var(--black-50)",
          100: "var(--black-100)",
          200: "var(--black-200)",
          300: "var(--black-300)",
          400: "var(--black-400)",
          500: "var(--black-500)",
          600: "var(--black-600)",
          700: "var(--black-700)",
          800: "var(--black-800)",
          900: "var(--black-900)",
        },
      },
      fontFamily: {
        forum: ["var(--font-forum)", "serif"],
        figtree: ["var(--font-figtree)", "sans-serif"],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        book: "350",
        black: "950",
      },
    },
  },
  plugins: [],
};

module.exports = {
  mode: "jit",
  // purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media",
  theme: {
    screens: {
      mobile: "375px",
      desktop: "744px",
    },
    extend: {
      colors: {
        primary: "rgba(0, 89, 172, 1)",
        secondary: "rgba(247, 250, 252, 1)",
      },
      backgroundImage: (theme) => ({
        "logo-primary": "url('/SONERGY_LOGO_1.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};

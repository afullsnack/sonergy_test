module.exports = {
  // corePlugins: {
  //   container: false,
  // },
  mode: "jit",
  // purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      mobile: "375px",
      desktop: "744px",
      landingDesktop: "1224px",
    },
    extend: {
      colors: {
        primary: "rgba(0, 89, 172, 1)",
        secondary: "rgba(247, 250, 252, 1)",
        ecoVar1: "rgba(121, 199, 223, 0.05)",
        ecoVar2: "rgba(252, 185, 187, 0.05)",
        ecoVar3: "rgba(212, 180, 255, 0.05)",
      },
      backgroundImage: (theme) => ({
        "logo-primary": "url('/SONERGY_LOGO_1.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
};

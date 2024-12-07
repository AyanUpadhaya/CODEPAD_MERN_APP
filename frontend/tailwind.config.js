/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        disabled: "#D0D0D0",
        overlay: "rgba(0,0,0,0.4)",
        white: "#fff",
        "white-100": "#F5F5F5",
        green: {
          300: "#CDE5D9",
        },
        gray: {
          200: "#E5E5E5",
          300: "#D4D4D4",
        },
        black: {
          900: "#303030",
          500: "#404040",
          600: "#808080",
          300: "#737373",
          700: "#404040",
        },
        errors: {
          300: "#F83B3B",
          500: "#FE353D",
          600: "#ED1C24",
          82: "#FD5D5D",
        },
        main: {
          700: "#008C44",
          500: "#FFAE00",
          100: "#D6FFEA",
          50: "#F4ECFB",
          400: "#F8B827",
          300: "#FACF56",
        },
        orange: {
          50: "#FFF0EA",
        },
        tertiary: {
          50: "#FCFFE7",
          500: "#FFF200",
        },
        warnings: {
          400: "#FE7B11",
          600: "#FF9F43",
        },

        droplist: "#D0ECFF",
        "neutral-300": "#E0E0E0",
        "neutral-200": "#EEE",
        "neutral-100": "#F5F5F5",
        "neutral-700": "#616161",
        "neutral-900": "#212121",
        "neutral-50": "#FAFAFA",
        "blue-500": "#008C44",
        "black-high-900": "#303C58",
        "neutral-colors-900": "#212121",
        selectedColor: "#008C44",
        secondaryBase: "#1DAC33",
        successs: "#2CC672",
        tabnav: "#FFFAEB",
        textdescription: "#616161",
        buttonPrimary: "#260736",
      },
    },

    fontFamily: {
      inter: ["Inter", "sans-serif"],
      monts: ["Montserrat", "sans-serif"],
      sans: ["Open Sans", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
  },
  darkMode: "class",
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};

const { createPortal } = require("react-dom");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      gray: colors.gray,
    },
    extend: {
      
      zIndex: {
        auto: "auto",
        "-50": "-50",
        "-40": "-40",
        "-30": "-30",
        "-20": "-20",
        "-10": "-10",
        0: "0",
        10: "10",
        20: "20",
        30: "30",
        40: "40",
        50: "50",
      },
      padding: {
        "-1": "-0.25rem",
        "-2": "-0.5rem",
        "-3": "-0.75rem",
        "-4": "-1rem",
        "-6": "-1.25rem",
        "-6": "-1.5rem",
        "-8": "-2rem",
        "-10": "-2.5rem",
      },
      boxShadow: {
        bottom:
          "0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

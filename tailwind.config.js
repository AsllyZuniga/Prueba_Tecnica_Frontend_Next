/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#000000",
          white: "#FFFFFF",

          text: "#666666",
          textStrong: "#000000",
          textMuted: "#9A9A9A",

          surface: "#FFFFFF",
          background: "#F5F6F8",
          border: "#C0C0C0",
          white80: "rgba(255,255,255,0.8)",

          active: "#15B4E9",
          activeSoft: "rgba(21,180,233,0.12)",

          primaryStart: "#8C4787",
          primaryEnd: "#FF56B0",
          primarySolid: "#C8539D",
          primarySoft: "rgba(255,86,176,0.12)",
          primaryBorder: "#D98BB8",

          danger: "#FF0000",
        },
      },
      fontSize: {
        "title-24": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "label-16": ["16px", { lineHeight: "24px", fontWeight: "600" }],
        "text-12": ["12px", { lineHeight: "16px", fontWeight: "400" }],
        "label-12": ["12px", { lineHeight: "16px", fontWeight: "600" }],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0,0,0,0.08)",
      },
      backgroundImage: {
        "brand-primary": "linear-gradient(90deg, #8C4787 0%, #FF56B0 100%)",
      },
    },
  },
  plugins: [],
};
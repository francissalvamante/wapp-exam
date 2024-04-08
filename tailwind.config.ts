import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        cloudy: "url('../../public/cloudyBg.jpg')",
        rainy: "url('../../public/rainyBg1.jpg')",
        sunny: "url('../../public/sunnyBg.jpg')",
        snowy: "url('../../public/snowyBg.jpg')",
        thunderstorm: "url('../../public/thunderstormBg.jpg')",
      },
      screens: {
        xs: "320px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;

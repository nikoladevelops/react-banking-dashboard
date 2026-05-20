import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        icon: true,
        replaceAttrValues: {
          "#fff": "currentColor",
          "#FFF": "currentColor",
          white: "currentColor",
          "#000": "currentColor",
          "#000000": "currentColor",
          black: "currentColor",
          "rgb(0,0,0)": "currentColor",
          "0,0,0": "currentColor",
        },
      },
      include: "**/*.svg?react",
    }),
  ],
});

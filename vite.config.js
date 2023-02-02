import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // proxy: {
    //   "/api": "https://merntodobackend.vercel.app/",
    // },
    // "/api/user": {
    //   target: "https://merntodobackend.vercel.app/",
    //   pathRewrite: { "^/api/user": "/api" },
    // },
  },
  plugins: [react()],
});

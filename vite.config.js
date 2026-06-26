import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// During `npm run dev`, requests to /api/* are proxied to the local AI backend
// (server/index.js on port 8787). If the backend isn't running, the frontend
// automatically falls back to its built-in local matching engine.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8787",
        changeOrigin: true,
      },
    },
  },
});

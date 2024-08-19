import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// vite.config.js or vite.config.ts
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: true, // use your IP address as the host
    port: 5173, // specify a port (optional)
  },
});


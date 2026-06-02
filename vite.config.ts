import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "gsap": ["gsap"],
          "react-query": ["@tanstack/react-query"],
          "ui-components": Object.keys(require("./package.json").dependencies).filter(dep => dep.startsWith("@radix-ui")),
        },
      },
    },
    minify: "terser",
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
}));

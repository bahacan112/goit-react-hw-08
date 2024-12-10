import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Eğer özel bir alt dizine yüklemiyorsanız / kullanın
  build: {
    outDir: "dist", // Çıkış klasörünü ayarlayın
  },
  server: {
    port: 3000, // Local sunucunuz için özel bir port
  },
});

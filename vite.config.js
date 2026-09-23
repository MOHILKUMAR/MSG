import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// Vite loads VITE_* variables from .env on its own (import.meta.env).
export default defineConfig({
  plugins: [react(), tailwindcss()],
});

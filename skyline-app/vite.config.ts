import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "node:path"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  build: {
    outDir: "../skyline",
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: { entry: "src/main.tsx", formats: ["es"], fileName: () => "skyline.js", cssFileName: "skyline" },
  },
})

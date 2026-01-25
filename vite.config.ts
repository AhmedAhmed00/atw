import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Continue build even if there are TypeScript errors
    // TypeScript checking is disabled via tsconfig.json settings
  },
  esbuild: {
    // esbuild doesn't perform type checking, only transpilation
    // This allows the build to proceed even with type errors
  },
})


// vite.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import eslint from "vite-plugin-eslint"

export default defineConfig({
  plugins: [vue(), eslint()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts'
  }
})

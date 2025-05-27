import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@atoms': path.resolve(__dirname, './src/atoms'),
      '@molecules': path.resolve(__dirname, './src/molecules'),
      '@components': path.resolve(__dirname, './src/components'),
      '@experimental': path.resolve(__dirname, './src/experimental'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@helpers': path.resolve(__dirname, './src/helpers')
    }
  }
})

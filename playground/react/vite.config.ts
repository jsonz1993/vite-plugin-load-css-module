import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import loadCssModuleFile from 'vite-plugin-load-css-module'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    loadCssModuleFile({
      include: (id) =>
        id.includes('-module.less') ||
        id.includes('-module.scss') ||
        id.includes('-module.css'),
    }),
  ],
})

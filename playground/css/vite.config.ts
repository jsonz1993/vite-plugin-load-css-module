import { defineConfig } from 'vite'
import loadCssModuleFile from '../../dist'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      loadCssModuleFile({
        include: (id) => id.includes('.less') || id.includes('.scss'),
      }),
    ],
  }
})

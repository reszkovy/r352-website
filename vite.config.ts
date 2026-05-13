import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Resolve figma:asset/ imports to local src/assets/ files
// Prefers .webp over .png when available (after image optimization)
function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(source: string) {
      if (source.startsWith('figma:asset/')) {
        const filename = source.replace('figma:asset/', '')
        const assetsDir = path.resolve(__dirname, './src/assets')

        // Try .webp version first (optimized)
        if (filename.endsWith('.png')) {
          const webpPath = path.resolve(assetsDir, filename.replace('.png', '.webp'))
          if (fs.existsSync(webpPath)) {
            return webpPath
          }
        }

        return path.resolve(assetsDir, filename)
      }
      return null
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    react(),
    tailwindcss(),
  ],
  define: {
    // Build metadata injected at compile time — visible in microscopic footer label
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __BUILD_COMMIT__: JSON.stringify(
      process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ||
      process.env.GITHUB_SHA?.slice(0, 7) ||
      'local'
    ),
    __BUILD_ENV__: JSON.stringify(
      process.env.VERCEL_ENV || (process.env.NODE_ENV === 'production' ? 'prod' : 'dev')
    ),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['motion/react'],
          'vendor-lenis': ['lenis', 'lenis/react'],
        },
      },
    },
  },
})

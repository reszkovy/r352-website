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
        // Function form (not object form) — React 19 splits the actual renderer
        // into react-dom/cjs/react-dom-client.production.js, which the object
        // form can't pin (it only matches package entry modules), so the 130KB
        // renderer was silently landing in whichever chunk imported it first.
        manualChunks(id: string) {
          // Vite's dynamic-import preload helper (virtual module) is referenced by
          // every chunk that uses import() — including the entry. Left unpinned,
          // Rollup colocated it inside vendor-pdf, which made the entry statically
          // import vendor-pdf and modulepreload 390KB of jspdf on every page.
          if (id.includes('vite/preload-helper')) return 'vendor-ui'
          if (!id.includes('node_modules')) return
          // PDF stack — only reachable from lazy /limitedaccess* page chunks,
          // never preloaded on initial route. Named explicitly so future imports
          // can't accidentally merge it into a page or entry chunk.
          // @babel/runtime helpers are shared by eager chunks AND jspdf — if they
          // land inside vendor-pdf, the entry chunk statically imports vendor-pdf
          // and 391KB of jspdf gets modulepreloaded on every page. Keep them in
          // the eager shared vendor chunk instead.
          if (id.includes('node_modules/@babel/runtime/')) return 'vendor-ui'
          if (id.includes('node_modules/jspdf/')) return 'vendor-pdf'
          if (id.includes('node_modules/html2canvas/')) return 'vendor-html2canvas'
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'vendor-react'
          if (/node_modules\/(motion|framer-motion|motion-dom|motion-utils)\//.test(id)) return 'vendor-motion'
          if (id.includes('node_modules/lenis/')) return 'vendor-lenis'
          // Stable, rarely-updated eager libs split out of the entry chunk so
          // app-code deploys don't invalidate their browser cache.
          if (/node_modules\/(sonner|react-helmet-async|wouter|tailwind-merge|clsx|regexparam|react-fast-compare|invariant|shallowequal|use-sync-external-store|mitt)\//.test(id)) return 'vendor-ui'
        },
      },
    },
  },
})

import { readdirSync, statSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import preserveDirectives from 'rollup-preserve-directives'

const componentsDir = resolve(__dirname, 'src/components')
const components = readdirSync(componentsDir).filter((name) => {
  const dir = resolve(componentsDir, name)
  return statSync(dir).isDirectory() && existsSync(resolve(dir, 'index.ts'))
})

const entry: Record<string, string> = {
  index: resolve(__dirname, 'src/index.ts'),
}
for (const c of components) {
  entry[c] = resolve(componentsDir, c, 'index.ts')
}

// https://ko.vite.dev/guide/build.html#library-mode
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    preserveDirectives(),
    dts({
      include: ['src'],
      exclude: ['**/*.stories.tsx', '**/*.test.tsx', '**/*.a11y.test.tsx', 'src/test/**'],
      entryRoot: 'src',
      outDir: 'dist/types',
    }),
  ],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[name]__[local]__[hash:base64:5]',
    },
  },
  build: {
    cssCodeSplit: true,
    sourcemap: true,
    lib: {
      entry,
      formats: ['es', 'cjs'],
      fileName: (format, name) => `${name}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        /^@radix-ui\//,
        'clsx',
        'react-hook-form',
      ],
      output: {
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const isCss = assetInfo.names.some((name) => name.endsWith('.css'))
          if (!isCss) return 'assets/[name][extname]'
          // The barrel entry's only CSS import is tokens.css — rename so the
          // emitted asset matches the canonical `./tokens.css` subpath export.
          if (assetInfo.names.includes('index.css')) return 'styles/tokens.css'
          return 'styles/[name][extname]'
        },
      },
    },
  },
})

import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import nextConfig from '@onersoft/eslint-config/next'

export default defineConfig([
  ...nextConfig,
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', '.source/**', 'out/**', 'build/**', 'next-env.d.ts']),
])

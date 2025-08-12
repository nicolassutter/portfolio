import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./minoro.ts', './src/db/schema.ts'],
  outDir: './dist',
  noExternal: ['@repo/database/schema'],
  target: 'esnext',
})

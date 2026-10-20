import { defineConfig } from 'golar/unstable'
import '@golar/astro'
import '@golar/vue'

export default defineConfig({
  typecheck: {
    include: ['./src/**/*.{astro,ts,tsx,vue}'],
  },
})

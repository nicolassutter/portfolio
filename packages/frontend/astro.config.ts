import { defineConfig } from 'astro/config'
import url from 'node:url'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

// https://astro.build/config
export default defineConfig({
  output: 'static',

  integrations: [vue()],

  vite: {
    resolve: {
      alias: {
        '~/*': __dirname,
      },
    },
    plugins: [tailwindcss()],
  },
})

import { defineConfig } from 'astro/config'
import url from 'node:url'
import solidJs from '@astrojs/solid-js'
import UnoCSS from 'unocss/astro'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

// https://astro.build/config
export default defineConfig({
  integrations: [UnoCSS(), solidJs()],
  vite: {
    resolve: {
      alias: {
        '~/*': __dirname,
      },
    },
    plugins: [],
  },
  markdown: {
    shikiConfig: {
      theme: 'catppuccin-macchiato',
    },
  },
})

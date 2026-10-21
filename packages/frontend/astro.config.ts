import { defineConfig, envField } from 'astro/config'
import url from 'node:url'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://sutter-nicolas.com',

  env: {
    schema: {
      PUBLIC_UMAMI_WEBSITE_ID: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      PUBLIC_UMAMI_HOST_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
    },
  },

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

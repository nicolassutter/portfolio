import { defineConfig, envField } from 'astro/config'
import url from 'node:url'
import solidJs from '@astrojs/solid-js'
import tailwindcss from '@tailwindcss/vite'

import vercel from '@astrojs/vercel'

// import node from '@astrojs/node'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

// ENV
// OAUTH_GITHUB_CLIENT_ID=
// OAUTH_GITHUB_CLIENT_SECRET=

// https://astro.build/config
export default defineConfig({
  output: 'server',

  integrations: [solidJs()],

  vite: {
    resolve: {
      alias: {
        '~/*': __dirname,
      },
    },
    plugins: [tailwindcss()],
  },

  adapter: vercel({
    isr: {
      // can bypass the cache and revalidate immediately by sending the "x-prerender-revalidate: <bypassToken>" header
      // seconds * minutes * hours = days
      expiration: 60 * 60 * 2, // 2h
    },
  }),

  env: {
    schema: {
      // runtime variables
      DB_AUTH_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
      }),

      // build times variables
      MINORO_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: false,
      }),
    },
  },
})

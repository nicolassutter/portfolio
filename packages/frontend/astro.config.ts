import { defineConfig } from 'astro/config'
import url from 'node:url'
import solidJs from '@astrojs/solid-js'
import UnoCSS from 'unocss/astro'
import decapCmsOauth from 'astro-decap-cms-oauth'

import vercel from '@astrojs/vercel'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

// ENV
// OAUTH_GITHUB_CLIENT_ID=
// OAUTH_GITHUB_CLIENT_SECRET=

// https://astro.build/config
export default defineConfig({
  integrations: [
    UnoCSS({
      injectReset: true,
    }),
    solidJs(),
    decapCmsOauth({
      decapCMSSrcUrl: 'https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js',
    }),
  ],

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

  adapter: vercel(),
})

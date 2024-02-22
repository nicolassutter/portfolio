import { defineConfig } from 'astro/config'
import url from 'node:url'
import solidJs from '@astrojs/solid-js'
import UnoCSS from 'unocss/astro'
import { readFile, rm, writeFile } from 'node:fs/promises'
import { load } from 'cheerio'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

// https://astro.build/config
export default defineConfig({
  integrations: [
    UnoCSS(),
    {
      name: 'rss-feed-astro',
      hooks: {
        /**
         * Astro builds an HTML page with our actual RSS feed content.
         * This is kinda hacky, but we can transform that HTML page into an XML file.
         */
        'astro:build:done': async () => {
          const rssFileContent = await readFile('./dist/rss.xml/index.html')
          let finalContent = rssFileContent
            .toString()
            .replace('<!DOCTYPE html>', '')

          // Replace HTML entities with their respective characters
          finalContent = load(finalContent).text()

          await rm('./dist/rss.xml', { force: true, recursive: true })

          await writeFile('./dist/rss.xml', finalContent)
        },
      },
    },
    solidJs(),
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
})

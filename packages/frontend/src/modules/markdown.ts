import { marked } from 'marked'
import markedShiki from 'marked-shiki'
import { codeToHtml } from 'shiki'

export const md = marked.use(
  markedShiki({
    async highlight(code, lang) {
      return await codeToHtml(code, { lang, theme: 'catppuccin-macchiato' })
    },
  }),
)

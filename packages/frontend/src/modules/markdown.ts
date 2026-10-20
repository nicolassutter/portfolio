import { markdownToHtml } from 'satteri'
import expressiveCode from 'satteri-expressive-code'
import kansoInk from '../themes/kanso-ink.json'

const code = expressiveCode({ themes: [kansoInk] })

export const md = {
  async parse(source: string) {
    return (
      await markdownToHtml(source, {
        hastPlugins: [code],
      })
    ).html
  },
}

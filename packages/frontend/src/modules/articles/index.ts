import { $fetch } from 'ofetch'
import { load } from 'cheerio'
import type { Article } from '../../../types/types'

export async function getPosts(): Promise<{ data: Article[] }> {
  const tutorialsPage = await $fetch(
    'https://www.alsacreations.com/search/user/tuto/81660',
  )

  const $ = load(tutorialsPage)

  const links = $('.searchresults li a[href]')
    .map((_, element) => $(element).attr('href'))
    .toArray()

  const posts = []

  for await (const link of links) {
    if (!link) continue

    const $ = load(await $fetch(link))

    const article: Article = {
      get id() {
        // id in first capture group
        const reg = new RegExp(/lire\/(\d+)-/)
        const id = reg.exec(link)?.at(1) ?? '0'
        return parseInt(id)
      },
      title: $('h1.h-article').text() ?? '',
      publishedAt: $('.auteur-meta time').attr('datetime') ?? '',
      get views() {
        const text = $('.auteur-meta-details').text()
        // Views in first capture group
        const reg = new RegExp(/\((\d+)\slectures\)/)
        const views = reg.exec(text)?.at(1) ?? '0'
        return parseInt(views)
      },
      tags: $('.auteur-tag .keywords a[href]')
        .map((_, element) => $(element).text())
        .toArray(),
      category: $('.tagtag').text(),
      thumbnail: $('meta[property="og:image"]').attr('content') ?? '',
      url: link,
      lang: 'fr',
    }

    posts.push(article)
  }

  return { data: posts }
}

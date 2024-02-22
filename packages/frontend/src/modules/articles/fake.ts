import type { Article } from '../../../types/types'

/**
 * Fake API to avoid spamming the slow Puppeteer server in dev mode
 */
export const getFakeArticles = async () => {
  return {
    data: Array.from(
      { length: 6 },
      (): Article => ({
        id: Math.floor(Math.random() * Math.random() * 1000),
        title: "L'API Fetch en JavaScript, qu'est ce que c'est ?",
        lang: 'fr',
        publishedAt: '2022-09-06',
        views: 1337,
        tags: ['javascript', 'js', 'promesses', 'fetch'],
        category: 'javascript',
        thumbnail:
          'https://cdn.alsacreations.net/xmedia/doc/full/1658134331-Frame-15.png',
        url: 'https://example.com',
      }),
    ),
  }
}

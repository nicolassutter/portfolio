import MarkdownIt from 'markdown-it'
import { Feed } from 'feed'
import { profile } from '../modules/profile'
import { getCollection } from 'astro:content'

export async function GET() {
  const astroPosts = await getCollection('posts')

  const SITE_URL = 'https://sutter-nicolas.com'

  const md = new MarkdownIt()

  const feed = new Feed({
    title: "Nicolas Sutter's blog",
    description: "Nicolas Sutter's posts",
    id: SITE_URL,
    link: SITE_URL,
    language: 'en',
    // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    // image: profile?.avatar.url ?? '',
    favicon: `${SITE_URL}/favicon.svg`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Sutter Nicolas`,
    // updated: new Date(2013, 6, 14), // optional, default = today
    // generator: 'awesome', // optional, default = 'Feed for Node.js'
    feedLinks: {
      // json: 'https://example.com/json',
      atom: `${SITE_URL}/rss.xml`,
    },
    author: {
      name: 'Sutter Nicolas',
      email: profile?.email ?? '',
      link: SITE_URL,
    },
  })

  astroPosts.forEach((post) => {
    feed.addItem({
      title: post.data.title,
      id: post.slug,
      link: `${SITE_URL}/blog/${post.slug}`,
      content: md.render(post.body ?? ''),
      date: new Date(),
      author: [
        {
          name: 'Sutter Nicolas',
          email: profile?.email ?? '',
          link: SITE_URL,
        },
      ],
    })
  })

  return new Response(feed.rss2())
}

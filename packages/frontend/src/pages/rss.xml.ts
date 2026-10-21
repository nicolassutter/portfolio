import { Feed } from 'feed'
import { getProfile, getAllPosts } from '../modules/content'
import { getPostUrl } from '../modules/posts'

export async function GET() {
  const [posts, profile] = await Promise.all([getAllPosts(), getProfile()])

  const siteUrl = import.meta.env.SITE

  const feed = new Feed({
    title: "Nicolas Sutter's blog",
    description: "Nicolas Sutter's posts",
    id: siteUrl,
    link: siteUrl,
    language: 'en',
    // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    // image: profile?.avatar.url ?? '',
    favicon: new URL('/favicon.svg', siteUrl).href,
    copyright: `All rights reserved ${new Date().getFullYear()}, Sutter Nicolas`,
    // updated: new Date(2013, 6, 14), // optional, default = today
    // generator: 'awesome', // optional, default = 'Feed for Node.js'
    feedLinks: {
      // json: 'https://example.com/json',
      atom: new URL('/rss.xml', siteUrl).href,
    },
    author: {
      name: 'Sutter Nicolas',
      email: profile?.email ?? '',
      link: siteUrl,
    },
  })

  const promises = posts.map(async (post) => {
    if (!post.title) return

    feed.addItem({
      title: post.title,
      id: post.id,
      link: new URL(getPostUrl(post), siteUrl).href,
      content: post.excerpt,
      date: post.dateCreated,
      author: [
        {
          name: 'Sutter Nicolas',
          email: profile?.email ?? '',
          link: siteUrl,
        },
      ],
    })
  })

  await Promise.all(promises)

  return new Response(feed.rss2())
}

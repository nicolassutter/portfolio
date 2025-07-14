import { Feed } from 'feed'
import { getProfile, getAllPosts } from '../modules/requests'
import slugify from 'slugify'

export const prerender = false

export async function GET() {
  const [posts, profile] = await Promise.all([
    getAllPosts({
      perPage: 100, // Adjust as needed for the number of posts you want in the feed
    }),
    getProfile(),
  ])

  const SITE_URL = 'https://sutter-nicolas.com'

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

  const promises = posts.posts.map(async (post) => {
    if (!post.title) return

    feed.addItem({
      title: post.title,
      id: post.id,
      link: `${SITE_URL}/blog/${slugify(post.title, { lower: true })}/${post.id}`,
      content: post.excerpt ?? '',
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

  await Promise.all(promises)

  return new Response(feed.rss2())
}

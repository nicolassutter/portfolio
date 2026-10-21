import slugify from 'slugify'
import type { Post } from './content'

export function getPostSlug(post: Post) {
  return slugify(post.title, { lower: true })
}

export function getPostUrl(post: Post) {
  return `/blog/${getPostSlug(post)}/${post.id}`
}

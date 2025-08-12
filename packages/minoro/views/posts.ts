import { createSelectSchema } from 'drizzle-zod'
import { defineView, redirectToView } from 'minoro'
import { db, schema } from '../src/db/db'
import { z } from 'zod/v4'
import { eq } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { assetsId, assetsViewId } from './assets'

const PostSelect = createSelectSchema(schema.post).pick({
  id: true,
  title: true,
  status: true,
})
const PostDetails = z.object({
  ...createInsertSchema(schema.post).omit({ id: true }).shape,
})
const PostDetailsJson = z.toJSONSchema(
  z.object({ ...PostDetails.shape }).extend({
    // dates are not serializable as json
    dateCreated: z.int().nullish(),
    dateUpdated: z.int().nullish(),
  } satisfies Partial<Record<keyof z.infer<typeof PostDetails>, z.ZodType>>),
)

export const allPosts = defineView(
  { name: 'Posts', icon: 'lucide:file-text' },
  (view) => {
    view.defineButton({
      label: 'Create new post',
      action: () => redirectToView(postDetails, { postId: '' }),
      icon: 'lucide:plus',
      showToast: false,
    })

    view.defineDatatable({
      data: async () => {
        const posts = await db.query.post.findMany()
        return posts.map((post) => {
          return {
            ...post,
            content: post.content?.slice(0, 100) ?? '',
          }
        })
      },
      input: PostSelect,
      name: 'All posts',
      description: 'View all posts in the database',
      jsonSchema: z.toJSONSchema(z.object({ ...PostSelect.shape })),
      onRowClick: ({ fields }) =>
        redirectToView(postDetails, {
          postId: fields.id,
        }),
    })
  },
)

export const postDetails = defineView(
  {
    name: 'Post Details',
    icon: 'lucide:file-text',
    params: z.object({ postId: z.string().optional() }),
    hidden: true,
  },
  (view) => {
    view.defineForm({
      name: 'Details',
      input: PostDetails,
      jsonSchema: PostDetailsJson,
      async render() {
        const { postId } = view.getParams() ?? {}

        const post = postId
          ? await db.query.post.findFirst({
              where: (post, { eq }) => eq(post.id, postId),
            })
          : undefined

        return {
          defaultValues: post ?? {},
          fields: {
            content: {
              type: 'markdown',
            },
            excerpt: {
              type: 'markdown',
            },
            dateCreated: {
              type: 'date',
            },
            dateUpdated: {
              type: 'date',
            },
            thumbnail: {
              type: 'asset',
              fromGallery: assetsId,
              fromView: assetsViewId,
            },
          },
        }
      },
      async handler({ fields, params: { postId } }) {
        if (!postId) {
          // Create a new post
          await db.insert(schema.post).values({
            id: crypto.randomUUID(),
            ...fields,
          })
          return
        }

        // Update an existing post
        await db
          .update(schema.post)
          .set(fields)
          .where(eq(schema.post.id, postId))
      },
    })
    view.defineButton({
      label: 'Delete post',
      icon: 'lucide:trash',
      alert: {
        title: 'Delete post',
        content: 'Are you sure you want to delete this post?',
      },
      action: async () => {
        const { postId } = view.getParams() ?? {}
        if (!postId) return
        await db.delete(schema.post).where(eq(schema.post.id, postId))
        return redirectToView(allPosts, {})
      },
    })
  },
)

export const views = [allPosts, postDetails]

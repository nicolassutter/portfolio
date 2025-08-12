import { createInsertSchema } from 'drizzle-zod'
import { defineView, redirectToView } from 'minoro'
import { db, schema } from '../src/db/db'
import z from 'zod'
import { eq } from 'drizzle-orm'

const Profile = z
  .object({ ...createInsertSchema(schema.profile).shape })
  .omit({ id: true })

const profile = defineView(
  {
    name: 'Profile',
    icon: 'lucide:user',
  },
  (view) => {
    view.defineForm({
      name: 'Profile',
      input: Profile,
      jsonSchema: z.toJSONSchema(Profile),
      async render() {
        const existingData = await db.query.profile.findFirst()

        return {
          defaultValues: {
            ...existingData,
          },
          fields: {
            socials: {
              type: 'json',
            },
            bio: {
              type: 'markdown',
            },
          },
        }
      },
      async handler({ fields }) {
        const existingData = await db.query.profile.findFirst()

        if (existingData) {
          // Update existing data
          await db
            .update(schema.profile)
            .set({
              ...fields,
            })
            .where(eq(schema.profile.id, existingData.id))
        } else {
          // Insert new data
          await db.insert(schema.profile).values({
            ...fields,
            id: crypto.randomUUID(),
          })
        }
      },
    })
  },
)

const TechStack = z
  .object({
    ...createInsertSchema(schema.techStacks).shape,
  })
  .pick({
    id: true,
    name: true,
    emoji: true,
  })
const TechStackDetails = z
  .object({
    ...createInsertSchema(schema.techStacks).shape,
  })
  .omit({ id: true })

const allTechStacks = defineView(
  {
    name: 'All Tech Stacks',
    icon: 'lucide:cpu',
  },
  (view) => {
    view.defineButton({
      label: 'Add Tech Stack',
      icon: 'lucide:plus',
      action: () => redirectToView(techStackDetails, {}),
      showToast: false,
      type: 'link',
    })

    view.defineDatatable({
      name: 'Tech Stacks',
      input: TechStack,
      jsonSchema: z.toJSONSchema(TechStack),
      async data() {
        const techStacks = await db.query.techStacks.findMany({
          orderBy: (t, { desc }) => desc(t.name),
        })
        return techStacks
      },
      onRowClick: ({ fields }) =>
        redirectToView(techStackDetails, {
          techStackId: fields.id,
        }),
    })
  },
)

const techStackDetails = defineView(
  {
    name: 'Tech Stack Details',
    icon: 'lucide:cpu',
    params: z.object({ techStackId: z.string().optional() }),
    hidden: true,
  },
  (view) => {
    view.defineForm({
      name: 'Tech Stack Details',
      input: TechStackDetails,
      jsonSchema: z.toJSONSchema(TechStackDetails),
      async render() {
        const { techStackId } = view.getParams() ?? {}

        const existingData = techStackId
          ? await db.query.techStacks.findFirst({
              where: (t, { eq }) => eq(t.id, techStackId),
            })
          : undefined

        return {
          defaultValues: {
            ...existingData,
          },
          fields: {
            categories: {
              type: 'json',
            },
            description: {
              type: 'markdown',
            },
          },
        }
      },
      async handler({ fields, params: { techStackId } }) {
        if (!techStackId) {
          // Create a new tech stack
          await db.insert(schema.techStacks).values({
            ...fields,
            id: crypto.randomUUID(),
          })
          return
        }

        // Update an existing tech stack
        await db
          .update(schema.techStacks)
          .set({ ...fields })
          .where(eq(schema.techStacks.id, techStackId))
      },
    })

    view.defineButton({
      label: 'Delete Tech Stack',
      icon: 'lucide:trash',
      async action() {
        const { techStackId } = view.getParams() ?? {}
        if (!techStackId) return
        await db
          .delete(schema.techStacks)
          .where(eq(schema.techStacks.id, techStackId))
        return redirectToView(allTechStacks, {})
      },
      alert: {
        title: 'Delete Tech Stack',
        content: 'Are you sure you want to delete this tech stack?',
      },
      showToast: false,
      show: () => !!view.getParams()?.techStackId,
    })
  },
)

export const views = [profile, techStackDetails, allTechStacks]

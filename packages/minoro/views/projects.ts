import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { defineView, redirectToView } from 'minoro'
import { db, schema } from '../src/db/db'
import { z } from 'zod/v4'
import { eq } from 'drizzle-orm'
import { assetsId, assetsViewId } from './assets'

const ProjectSelect = createSelectSchema(schema.projects).pick({
  id: true,
  status: true,
  title: true,
})

const ProjectDetails = z
  .object({ ...createInsertSchema(schema.projects).shape })
  .omit({ id: true })

const ProjectDetailsJson = z.toJSONSchema(
  z.object({ ...ProjectDetails.shape }).extend({
    // dates are not serializable as json
    dateCreated: z.int().nullish(),
    dateUpdated: z.int().nullish(),
  } satisfies Partial<Record<keyof z.infer<typeof ProjectDetails>, z.ZodType>>),
)

export const allProjects = defineView(
  { name: 'Projects', icon: 'lucide:briefcase' },
  (view) => {
    view.defineButton({
      label: 'Create new project',
      action: () => redirectToView(projectDetails, { projectId: '' }),
      icon: 'lucide:plus',
      showToast: false,
    })

    view.defineDatatable({
      name: 'All Projects',
      data: async () => {
        const projects = await db.query.projects.findMany()
        return projects.map((p) => {
          return {
            ...p,
            description: p.description?.slice(0, 100) ?? '',
          }
        })
      },
      input: ProjectSelect,
      jsonSchema: z.toJSONSchema(z.object({ ...ProjectSelect.shape })),
      onRowClick: ({ fields }) =>
        redirectToView(projectDetails, {
          projectId: fields.id,
        }),
    })
  },
)

export const projectDetails = defineView(
  {
    name: 'Project details',
    params: z.object({ projectId: z.string().optional() }),
    hidden: true,
  },
  (view) => {
    view.defineForm({
      name: 'Project details',
      input: ProjectDetails,
      jsonSchema: ProjectDetailsJson,
      async render() {
        const { projectId } = view.getParams() ?? {}

        const project = projectId
          ? await db.query.projects.findFirst({
              where: (p, { eq }) => eq(p.id, projectId),
            })
          : undefined

        return {
          defaultValues: project,
          fields: {
            description: {
              type: 'markdown',
            },
            dateUpdated: {
              type: 'date',
            },
            dateCreated: {
              type: 'date',
            },
            thumbnail: {
              type: 'asset',
              fromGallery: assetsId,
              fromView: assetsViewId,
            },
            technologies: {
              type: 'json',
            },
          },
        }
      },
      async handler({ fields, params: { projectId } }) {
        if (!projectId) {
          // create a new project
          await db.insert(schema.projects).values({
            id: crypto.randomUUID(),
            ...fields,
          })
          return
        }

        await db
          .update(schema.projects)
          .set({ ...fields })
          .where(eq(schema.projects.id, projectId))
      },
    })
    view.defineButton({
      label: 'Delete project',
      icon: 'lucide:trash',
      alert: {
        title: 'Delete project',
        content: 'Are you sure you want to delete this project?',
      },
      action: async () => {
        const { projectId } = view.getParams() ?? {}
        if (!projectId) return
        await db
          .delete(schema.projects)
          .where(eq(schema.projects.id, projectId))
        return redirectToView(allProjects, {})
      },
    })
  },
)

export const views = [allProjects, projectDetails]

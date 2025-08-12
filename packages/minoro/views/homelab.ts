import { createSelectSchema } from 'drizzle-zod'
import { defineView, redirectToView } from 'minoro'
import { db, schema } from '../src/db/db'
import { z } from 'zod/v4'
import { eq } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'

const HomelabService = z
  .object({
    ...createSelectSchema(schema.homelabServices).shape,
  })
  .pick({
    id: true,
    name: true,
    why: true,
  })
const HomelabServiceDetails = z.object({
  ...createInsertSchema(schema.homelabServices).omit({ id: true }).shape,
})

const HomelabServiceCategory = z
  .object({
    ...createSelectSchema(schema.homelabServicesCategories).shape,
  })
  .pick({
    id: true,
    name: true,
  })
const HomelabServiceCategoryDetails = z.object({
  ...createInsertSchema(schema.homelabServicesCategories).omit({
    id: true,
  }).shape,
})

export const allHomelabServices = defineView(
  { name: 'Homelab Services', icon: 'lucide:server' },
  (view) => {
    view.defineButton({
      label: 'Create new service',
      action: () => redirectToView(homelabServiceDetails, { serviceId: '' }),
      icon: 'lucide:plus',
      showToast: false,
    })

    view.defineDatatable({
      name: 'All services',
      data: async () => {
        const services = await db.query.homelabServices.findMany()
        return services
      },
      input: HomelabService,
      jsonSchema: z.toJSONSchema(HomelabService),
      onRowClick: ({ fields }) =>
        redirectToView(homelabServiceDetails, {
          serviceId: fields.id,
        }),
    })
  },
)

export const homelabServiceDetails = defineView(
  {
    name: 'Edit a homelab service',
    params: z.object({ serviceId: z.string().min(1) }),
    hidden: true,
  },
  (view) => {
    view.defineForm({
      name: 'Details',
      input: HomelabServiceDetails,
      jsonSchema: z.toJSONSchema(HomelabServiceDetails),
      async render() {
        const { serviceId } = view.getParams() ?? {}

        const service = serviceId
          ? await db.query.homelabServices.findFirst({
              where: (p, { eq }) => eq(p.id, serviceId ?? ''),
            })
          : {}

        const categories = await db.query.homelabServicesCategories.findMany({
          columns: { id: true, name: true },
        })

        return {
          defaultValues: service ?? {},
          fields: {
            description: {
              type: 'markdown',
            },
            category: {
              type: 'enum',
              options: categories.map((c) => ({
                label: c.name ?? c.id,
                value: c.id,
              })),
            },
          },
        }
      },
      async handler({ fields, params: { serviceId } }) {
        if (!serviceId) {
          // If no serviceId is provided, create a new service
          await db.insert(schema.homelabServices).values({
            id: crypto.randomUUID(),
            ...fields,
          })
          return
        }
        await db
          .update(schema.homelabServices)
          .set(fields)
          .where(eq(schema.homelabServices.id, serviceId))
      },
    })

    view.defineButton({
      label: 'Delete service',
      icon: 'lucide:trash',
      alert: {
        title: 'Delete service',
        content: 'Are you sure you want to delete this service?',
      },
      action: async () => {
        const { serviceId } = view.getParams() ?? {}
        if (!serviceId) return
        await db
          .delete(schema.homelabServices)
          .where(eq(schema.homelabServices.id, serviceId))
        return redirectToView(allHomelabServices, {})
      },
    })
  },
)

export const homelabServicesCategories = defineView(
  {
    name: 'Homelab Services Categories',
    icon: 'lucide:tag',
  },
  (view) => {
    view.defineButton({
      label: 'Create new category',
      action: () =>
        redirectToView(homelabServiceCategoryDetails, { categoryId: '' }),
      icon: 'lucide:plus',
      showToast: false,
    })

    view.defineDatatable({
      name: 'All Categories',
      data: async () => {
        const categories = await db.query.homelabServicesCategories.findMany()
        return categories
      },
      input: HomelabServiceCategory,
      jsonSchema: z.toJSONSchema(HomelabServiceCategory),
      onRowClick: ({ fields }) =>
        redirectToView(homelabServiceCategoryDetails, {
          categoryId: fields.id,
        }),
    })
  },
)

export const homelabServiceCategoryDetails = defineView(
  {
    name: 'Edit a homelab service category',
    params: z.object({ categoryId: z.string().min(1) }),
    hidden: true,
  },
  (view) => {
    view.defineForm({
      name: 'Details',
      input: HomelabServiceCategoryDetails,
      jsonSchema: z.toJSONSchema(HomelabServiceCategoryDetails),
      async render() {
        const { categoryId } = view.getParams() ?? {}

        const category = categoryId
          ? await db.query.homelabServicesCategories.findFirst({
              where: (p, { eq }) => eq(p.id, categoryId ?? ''),
            })
          : {}

        return {
          defaultValues: category ?? {},
          fields: {
            description: {
              type: 'markdown',
            },
          },
        }
      },
      async handler({ fields, params: { categoryId } }) {
        if (!categoryId) {
          // If no categoryId is provided, create a new category
          await db.insert(schema.homelabServicesCategories).values({
            id: crypto.randomUUID(),
            ...fields,
          })
          return
        }

        await db
          .update(schema.homelabServicesCategories)
          .set(fields)
          .where(eq(schema.homelabServicesCategories.id, categoryId))
      },
    })

    view.defineButton({
      label: 'Delete category',
      icon: 'lucide:trash',
      alert: {
        title: 'Delete category',
        content: 'Are you sure you want to delete this category?',
      },
      action: async () => {
        const { categoryId } = view.getParams() ?? {}
        if (!categoryId) return
        await db
          .delete(schema.homelabServicesCategories)
          .where(eq(schema.homelabServicesCategories.id, categoryId))
        return redirectToView(homelabServicesCategories, {})
      },
    })
  },
)
const homelabDataSchema = z
  .object({
    ...createInsertSchema(schema.homelabData, {}).shape,
  })
  .omit({ id: true })

const homelabData = defineView(
  {
    name: 'Homelab Data',
    icon: 'lucide:database',
  },
  (view) => {
    view.defineForm({
      name: 'Homelab Data',
      input: homelabDataSchema,
      jsonSchema: z.toJSONSchema(homelabDataSchema),
      async render() {
        const existingData = await db.query.homelabData.findFirst()

        return {
          defaultValues: {
            ...existingData,
          },
          fields: {
            learnings: {
              type: 'json',
            },
          },
        }
      },
      async handler({ fields }) {
        const existingData = await db.query.homelabData.findFirst()

        if (existingData) {
          // Update existing data
          await db
            .update(schema.homelabData)
            .set({
              ...fields,
            })
            .where(eq(schema.homelabData.id, existingData.id))
        } else {
          // Insert new data
          await db.insert(schema.homelabData).values({
            id: crypto.randomUUID(),
            ...fields,
          })
        }
      },
    })
  },
)

export const views = [
  allHomelabServices,
  homelabServiceDetails,
  homelabServicesCategories,
  homelabServiceCategoryDetails,
  homelabData,
]

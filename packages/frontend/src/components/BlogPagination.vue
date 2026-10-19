<script setup lang="ts">
import { Pagination } from '@ark-ui/vue'
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import { cn } from '../modules/utils'

const props = defineProps<{
  count: number
  page: number
}>()

const triggersClasses = cn(
  `
      inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium
      transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
      disabled:pointer-events-none disabled:opacity-50 h-9 px-3 gap-1 pl-2.5
      hover:bg-neutral-100 hover:text-neutral-900

      data-[disabled]:bg-transparent data-[disabled]:text-neutral-500
      data-[disabled]:hover:bg-transparent data-[disabled]:hover:text-neutral-500
    `,
)

const itemsClasses = (page: number) => `
    inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium
    transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
    disabled:pointer-events-none disabled:opacity-50 h-9 w-9
    ${
      page === props.page
        ? 'bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90'
        : 'hover:bg-neutral-100 hover:text-neutral-900'
    }
  `

// ark-vue needs `as-child` to render the parts as anchors (the React/Svelte
// wrappers do it automatically for type="link")
</script>

<template>
  <Pagination.Root
    class="flex items-center justify-center gap-2"
    type="link"
    :page="page"
    :count="count"
    :page-size="10"
    :sibling-count="2"
    :get-page-url="(details) => `?p=${details.page}`"
  >
    <Pagination.Context v-slot="pagination">
      <Pagination.PrevTrigger as-child>
        <a
          :class="triggersClasses"
          :aria-disabled="pagination.previousPage === null ? 'true' : 'false'"
        >
          <ChevronLeft />
          Previous Page
        </a>
      </Pagination.PrevTrigger>

      <template
        v-for="(pageItem, index) in pagination.pages"
        :key="index"
      >
        <Pagination.Item
          v-if="pageItem.type === 'page'"
          :value="pageItem.value"
          as-child
        >
          <a :class="itemsClasses(pageItem.value)">
            {{ pageItem.value }}
          </a>
        </Pagination.Item>
        <Pagination.Ellipsis
          v-else
          :index="index"
          as-child
        >
          <div :class="itemsClasses(-1)">&#8230;</div>
        </Pagination.Ellipsis>
      </template>

      <Pagination.NextTrigger as-child>
        <a
          :class="triggersClasses"
          :aria-disabled="pagination.nextPage === null ? 'true' : 'false'"
        >
          Next Page
          <ChevronRight />
        </a>
      </Pagination.NextTrigger>
    </Pagination.Context>
  </Pagination.Root>
</template>

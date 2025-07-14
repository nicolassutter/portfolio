import { Pagination, usePagination } from '@ark-ui/solid/pagination'
import { For, type Component } from 'solid-js'
import ChevronLeftIcon from 'lucide-solid/icons/chevron-left'
import ChevronRightIcon from 'lucide-solid/icons/chevron-right'
import type { UnknownRecord } from 'type-fest'
import { cn } from '../modules/utils'

export const BlogPagination: Component<{
  count: number
  page: number
}> = (props) => {
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

  const pagination = usePagination(() => ({
    count: props.count,
    pageSize: 10,
    siblingCount: 2,
    page: props.page,
  }))

  return (
    <Pagination.RootProvider
      value={pagination}
      class='flex items-center justify-center gap-2'
    >
      <Pagination.PrevTrigger
        class={triggersClasses}
        aria-disabled={pagination().previousPage === null}
        asChild={(props) => (
          <a
            href={
              pagination().previousPage
                ? `?p=${pagination().previousPage ?? 1}`
                : undefined
            }
            {...(props() as UnknownRecord)}
          />
        )}
      >
        <ChevronLeftIcon class='' />
        Previous Page
      </Pagination.PrevTrigger>

      <Pagination.Context>
        {(api) => (
          <For each={api().pages}>
            {(page, index) =>
              page.type === 'page' ? (
                <Pagination.Item
                  class={itemsClasses(page.value)}
                  asChild={(props) => (
                    <a
                      href={`?p=${page.value}`}
                      {...(props() as UnknownRecord)}
                    />
                  )}
                  {...page}
                >
                  {page.value}
                </Pagination.Item>
              ) : (
                <Pagination.Ellipsis
                  class={itemsClasses(-1)}
                  index={index()}
                >
                  &#8230;
                </Pagination.Ellipsis>
              )
            }
          </For>
        )}
      </Pagination.Context>

      <Pagination.NextTrigger
        class={triggersClasses}
        aria-disabled={pagination().nextPage === null}
        asChild={(props) => (
          <a
            href={
              pagination().nextPage
                ? `?p=${pagination().nextPage ?? 1}`
                : undefined
            }
            {...(props() as UnknownRecord)}
          />
        )}
      >
        Next Page
        <ChevronRightIcon class='' />
      </Pagination.NextTrigger>
    </Pagination.RootProvider>
  )
}

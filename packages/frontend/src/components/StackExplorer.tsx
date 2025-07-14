import { createMemo, Show } from 'solid-js'
import { For } from 'solid-js'
import { createSignal } from 'solid-js'
import { Typography } from './Typography'
import ChevronDownIcon from 'lucide-solid/icons/chevron-down'
import type { Component } from 'solid-js'
import type { TechStack } from '../modules/requests'
import { Badge } from './Buttons'

export const StackExplorer: Component<{
  techStacks: TechStack[]
}> = (props) => {
  const [selectedStack, setSelectedStack] = createSignal<string>('')
  const defaultSelectedStack = () => props.techStacks[0]?.name ?? ''

  const stacksByName = createMemo(() => {
    return props.techStacks.reduce(
      (acc, stack) => {
        if (!stack.name) return acc
        acc[stack.name] = stack
        return acc
      },
      {} as Record<string, TechStack>,
    )
  })

  const currentStack = () =>
    stacksByName()[selectedStack() || defaultSelectedStack()] ?? null

  return (
    <section>
      {/* Project Type Selector */}
      <div class='max-w-2xl mb-8'>
        <div class='relative'>
          <select
            value={selectedStack() || defaultSelectedStack()}
            onChange={(e) => setSelectedStack(e.target.value)}
            class='cursor-pointer flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
          >
            <For each={props.techStacks}>
              {(stack) => (
                <option value={stack.name ?? ''}>
                  {stack.emoji} {stack.name}
                </option>
              )}
            </For>
          </select>

          <div
            aria-hidden={true}
            class='absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none'
          >
            <ChevronDownIcon class='h-4 w-4' />
          </div>
        </div>
      </div>

      {/* Technology Stack Display */}
      <Show when={currentStack()}>
        <div class='mx-auto'>
          {/* Stack Header */}
          <div class='flex items-center gap-4 mb-4'>
            <span class='text-4xl'>{currentStack()?.emoji}</span>

            <div>
              <Typography.h2 class={`text-primary`}>
                {currentStack()?.name}
              </Typography.h2>

              <p class=''>{currentStack()?.description}</p>
            </div>
          </div>

          {/* Technology Categories */}
          <div class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8'>
            <For each={Object.entries(currentStack()?.categories ?? {})}>
              {([category, technologies]) => (
                <div class='bg-card text-card-foreground flex flex-col gap-3 rounded-xl border border-border p-6'>
                  <Typography.h3 class='flex items-center gap-2'>
                    <div
                      class='size-2 bg-primary rounded-full'
                      aria-hidden='true'
                    />
                    {category}
                  </Typography.h3>

                  <div class='flex flex-wrap gap-2'>
                    <For each={technologies}>
                      {(tech) => <Badge>{tech}</Badge>}
                    </For>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      </Show>
    </section>
  )
}

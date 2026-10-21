<script setup lang="ts">
import { ChevronDownIcon } from '@lucide/vue'
import type { TechStack } from '../modules/content'

defineProps<{
  techStacks: TechStack[]
}>()
</script>

<template>
  <section class="border-y border-border divide-y divide-border">
    <details
      v-for="(stack, index) in techStacks"
      :key="stack.id"
      :open="index === 0"
      class="group py-5"
    >
      <summary
        class="grid cursor-pointer list-none gap-2 [&::-webkit-details-marker]:hidden md:grid-cols-[minmax(12rem,0.7fr)_minmax(0,1fr)] md:gap-8"
      >
        <div>
          <h3 class="text-lg font-semibold text-foreground">
            {{ stack.name }}
          </h3>
          <p class="mt-1 text-sm text-foreground/75">{{ stack.description }}</p>
        </div>

        <div
          class="ml-auto flex w-max items-center gap-2 self-center text-sm font-medium text-primary"
        >
          <span class="group-open:hidden">View technologies</span>
          <span class="hidden group-open:inline">Hide technologies</span>
          <ChevronDownIcon
            class="size-4 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </div>
      </summary>

      <dl
        class="mt-5 grid gap-x-8 gap-y-4 border-t border-border pt-5 md:grid-cols-2"
      >
        <div
          v-for="[category, technologies] in Object.entries(
            stack.categories ?? {},
          )"
          :key="category"
          class="grid gap-1"
        >
          <dt
            class="text-xs font-medium uppercase tracking-wider text-muted-foreground"
          >
            {{ category }}
          </dt>
          <dd class="text-sm text-foreground/80">
            {{ technologies.join(', ') }}
          </dd>
        </div>
      </dl>
    </details>
  </section>
</template>

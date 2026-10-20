<script setup lang="ts">
import type { TechStack } from '../modules/requests'

defineProps<{
  techStacks: TechStack[]
}>()
</script>

<template>
  <section class="border-y border-border divide-y divide-border">
    <article
      v-for="stack in techStacks"
      :key="stack.id"
      class="grid gap-4 py-5 md:grid-cols-[minmax(12rem,0.7fr)_minmax(0,1fr)] md:gap-8"
    >
      <div>
        <h3 class="text-lg font-semibold text-foreground">{{ stack.name }}</h3>
        <p class="mt-1 text-sm text-foreground/75">{{ stack.description }}</p>
      </div>

      <dl class="flex flex-wrap content-start gap-x-6 gap-y-3">
        <div
          v-for="[category, technologies] in Object.entries(
            stack.categories ?? {},
          )"
          :key="category"
          class="flex items-baseline gap-2"
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
    </article>
  </section>
</template>

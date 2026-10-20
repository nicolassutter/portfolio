<script setup lang="ts">
import { ExternalLinkIcon } from '@lucide/vue'
import { MINORO_URL } from 'astro:env/client'
import Typography from './Typography.vue'
import Badge from './Badge.vue'
import Button from './Button.vue'
import { cn } from '../modules/utils'
import type { Project } from '../modules/requests'

defineProps<{
  project: Project
  class?: string | undefined
}>()
</script>

<template>
  <article
    :class="
      cn(
        'glass-surface relative p-4 text-card-foreground rounded-xl py-6 focus-within:ring-1 focus-within:ring-ring group flex flex-col gap-3',
        $props.class,
      )
    "
  >
    <img
      v-if="typeof project.thumbnail === 'string'"
      :src="`${MINORO_URL}/assets/${project.thumbnail}`"
      alt=""
      class="rounded-lg mb-2 w-full aspect-video object-cover"
    />

    <Typography
      tag="h3"
      class="group-hover:text-primary"
    >
      {{ project.title }}
    </Typography>

    <!-- tags for used technologies -->
    <div>
      <p class="sr-only">Technologies used:</p>
      <ul class="flex flex-wrap gap-1.5">
        <li
          v-for="tech in project.technologies"
          :key="tech"
        >
          <Badge>{{ tech }}</Badge>
        </li>
      </ul>
    </div>

    <div
      v-if="project.description"
      class="mt-2 text-muted-foreground"
      v-html="project.description"
    />

    <div
      v-if="project.link"
      class="mt-auto"
    >
      <Button
        as="a"
        :href="project.link"
        variant="primary"
        target="_blank"
        rel="noopener noreferrer"
        class="group/btn"
      >
        See it live
        <span class="sr-only">in a new browser tab</span>
        <ExternalLinkIcon
          class="group-hover/btn:ml-2 transition-[margin-left] will-change-[margin-left]"
          aria-hidden="true"
        />
      </Button>
    </div>
  </article>
</template>

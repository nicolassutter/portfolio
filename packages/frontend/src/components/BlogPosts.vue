<script setup lang="ts">
import slugify from 'slugify'
import { MINORO_URL } from 'astro:env/client'
import Button from './Button.vue'
import { cn } from '../modules/utils'
import type { Post } from '../modules/requests'

defineProps<{
  post: Post
  class?: string | undefined
}>()

// mirrors of the pre-migration `Typography` inline classes —
// a Vue island can't import the old components
const typographyH3 = 'text-2xl font-semibold text-foreground'
const typographyP = 'text-base'
</script>

<template>
  <article
    :class="
      cn(
        'relative p-4 bg-card text-card-foreground rounded-xl border border-border py-6 focus-within:ring-1 focus-within:ring-ring group grid gap-3 content-start',
        $props.class,
      )
    "
  >
    <img
      v-if="post.thumbnail"
      :src="`${MINORO_URL}/assets/${post.thumbnail}`"
      alt=""
      class="rounded-lg w-full aspect-video object-cover"
    />

    <h3 :class="cn(typographyH3, 'group-hover:text-primary')">
      {{ post.title }}
    </h3>
    <p :class="cn(typographyP, 'text-muted-foreground')">
      {{ post.excerpt }}
    </p>

    <Button
      as="a"
      :href="`/blog/${slugify(post.title!, { lower: true })}/${post.id}`"
      class="before:absolute before:inset-0 h-0 w-0 block opacity-0 p-0"
    >
      Read
    </Button>
  </article>
</template>

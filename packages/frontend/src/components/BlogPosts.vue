<script setup lang="ts">
import Button from './Button.vue'
import { cn } from '../modules/utils'
import type { Post } from '../modules/content'
import { getPostUrl } from '../modules/posts'
import Typography from '../components/Typography.vue'

defineProps<{
  post: Post
  class?: string | undefined
}>()
</script>

<template>
  <article :class="cn(
    'relative p-4 bg-card text-card-foreground rounded-xl border border-border py-6 focus-within:ring-1 focus-within:ring-ring group grid gap-3 content-start',
    $props.class,
  )
    ">
    <img v-if="post.thumbnail" :src="post.thumbnail" alt="" class="rounded-lg w-full aspect-video object-cover" />

    <Typography tag="h3" class="group-hover:text-primary">
      {{ post.title }}
    </Typography>

    <Typography class="text-muted-foreground">
      {{ post.excerpt }}
    </Typography>

    <Button as="a" :href="getPostUrl(post)" class="sr-only">
      Read
    </Button>
  </article>
</template>

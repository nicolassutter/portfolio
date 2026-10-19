<script setup lang="ts">
import { cn } from '../modules/utils'

const variants = {
  h1: 'text-4xl font-bold text-foreground',
  h2: 'text-3xl font-semibold text-foreground',
  h3: 'text-2xl font-semibold text-foreground',
  p: 'text-base',
} as const

const props = withDefaults(
  defineProps<{ tag?: keyof typeof variants; class?: string | undefined }>(),
  {
    tag: 'p',
  },
)
</script>

<template>
  <component
    :is="props.tag"
    :class="cn(variants[props.tag], $props.class)"
  >
    <slot />
  </component>
</template>

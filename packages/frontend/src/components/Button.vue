<script setup lang="ts">
import { cn } from '../modules/utils'

defineProps<{
  as?: string
  class?: string | undefined
  variant?: 'default' | 'primary' | 'muted'
}>()

const variants = {
  default:
    'py-2 px-4 rounded-full hover:bg-muted transition-colors duration-200',
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/70 transition-colors duration-200 py-2 px-4 rounded-full',
  muted:
    'bg-muted text-foreground/80 hover:bg-muted/70 transition-colors duration-200 py-2 px-4 rounded-full',
}
</script>

<template>
  <component
    :is="$props.as ?? 'button'"
    :class="
      cn(
        variants[$props.variant ?? 'default'],
        'cursor-pointer inline-flex gap-2 items-center [&_:where(svg)]:size-[1em]',
        $props.class,
      )
    "
  >
    <slot />
  </component>
</template>

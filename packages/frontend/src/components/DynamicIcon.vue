<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  /**
   * Iconify icon in the format 'iconset:icon-name'
   * @example 'lucide:home'
   */
  icon: string
  /**
   * Optional URL to the icon image.
   * @example 'https://example.com/icon.svg'
   */
  url?: string
  class?: string | undefined
}>()

// fake regex match for the URL case, like the pre-migration original
const match = computed(() =>
  props.url
    ? { groups: {} as Record<string, string | undefined> }
    : props.icon.match(/^(?<iconPack>[\w-]+):(?<iconName>[\w-]+)$/),
)

const iconUrl = computed(() => {
  if (props.url) {
    return `url('${props.url}')`
  }
  const { iconPack, iconName } = match.value?.groups || {}
  if (!iconPack || !iconName) {
    return undefined
  }
  return `url('https://api.iconify.design/${iconPack}/${iconName}.svg')`
})
</script>

<template>
  <span
    v-if="iconUrl"
    class="mask-icon"
    :style="{ '--icon': iconUrl }"
  />
</template>

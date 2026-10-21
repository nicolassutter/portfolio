<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  content: string
}>()

const expanded = ref(false)
</script>

<template>
  <div>
    <div
      id="profile-bio"
      :class="[
        'bio prose max-w-none text-foreground/85 leading-relaxed',
        { 'bio--collapsed': !expanded },
      ]"
      v-html="content"
    />

    <button
      type="button"
      class="mt-3 text-sm font-medium text-primary hover:underline"
      aria-controls="profile-bio"
      :aria-expanded="expanded"
      @click="expanded = !expanded"
    >
      {{ expanded ? 'Show less' : 'Read full bio' }}
    </button>
  </div>
</template>

<style scoped>
.bio--collapsed {
  position: relative;
  max-height: 10.5rem;
  overflow: hidden;
}

.bio--collapsed::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 3rem;
  content: '';
  background: linear-gradient(transparent, var(--card));
}
</style>

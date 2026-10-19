<script setup lang="ts">
import DynamicIcon from './DynamicIcon.vue'
import type { getHomelabServices } from '../modules/requests'

defineProps<{
  services: Awaited<ReturnType<typeof getHomelabServices>>
}>()
</script>

<template>
  <section>
    <h2 class="text-3xl font-bold mb-8 flex items-center gap-3">
      <svg
        class="w-7 h-7 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <ellipse
          cx="12"
          cy="5"
          rx="9"
          ry="3"
        />
        <path d="m3 5 9 9 9-9" />
        <path d="m3 12 9 9 9-9" />
        <path d="m3 5v14c0 3 4.5 4 9 4s9-1 9-4V5" />
      </svg>
      Services &amp; Applications
    </h2>
    <div class="grid gap-8">
      <div
        v-for="[categoryName, { services, icon }] in Object.entries(services)"
        :key="categoryName"
        class="bg-card border border-border rounded-lg p-6"
      >
        <h3
          class="text-xl font-semibold mb-4 text-primary flex items-center gap-2"
        >
          <DynamicIcon :icon="icon" />
          {{ categoryName }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="service in services"
            :key="service.id"
            class="bg-muted rounded-lg p-4"
          >
            <h4 class="font-semibold mb-2">{{ service.name }}</h4>
            <p class="text-base text-muted-foreground mb-3">
              {{ service.description }}
            </p>
            <div class="text-base text-primary">Why: {{ service.why }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ChevronDown } from '@lucide/vue'
import Badge from './Badge.vue'
import type { TechStack } from '../modules/requests'

const props = defineProps<{
  techStacks: TechStack[]
}>()

const selectedStack = ref('')

const defaultSelectedStack = computed(() => props.techStacks[0]?.name ?? '')

const stacksByName = computed(() =>
  props.techStacks.reduce<Record<string, TechStack>>((acc, stack) => {
    if (!stack.name) return acc
    acc[stack.name] = stack
    return acc
  }, {}),
)

const currentValue = computed(
  () => selectedStack.value || defaultSelectedStack.value,
)

const currentStack = computed(
  () => stacksByName.value[currentValue.value] ?? null,
)

const stackCategories = computed(() =>
  currentStack.value ? Object.entries(currentStack.value.categories ?? {}) : [],
)

function onStackChange(event: Event) {
  selectedStack.value = (event.target as HTMLSelectElement).value
}
</script>

<template>
  <section>
    <!-- Project Type Selector -->
    <div class="max-w-2xl mb-8">
      <div class="relative">
        <select
          :value="currentValue"
          class="cursor-pointer flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
          @change="onStackChange"
        >
          <option
            v-for="stack in props.techStacks"
            :key="stack.id"
            :value="stack.name ?? ''"
          >
            {{ stack.emoji }} {{ stack.name }}
          </option>
        </select>

        <div
          aria-hidden="true"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
        >
          <ChevronDown class="h-4 w-4" />
        </div>
      </div>
    </div>

    <!-- Technology Stack Display -->
    <div
      v-if="currentStack"
      class="mx-auto"
    >
      <!-- Stack Header -->
      <div class="flex items-center gap-4 mb-4">
        <span class="text-4xl">{{ currentStack.emoji }}</span>

        <div>
          <h2 class="text-3xl font-semibold text-primary">
            {{ currentStack.name }}
          </h2>

          <p class="">{{ currentStack.description }}</p>
        </div>
      </div>

      <!-- Technology Categories -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div
          v-for="[category, technologies] in stackCategories"
          :key="category"
          class="bg-card text-card-foreground flex flex-col gap-3 rounded-xl border border-border p-6"
        >
          <h3
            class="text-2xl font-semibold text-foreground flex items-center gap-2"
          >
            <div
              class="size-2 bg-primary rounded-full"
              aria-hidden="true"
            />
            {{ category }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <Badge
              v-for="(tech, index) in technologies"
              :key="index"
            >
              {{ tech }}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

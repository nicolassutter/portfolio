<script setup lang="ts">
import type { getHomelabData } from '../modules/content'

defineProps<{
  learnings: Awaited<ReturnType<typeof getHomelabData>>['learnings']
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
        <rect
          width="20"
          height="14"
          x="2"
          y="3"
          rx="2"
        />
        <line
          x1="8"
          x2="16"
          y1="21"
          y2="21"
        />
        <line
          x1="12"
          x2="12"
          y1="17"
          y2="21"
        />
      </svg>
      What I've Learned
    </h2>
    <div class="bg-card border border-border rounded-lg p-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-xl font-semibold mb-4 text-primary">
            Technical Skills
          </h3>
          <ul class="grid gap-3">
            <li
              v-for="(skill, index) in learnings?.technicalSkills"
              :key="index"
              class="flex items-center gap-3 before:content-[''] before:size-2 before:bg-primary before:rounded-full"
            >
              <span>{{ skill.text }}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-4 text-primary">Key Lessons</h3>

          <ul class="grid gap-3">
            <li
              v-for="(lesson, index) in learnings?.keyLessons"
              :key="index"
            >
              <h4 class="font-semibold mb-1">{{ lesson.title }}</h4>
              <p class="text-base text-muted-foreground">
                {{ lesson.description }}
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-border">
        <h3 class="text-xl font-semibold mb-4 text-primary">
          Architecture Evolution
        </h3>
        <ol class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <li
            v-for="(phase, index) in learnings?.architecturePhases"
            :key="index"
            class="bg-muted rounded-lg p-4"
          >
            <h4 class="font-semibold mb-2">{{ phase.title }}</h4>
            <p class="text-muted-foreground">{{ phase.description }}</p>
          </li>
        </ol>
      </div>

      <div class="mt-8 pt-8 border-t border-border">
        <h3 class="text-xl font-semibold mb-4 text-primary">
          Biggest Challenges Overcome
        </h3>
        <ul class="grid gap-4">
          <li
            v-for="(challenge, index) in learnings?.biggestChallenges"
            :key="index"
            class="flex gap-4"
          >
            <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
            <div>
              <h4 class="font-semibold mb-1">{{ challenge.title }}</h4>
              <p class="text-muted-foreground">{{ challenge.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

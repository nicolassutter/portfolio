<script setup lang="ts">
import { BlocksIcon } from '@lucide/vue'
</script>

<template>
  <section class="grid gap-8">
    <h2 class="text-3xl font-bold flex items-center gap-4">
      <BlocksIcon class="text-primary" />
      Architecture &amp; Design Decisions
    </h2>

    <p class="leading-relaxed max-w-4xl">
      I have two homelabs: one at home and one hosted on Hetzner. My home server
      runs everything for my media server, personal projects, and development
      environment. The Hetzner server is used for more critical services, like
      my Immich (photo management), Nextcloud (cloud storage) and Vaultwarden
      (password management) instances, which need higher availability, say in
      the case of if my cat decides to chew through my fiber cable... 🐈
    </p>

    <div class="relative w-full aspect-video rounded-lg overflow-hidden">
      <div
        aria-hidden="true"
        class="absolute z-0 bg-muted flex items-center justify-center w-full h-full"
      >
        <p class="text-muted-foreground">Figjam board loading...</p>
      </div>
      <iframe
        style="border: 1px solid rgba(0, 0, 0, 0.1)"
        width="800"
        height="450"
        title="Homelab Architecture Overview"
        allowfullscreen
        class="size-full relative z-1"
        src="https://embed.figma.com/board/XYMrshniyKxFbrEWydQP2o/homebox-and-vps-architecture?node-id=0-1&embed-host=share"
      />
    </div>
  </section>
</template>

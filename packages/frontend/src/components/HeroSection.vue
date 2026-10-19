<script setup lang="ts">
import { ServerIcon } from '@lucide/vue'
</script>

<template>
  <section class="grid gap-8">
    <h1 class="text-4xl font-bold flex items-center gap-4">
      <ServerIcon
        class="text-primary"
        aria-hidden="true"
      />
      My Homelab Journey
    </h1>

    <p class="text-lg max-w-4xl leading-relaxed">
      My homelab is more than just a collection of servers, it's my personal
      playground for learning, experimenting, and hosting the services I rely on
      daily. What started as a single Raspberry Pi has evolved into a robust
      infrastructure that teaches me about distributed systems, DevOps
      practices, and infrastructure management.
    </p>

    <div class="bg-card border border-border rounded-lg p-6">
      <h3 class="text-xl font-semibold mb-4">Philosophy</h3>
      <p class="leading-relaxed max-w-4xl">
        I believe in <strong class="text-foreground">self-hosting</strong> for
        privacy, learning, and control. Every service I run teaches me something
        new about networking, security, or system administration.
      </p>
    </div>
  </section>
</template>

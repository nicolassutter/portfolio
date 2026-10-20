<script setup lang="ts">
import { ref, onMounted, useId, useTemplateRef } from 'vue'
import { Moon, Sun, Monitor, Menu, X } from '@lucide/vue'
import Button from './Button.vue'
import { useTheme } from '../modules/theme'

const { theme, setTheme } = useTheme()

const iconClasses =
  'h-6 w-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'

const isMobileMenuOpen = ref(false)
const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})

const links = [
  { href: '/', label: 'home' },
  { href: '/projects', label: 'projects' },
  { href: '/blog', label: 'blog' },
  { href: '/homelab', label: 'Homelab' },
]

const dialogId = useId()
const dialogRef = useTemplateRef<HTMLDialogElement>('dialog')
const dialogContainerRef = useTemplateRef<HTMLDivElement>('dialog-container')

function toggleTheme() {
  setTheme(theme.value === 'dark' ? 'light' : 'dark')
}

function openMobileMenu() {
  isMobileMenuOpen.value = true
  dialogRef.value?.showModal()
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
  dialogRef.value?.close()
}

// Handle dialog close event (including ESC key)
function handleDialogClose() {
  isMobileMenuOpen.value = false
}

// Handle backdrop click
function handleDialogClick(event: MouseEvent) {
  const path = event.composedPath()
  const isInDialog = dialogContainerRef.value
    ? path.includes(dialogContainerRef.value)
    : false
  if (!isInDialog) {
    closeMobileMenu()
  }
}
</script>

<template>
  <header
    aria-label="Navigation"
    role="navigation"
    class="fixed z-30 w-full top-2 lg:top-4 xl:top-6 left-0 grid grid-cols-(--default-content-grid) [:where(&>*)]:col-start-2 text-foreground"
  >
    <div
      class="glass-surface relative flex items-center justify-end py-2 px-6 rounded-full md:max-w-md md:justify-start mx-auto"
    >
      <!-- Desktop Navigation -->
      <nav
        class="hidden items-center gap-6 md:flex"
        aria-label="Main navigation"
        role="navigation"
      >
        <div
          v-for="link in links"
          :key="link.href"
          class="relative"
        >
          <a
            :href="link.href"
            class="inline-block ease-in-out text-sm font-medium capitalize transition-colors duration-200 relative py-1 px-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:text-primary"
          >
            {{ link.label }}
          </a>
        </div>
      </nav>

      <div class="flex items-center gap-2 md:ml-6">
        <!-- Mobile Menu Button -->
        <Button
          type="button"
          class="md:hidden p-3"
          :aria-label="
            isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'
          "
          :aria-expanded="isMobileMenuOpen"
          :aria-controls="dialogId"
          @click="openMobileMenu"
        >
          <Menu
            v-if="!isMobileMenuOpen"
            class="size-6"
          />
          <X
            v-else
            class="size-6"
          />
        </Button>

        <!-- reserve the height for the toggle -->
        <div class="size-10">
          <Button
            v-if="mounted"
            type="button"
            class="glass-surface size-full relative rounded-full p-0"
            :title="`Toggle theme, current theme: ${theme}`"
            :aria-label="`Toggle theme, current theme: ${theme}`"
            @click="toggleTheme"
          >
            <!-- the button doesn't take any space with position absolute
            that way it doesn't affect the layout of the header when the client hydrates -->
            <Sun
              v-if="theme === 'dark'"
              :class="iconClasses"
            />
            <Moon
              v-else-if="theme === 'light'"
              :class="iconClasses"
            />
            <Monitor
              v-else-if="theme === 'system'"
              :class="iconClasses"
            />
          </Button>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile Menu Dialog -->
  <dialog
    ref="dialog"
    :id="dialogId"
    class="md:hidden backdrop:bg-background/80 backdrop:backdrop-blur-sm bg-transparent p-0 m-0 max-w-none max-h-none size-full border-0 outline-0"
    aria-label="Mobile navigation menu"
    @close="handleDialogClose"
    @click="handleDialogClick"
  >
    <!-- Menu positioned at top -->
    <div
      ref="dialog-container"
      class="fixed top-12 left-4 right-4 z-50"
    >
      <nav
        class="glass-surface flex flex-col gap-1 rounded-2xl p-4"
        aria-label="Mobile navigation"
        role="navigation"
      >
        <!-- Close button at the top of the menu -->
        <div class="flex justify-end mb-2">
          <Button
            type="button"
            class="p-2"
            aria-label="Close mobile menu"
            title="Close menu"
            @click="closeMobileMenu"
          >
            <X />
          </Button>
        </div>

        <a
          v-for="(link, index) in links"
          :key="link.href"
          :href="link.href"
          :autofocus="index === 0"
          class="block px-4 py-3 text-sm font-medium capitalize transition-colors duration-200 rounded-lg hover:bg-muted hover:text-primary text-foreground"
          @click="closeMobileMenu"
        >
          {{ link.label }}
        </a>
      </nav>
    </div>
  </dialog>
</template>

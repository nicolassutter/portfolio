import { createGlobalState, usePreferredDark, useStorage } from '@vueuse/core'
import { watch } from 'vue'

// key and default must match public/theme.vanilla.js (window.themeKey/defaultTheme),
// echoed literally because that file doesn't run during SSR
const key = import.meta.env.SSR ? 'theme' : window.themeKey
const defaultTheme = import.meta.env.SSR ? 'system' : window.defaultTheme

export const useTheme = createGlobalState(() => {
  const theme = useStorage<Theme>(key, defaultTheme)
  const prefersDark = usePreferredDark()

  watch(theme, (value) => window.applyTheme(value))

  // while on 'system', a live OS theme flip must re-apply immediately
  watch([theme, prefersDark], ([value]) => {
    if (value === 'system') window.applyTheme(value)
  })

  return {
    theme,
    setTheme: (value: Theme) => (theme.value = value),
  }
})

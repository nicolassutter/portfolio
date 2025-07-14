declare global {
  type Theme = 'light' | 'dark' | 'system'

  interface Window {
    defaultTheme: Theme
    themeKey: string
    getSystemTheme: () => Exclude<Theme, 'system'>
    applyTheme: (theme: Theme) => void
  }
}

export {}

// @ts-check

/**
 * This script is in vanilla JavaScript to ensure it can be used without modules so it loads early in the page lifecycle.
 * It is not processed by Astro or Vite.
 */

window.defaultTheme = 'system'
window.themeKey = 'theme'

window.getSystemTheme = function () {
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
  return darkQuery.matches ? 'dark' : 'light'
}

/**
 * Applies the given theme to the document.
 * @param {Theme} theme - The theme to apply.
 */
window.applyTheme = function (theme) {
  document.documentElement.dataset.theme =
    theme === 'system' ? window.getSystemTheme() : theme
}

document.addEventListener('DOMContentLoaded', () => {
  // Apply the initial theme based on the user's preference or system setting

  const savedTheme =
    localStorage.getItem(window.themeKey) || window.defaultTheme

  // @ts-expect-error type string is not assignable to type Theme
  window.applyTheme(savedTheme)
})

import { createEffect, createSignal } from 'solid-js'
import { isServer } from 'solid-js/web'
import type { Accessor } from 'solid-js'
import { createSingletonRoot } from '@solid-primitives/rootless'

export function useLocalStorage<T extends string>(
  key: string,
  initialValue: T,
): [Accessor<T>, (value: T) => void] {
  const storage = isServer ? null : localStorage

  const storedValue = storage?.getItem(key) ?? initialValue
  const [state, setState] = createSignal(storedValue as T)

  createEffect(() => {
    storage?.setItem(key, state())
  })

  return [state, setState]
}

export const useTheme = createSingletonRoot(() => {
  const [theme, setTheme] = useLocalStorage<Theme>(
    window.themeKey,
    window.defaultTheme,
  )

  createEffect(() => {
    window.applyTheme(theme())
  })

  return {
    theme,
    setTheme,
  }
})

import { splitProps, type ParentComponent, type JSX } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { cn } from '../modules/utils'
import type { EmptyObject } from 'type-fest'

function createTypographyComponent<T extends EmptyObject>(
  tag: string,
  className: string,
): ParentComponent<T & JSX.HTMLAttributes<any>> {
  return (props) => {
    const [picked, rest] = splitProps(props, ['children'])

    return (
      <Dynamic
        {...rest}
        component={tag}
        class={cn(className, 'class' in rest ? (rest.class as string) : '')}
      >
        {picked.children}
      </Dynamic>
    )
  }
}

export const Typography = {
  h1: createTypographyComponent('h1', 'text-4xl font-bold text-foreground'),
  h2: createTypographyComponent('h2', 'text-3xl font-semibold text-foreground'),
  h3: createTypographyComponent('h3', 'text-2xl font-semibold text-foreground'),
  p: createTypographyComponent('p', 'text-base'),
}

import { splitProps } from 'solid-js'
import { type ParentComponent } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { cn } from '../modules/utils'
import type { JSX } from 'solid-js'

export const Badge: ParentComponent = (props) => {
  return (
    <span class='px-3 py-1 backdrop-blur-sm border border-border rounded-full text-sm bg-secondary/80 hover:bg-secondary/40 transition-all duration-200 cursor-default'>
      {props.children}
    </span>
  )
}

const variants = {
  default:
    'py-2 px-4 rounded-full hover:bg-muted transition-colors duration-200',
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/70 transition-colors duration-200 py-2 px-4 rounded-full',
  muted:
    'bg-muted text-foreground/80 hover:bg-muted/70 transition-colors duration-200 py-2 px-4 rounded-full',
}

export const Button: ParentComponent<
  {
    as?: string
    class?: string
    variant?: keyof typeof variants
  } & JSX.AnchorHTMLAttributes<any>
> = (props) => {
  const [local, rest] = splitProps(props, [
    'class',
    'variant',
    'as',
    'children',
  ])

  const variantClass = () => variants[local.variant ?? 'default']

  return (
    <Dynamic
      component={local.as ?? 'button'}
      {...rest}
      class={cn(
        variantClass(),
        'cursor-pointer inline-flex gap-2 items-center [&_:where(svg)]:size-[1em]',
        local.class,
      )}
    >
      {local.children}
    </Dynamic>
  )
}

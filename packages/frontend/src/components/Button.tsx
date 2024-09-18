import type { ParentComponent, ValidComponent } from 'solid-js'
import { Dynamic } from 'solid-js/web'

export const Button: ParentComponent<{
  tag: ValidComponent
  class?: string
  [key: string]: unknown
}> = (props) => {
  return (
    <Dynamic
      {...props}
      classList={{
        [props.class as string]: props.class,
        ['px-4 bg-white hover:bg-opacity-80 transition-colors py-3 rounded-lg font-bold text-gray-800 text-center justify-center items-center gap-3 flex max-w-[max-content] text-sm']:
          true,
      }}
      component={props.tag}
    >
      {props.children}
    </Dynamic>
  )
}

import { Show } from 'solid-js'

export const DynamicIcon = (props: {
  /**
   * Iconify icon in the format 'iconset:icon-name'
   * @example 'lucide:home'
   */
  icon: string
  /**
   * Optional URL to the icon image.
   * @example 'https://example.com/icon.svg'
   */
  url?: string
  class?: string
}) => {
  const matches = () =>
    props.url
      ? { groups: {} as Record<string, string | undefined> } // fake regex match for URL case
      : props.icon.match(/^(?<iconPack>[\w-]+):(?<iconName>[\w-]+)$/)

  return (
    <Show when={matches()}>
      {(match) => {
        const { iconPack, iconName } = match().groups || {}

        return (
          <span
            style={{
              '--icon': props.url
                ? `url('${props.url}')`
                : `url('https://api.iconify.design/${iconPack}/${iconName}.svg')`,
            }}
            class='mask-icon'
          />
        )
      }}
    </Show>
  )
}

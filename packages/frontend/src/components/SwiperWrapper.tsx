import { splitProps, type ParentComponent, onMount } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import type { SwiperOptions } from 'swiper/types'
import { A11y } from 'swiper/modules'
import type { SwiperContainer } from 'swiper/element'

export const SwiperWrapper: ParentComponent<{
  config: SwiperOptions
  ariaDescribedBy?: string
  [key: string]: unknown
}> = (props) => {
  let swiperContainer: SwiperContainer | undefined
  const [localProps, others] = splitProps(props, ['config', 'ariaDescribedBy'])

  const swiperConfig: SwiperOptions = {
    ...localProps.config,
    modules: [A11y],
    a11y: {
      itemRoleDescriptionMessage: 'slide',
      slideLabelMessage: '{{index}} out of {{slidesLength}}',
      containerRoleDescriptionMessage: 'carousel',
    },
  }

  onMount(() => {
    Object.assign(swiperContainer!, swiperConfig)
    swiperContainer?.initialize?.()
  })

  return (
    <Dynamic
      {...others}
      component='swiper-container'
      init='false'
      ref={swiperContainer}
      aria-describedby={localProps.ariaDescribedBy}
    >
      {props.children}
    </Dynamic>
  )
}

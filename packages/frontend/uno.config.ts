import {
  defineConfig,
  presetWind,
  presetIcons,
  transformerVariantGroup,
  presetTypography,
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind(),
    presetIcons({
      prefix: '',
      extraProperties: {
        display: 'inline-block',
      },
    }),
    presetTypography(),
  ],

  transformers: [transformerVariantGroup()],
})

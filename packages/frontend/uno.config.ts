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

  theme: {
    colors: {
      pink: '#F5C2E7',
      gray: {
        100: '#BAC2DE',
        500: '#7f849c',
        700: '#313244',
        800: '#1E1E2E',
        900: '#11111B',
      },
    },
  },
})

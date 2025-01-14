import {
  defineConfig,
  presetWind,
  presetIcons,
  transformerVariantGroup,
  presetTypography,
} from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  presets: [
    presetWind(),
    presetIcons({
      prefix: '',
      extraProperties: {
        display: 'inline-block',
      },
      collections: {
        // a helper to load icons from the file system
        // files under `./assets/icons` with `.svg` extension will be loaded as it's file name
        // you can also provide a transform callback to change each icon (optional)
        custom: FileSystemIconLoader('./src/assets/icons', (svg) =>
          svg.replace(/#fff/, 'currentColor'),
        ),
      },
    }),
    presetTypography(),
  ],

  transformers: [transformerVariantGroup()],
})

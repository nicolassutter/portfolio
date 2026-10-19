import { defineConfig } from 'oxfmt'

export default defineConfig({
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  singleAttributePerLine: true,
  printWidth: 80,
  jsxSingleQuote: true,
  sortPackageJson: false,
  astro: {
    allowShorthand: true,
  },
  associations: [{ files: ['*.astro'], language: 'astro' }],
})

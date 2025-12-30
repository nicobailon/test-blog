import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  site: 'https://nicobailon.github.io',
  base: '/test-blog',
  output: 'static',
  integrations: [
    tailwind()
  ]
})

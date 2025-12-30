import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'theme-bg': 'var(--theme-background)',
        'theme-text': 'var(--theme-text)',
        'theme-border': 'var(--theme-border)',
        'theme-border-subdued': 'var(--theme-border-subdued)',
        'theme-accent': 'var(--theme-focused-foreground)'
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Consolas', 'monaco', 'monospace']
      }
    }
  },
  plugins: [typography]
}

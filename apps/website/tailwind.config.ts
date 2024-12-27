// tailwind config is required for editor support

import type { Config } from 'tailwindcss'
import sharedConfig from '@repo/tailwind-config/tailwind.config'

const config: Pick<Config, 'content' | 'presets' | 'plugins'> = {
  content: ['./app/**/*.tsx', './components/**/*.tsx'],
  presets: [sharedConfig],
  plugins: [require("tailwindcss-animate")],
}

export default config

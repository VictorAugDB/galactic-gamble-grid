import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateRows: {
        layout: '116px minmax(calc(100vh - 116px), 1fr)',
      },
      colors: {
        'orange-300': 'rgba(var(--orange-300) / <alpha-value>)',
        'orange-400': 'rgba(var(--orange-400) / <alpha-value>)',
        'red-600': 'rgba(var(--red-600) / <alpha-value>)',
        'green-400': 'rgba(var(--green-400) / <alpha-value>)',
        'blue-400': 'rgba(var(--blue-400) / <alpha-value>)',
        'blue-500': 'rgba(var(--blue-500) / <alpha-value>)',
        'blue-600': 'rgba(var(--blue-600) / <alpha-value>)',
        'blue-700': 'rgba(var(--blue-700) / <alpha-value>)',
        'purple-300': 'rgba(var(--purple-300) / <alpha-value>)',
        'brown-400': 'rgba(var(--brown-400) / <alpha-value>)',
        'cyan-400': 'rgba(var(--cyan-400) / <alpha-value>)',
        'gray-700': 'rgba(var(--gray-700) / <alpha-value>)',
        'gray-950': 'rgba(var(--gray-950) / <alpha-value>)',
        background: 'rgb(var(--background) / <alpha-value>)',
        card: 'rgba(var(--card) / <alpha-value>)',
        'text-darker': 'rgba(var(--text-darker) / <alpha-value>)',
        'text-medium': 'rgba(var(--text-medium) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}
export default config

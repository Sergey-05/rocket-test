// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        rocket: ['Rocketfont', 'sans-serif'],
      },
      keyframes: {
        'shine-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.85)' },
        },
        'star-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        },
        'letter-jump': {
          '0%, 20%, 100%': { transform: 'translateY(0)' },
          '7%': { transform: 'translateY(10px)' },
          '14%': { transform: 'translateY(-20px)' },
        },
        'man-move': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(10px, -10px)' },
        },
      },
      animation: {
        'shine-pulse': 'shine-pulse 3s ease-in-out infinite reverse',
        'star-pulse': 'star-pulse 3s ease-in-out infinite',
        'man-move': 'man-move 1.5s ease-in-out infinite',
        'letter-jump-1': 'letter-jump 4s ease-in-out 0.5s infinite',
        'letter-jump-2': 'letter-jump 4s ease-in-out 0.6s infinite',
        'letter-jump-3': 'letter-jump 4s ease-in-out 0.7s infinite',
        'letter-jump-4': 'letter-jump 4s ease-in-out 0.8s infinite',
        'letter-jump-5': 'letter-jump 4s ease-in-out 0.9s infinite',
        'letter-jump-6': 'letter-jump 4s ease-in-out 0.75s infinite',
      },
    },
  },
  plugins: [],
}

export default config
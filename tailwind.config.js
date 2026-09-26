// Opaklik degistiricilerinin (/8, /12, /22 gibi) tamami kullanilabilsin
const opacity = Object.fromEntries(
  Array.from({ length: 101 }, (_, i) => [String(i), String(i / 100)])
)

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      opacity,
      colors: {
        paper: {
          50: '#fdfbf6',
          100: '#f8f3e8',
          200: '#efe6d3',
          300: '#e3d5b8',
          400: '#cdb98f',
          500: '#b39a6a',
        },
        ink: {
          50: '#f4f2ee',
          200: '#c9c3b8',
          400: '#7b7263',
          600: '#463f34',
          800: '#2a251d',
          900: '#191510',
        },
        brand: {
          50: '#fdf3f0',
          100: '#fae3dc',
          200: '#f2c2b4',
          300: '#e49883',
          400: '#d06d53',
          500: '#b94f33',
          600: '#9c3d26',
          700: '#7d3120',
          800: '#5e261a',
          900: '#3f1a12',
        },
        forest: {
          100: '#dfe9dd',
          300: '#9bb897',
          500: '#5b7f57',
          700: '#3a5537',
        },
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        hand: ['Caveat', 'Bradley Hand', 'cursive'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        book: '0 1px 2px rgba(25,21,16,.06), 0 12px 32px -12px rgba(25,21,16,.25)',
        panel: '0 1px 0 rgba(255,255,255,.6) inset, 0 8px 24px -16px rgba(25,21,16,.4)',
        sheet: '0 0 0 1px rgba(25,21,16,.06), 0 24px 60px -30px rgba(25,21,16,.45)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'page-in': {
          '0%': { opacity: '0', transform: 'translateX(14px) rotateY(-3deg)' },
          '100%': { opacity: '1', transform: 'translateX(0) rotateY(0)' },
        },
        'page-in-back': {
          '0%': { opacity: '0', transform: 'translateX(-14px) rotateY(3deg)' },
          '100%': { opacity: '1', transform: 'translateX(0) rotateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .35s cubic-bezier(.2,.7,.3,1) both',
        'page-in': 'page-in .32s cubic-bezier(.2,.7,.3,1) both',
        'page-in-back': 'page-in-back .32s cubic-bezier(.2,.7,.3,1) both',
      },
    },
  },
  plugins: [],
}

import type { Config } from 'tailwindcss';
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { colors: { brand: { black: '#000000', stone: '#A59C91', sand: '#CDBFA7', bone: '#E6E0D2' }, stone: '#A59C91', sand: '#CDBFA7', bone: '#E6E0D2' }, fontFamily: { display: ['var(--font-syncopate)', 'sans-serif'] } } },
} satisfies Config;

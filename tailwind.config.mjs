/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#020617', // slate-950
          darker: '#010409',
          surface: '#0f172a', // slate-900
          surfaceElevated: '#1e293b', // slate-800
          border: 'rgba(51, 65, 85, 0.5)', // slate-700/50
          borderLight: 'rgba(100, 116, 139, 0.25)',
          muted: '#94a3b8',
        },
        corporate: {
          navy: '#0b192c',
          blue: '#1e3a8a',
          cyan: '#06b6d4',
          accent: '#10b981', // emerald-500
          accentHover: '#059669', // emerald-600
          accentLight: '#34d399', // emerald-400
        },
      },
      fontFamily: {
        sans: ['"Outfit"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        heading: ['"Outfit"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow-emerald': '0 4px 14px 0 rgba(0, 0, 0, 0.4)',
        'glow-cyan': '0 4px 14px 0 rgba(0, 0, 0, 0.4)',
        'card-subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
        'elevation-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
        'elevation-md': '0 4px 14px 0 rgba(0, 0, 0, 0.4)',
        'elevation-lg': '0 12px 30px -4px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
};

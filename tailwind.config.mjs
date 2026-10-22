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
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.2)',
        'card-subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};

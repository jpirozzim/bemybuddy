import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        buddy: {
          purple: '#6C4DFF',
          purpleDark: '#5038D9',
          lavender: '#EEE9FF',
          blue: '#5BB6FF',
          mint: '#6ED7B0',
          orange: '#FFB454',
          coral: '#FF8E8E',
          text: '#1D2433',
          muted: '#5F6B85',
          tertiary: '#8E97AB',
          border: '#E7EAF3',
          bg: '#F9FAFE',
          surface: '#FFFFFF',
          surfaceAlt: '#F7F9FC',
        },
      },
      boxShadow: {
        buddySoft: '0 4px 16px rgba(42, 51, 83, 0.08)',
        buddyMedium: '0 10px 30px rgba(42, 51, 83, 0.12)',
        buddyFloating: '0 16px 40px rgba(76, 92, 140, 0.16)',
      },
      borderRadius: {
        buddy: '20px',
        buddyLg: '28px',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};

export default config;

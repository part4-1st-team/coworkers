import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/stories/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      tablet: '768px',
      desktop: '1200px',
    },
    colors: {
      brand: {
        primary: 'var(--brand-primary)',
        secondary: '#34D399',
        tertiary: '#A3E635',
      },
      point: {
        purple: '#A855F7',
        blue: '#3B82F6',
        cyan: '#06b6d4',
        pink: '#ec4899',
        rose: '#f43f5e',
        orange: '#f97316',
        yellow: '#eab308',
      },
      background: {
        primary: '#0f172a',
        secondary: '#1e293b',
        tertiary: '#334155',
        inverse: '#ffffff',
      },
      intersection: {
        inactive: '#94a3b8',
        hover: '#059669',
        pressed: '#047857',
        focus: '#10b981',
      },
      border: {
        primary: 'rgba(248, 250, 252, 0.5)',
      },
      text: {
        primary: '#f8fafc',
        secondary: '#cbd5e1',
        tertiary: '#e2e8f0',
        default: '#64748b',
        inverse: '#ffffff',
        disabled: '#94a3b8',
      },
      status: {
        danger: '#dc2626',
      },
      icon: {
        primary: '#64748b',
        inverse: '#f8fafc',
        brand: '#10b981',
      },
    },

    fontSize: {
      '4xl': ['40px', '48px'],
      '3xl': ['32px', '38px'],
      '2xl': ['24px', '28px'],
      xl: ['20px', '24px'],
      '2lg': ['18px', '21px'],
      lg: ['16px', '19px'],
      md: ['14px', '17px'],
      sm: ['13px', '16px'],
      xs: ['12px', '14px'],
    },

    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'brand-gradient': 'linear-gradient(to right, #10B981, #A3E635)',
      },
    },
    keyframes: {},
    animation: {},
  },
  plugins: [],
};
export default config;

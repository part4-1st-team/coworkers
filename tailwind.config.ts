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
      black: '#000000',
      white: '#ffffff',
      brand: {
        primary: 'var(--brand-primary)',
        secondary: 'var(--brand-secondary)',
        tertiary: 'var(--brand-tertiary)',
      },
      point: {
        purple: 'var(--point-purple)',
        blue: 'var(--point-blue)',
        cyan: 'var(--point-cyan)',
        pink: 'var(--point-pink)',
        rose: 'var(--point-rose)',
        orange: 'var(--point-orange)',
        yellow: 'var(--point-yellow)',
      },
      background: {
        primary: 'var(--background-primary)',
        secondary: 'var(--background-secondary)',
        tertiary: 'var(--background-tertiary)',
        inverse: 'var(--background-inverse)',
      },
      intersection: {
        inactive: 'var(--intersection-inactive)',
        hover: 'var(--intersection-hover)',
        pressed: 'var(--intersection-pressed)',
        focus: 'var(--intersection-focus)',
      },
      border: {
        primary: 'var(--border-primary)',
      },
      text: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        tertiary: 'var(--text-tertiary)',
        default: 'var(--text-default)',
        inverse: 'var(--text-inverse)',
        disabled: 'var(--text-disabled)',
      },
      status: {
        danger: 'var(--status-danger)',
      },
      icon: {
        primary: 'var(--icon-primary)',
        inverse: 'var(--icon-inverse)',
        brand: 'var(--icon-brand)',
      },
      modal: {
        danger: 'var(--modal-danger)',
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
      boxShadow: {
        'shadow-xl': 'var(--shadow-xl)',
      },
      zIndex: {
        modal: '350',
        'modal-overlay': '300',
      },
    },
    keyframes: {},
    animation: {},
  },
  plugins: [],
};
export default config;

import type { Config } from 'tailwindcss';

const pxToRem = require('tailwindcss-preset-px-to-rem');

const config: Config = {
  presets: [pxToRem],
  darkMode: ['class', '[data-theme="dark"]'],
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
        primary: {
          DEFAULT: 'var(--background-primary-light)',
          dark: 'var(--background-primary)',
        },
        secondary: {
          DEFAULT: 'var(--background-secondary-light)',
          dark: 'var(--background-secondary)',
        },
        tertiary: {
          DEFAULT: 'var(--background-tertiary-light)',
          dark: 'var(--background-tertiary)',
        },
        inverse: {
          DEFAULT: 'var(--background-inverse-light)',
          dark: 'var(--background-inverse)',
        },
      },
      interaction: {
        inactive: 'var(--interaction-inactive)',
        hover: 'var(--interaction-hover)',
        pressed: 'var(--interaction-pressed)',
        focus: 'var(--interaction-focus)',
      },
      border: {
        primary: {
          DEFAULT: 'var(--border-primary-light)',
          dark: 'var(--border-primary)',
        },
      },
      text: {
        primary: {
          DEFAULT: 'var(--text-primary-light)',
          dark: 'var(--text-primary)',
        },
        secondary: {
          DEFAULT: 'var(--text-secondary-light)',
          dark: 'var(--text-secondary)',
        },
        tertiary: {
          DEFAULT: 'var(--text-tertiary-light)',
          dark: 'var(--text-tertiary)',
        },
        default: {
          DEFAULT: 'var(--text-default-light)',
          dark: 'var(--text-default)',
        },
        inverse: {
          DEFAULT: 'var(--text-inverse-light)',
          dark: 'var(--text-inverse)',
        },
        disabled: {
          DEFAULT: 'var(--text-disabled-light)',
          dark: 'var(--text-disabled)',
        },
      },
      status: {
        danger: 'var(--status-danger)',
        'danger-hover': 'var(--status-danger-hover)',
        'danger-active': 'var(--status-danger-active)',
      },
      icon: {
        primary: 'var(--icon-primary)',
        inverse: 'var(--icon-inverse)',
        brand: 'var(--icon-brand)',
      },
      modal: {
        danger: 'var(--modal-danger)',
      },
      dropdown: {
        button: '#18212F',
      },
      toast: {
        success: '#47cb61',
        error: 'var(--modal-danger)',
      },
      button: {
        background: '#18212F',
      },
      slate: {
        700: '#334155',
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
        modifyProfile: "url('/public/svgs/ic_modifyProfile.svg')",
      },
      boxShadow: {
        'shadow-xl': 'var(--shadow-xl)',
        left: '-4px 0 10px rgba(0, 0, 0, 1)', // 진한 그림자 설정
        task: '0 2px 4px rgba(0, 0, 0, 0.08)',
      },
      zIndex: {
        modal: '350',
        'modal-overlay': '300',
        dropdown: '20',
        'time-picker': '30',
        header: '10',
      },
    },
    animation: {
      'line-through': 'line-through 0.3s forwards',
    },
    keyframes: {
      'line-through': {
        '0%': { width: '0%' },
        '100%': { width: '100%' },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
export default config;

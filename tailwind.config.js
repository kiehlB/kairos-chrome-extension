const { fontFamily } = require('tailwindcss/defaultTheme');

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  mode: process.env.NODE_ENV ? 'jit' : undefined,
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  variants: {
    opacity: ['responsive', 'hover', 'focus', 'dark', 'group-hover'],
    boxShadow: ['responsive', 'hover', 'focus', 'dark'],
    animation: ['responsive', 'motion-safe', 'motion-reduce'],
    transitionProperty: ['responsive', 'motion-safe', 'motion-reduce'],
  },

  theme: {
    screens: {
      si: '769px',
      md: '900px',
      lg: '1025px',
      xxl: '1341px',
      xl: '1500px', // this is the "design resolution",
      max: '1919px',
      maxw: { max: '1603px' },
      m2xl: { max: '1340px' },
      mxl: { max: '1200px' },
      mlg: { max: '1024px' },
      mmd: { max: '768px' },
      msm: { max: '375px' },
      mmax: { max: '1919px' },
    },
    fontFamily: {
      primary: ['Inter', ...fontFamily.sans],
      sans: ['Roboto', ...fontFamily.sans],
      mat: ['Matter', ...fontFamily.sans],
      fira: ['Fira Mono', ...fontFamily.sans],
    },

    keyframes: {
      flicker: {
        '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
          opacity: 0.99,
          filter:
            'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
        },
        '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
          opacity: 0.4,
          filter: 'none',
        },
      },
      tilt: {
        '0%, 50%, 100%': {
          transform: 'rotate(0deg)',
        },
        '25%': {
          transform: 'rotate(0.5deg)',
        },
        '75%': {
          transform: 'rotate(-0.5deg)',
        },
      },
    },
    animation: {
      flicker: 'flicker 3s linear infinite',
      tilt: 'tilt 10s infinite linear',
    },
    extend: {
      colors: {
        'main-text': '#1f2d3d',
        'banner-color': '#7e5bef',
        'regal-sky': '#1fb6ff',
        'small-text': '#3c4858',

        'white-m': '#F5F7F9',
        'white-s': '#bec8d1',
        'grey-m': '#A0B5BB',
        'greyTint-m': '#70768C',
        'green-m': '#18A76C',
        'grrenTint-m': '#6CD2B0',
        'dark-m': '#323747',
        'orange-m': '#D7593D',

        'dark-bg': '#3a3d4a',
      },
      maxWidth: {
        '9xl': '82.5rem',
        '8xl': '96rem',
        side: '16.75rem',
        main: '71.25rem',
        card: '22.40625rem',
      },
      fontSize: {
        xl: '1.375rem', // 22px
        '2xl': '1.5625rem', // 25px
        '3xl': '1.875rem', // 30px
        '4xl': '2.5rem', // 40px
        '5xl': '3.125rem', // 50px
        '6xl': '3.75rem', // 60px
        '7xl': '4.375rem', // 70px
      },
      spacing: {
        '5vw': '5vw', // pull featured sections and navbar in the margin
        '8vw': '8vw', // positions hero img inside the margin
        '10vw': '10vw', // page margin
        768: '768px',
        side: '16.375rem',
        'side-1': '14.75rem',
        main: '92.25rem',
        card: '24.15625rem',
        mcard: 'calc(25%)',
        scard: 'calc(50%)',
        tcard: 'calc(32.7%)',
        fcard: 'calc(100%)',
      },
      height: {
        hero: 'min(60rem, calc(100vh - 10rem))', // screen - navbar height (lg: only)
        card: '20rem',
        single: '9.1rem',
      },
      maxHeight: {
        '50vh': '50vh', // max height for medium size hero images
        '75vh': '75vh', // max height for giant size hero images
      },
      rotate: {
        '-135': '-135deg',
        135: '135deg',
      },
      typography: (theme) => {
        // some fontSizes return [size, props], others just size :/
        const fontSize = (size) => {
          const result = theme(`fontSize.${size}`);
          return Array.isArray(result) ? result[0] : result;
        };

        const breakout = {
          marginLeft: 0,
          marginRight: 0,
          gridColumn: '2 / span 10',
        };

        return {
          // DEFAULT only holds shared stuff and not the things that change
          // between light/dark
          DEFAULT: {
            css: [
              {
                '> *': {
                  gridColumn: '1 / -1',
                  [`@media (min-width: ${theme('screens.lg')})`]: {
                    gridColumn: '3 / span 8',
                  },
                },
                p: {
                  marginTop: 0,
                  color: '#dc2626',
                  marginBottom: theme('spacing.8'),
                  fontSize: fontSize('lg'),
                },
                '> div': {
                  marginTop: 0,
                  marginBottom: theme('spacing.8'),
                  fontSize: fontSize('lg'),
                },
                a: {
                  textDecoration: 'none',
                },
                'a:hover,a:focus': {
                  textDecoration: 'underline',
                  outline: 'none',
                },
                strong: {
                  fontWeight: theme('fontWeight.medium'),
                  fontSize: fontSize('lg'),
                },
                hr: {
                  marginTop: theme('spacing.8'),
                  marginBottom: theme('spacing.16'),
                },
                pre: {
                  color: 'var(--base05)',
                  backgroundColor: 'var(--base00)',
                  marginTop: 0,
                  marginBottom: theme('spacing.8'),
                  marginLeft: `-${theme('spacing.10vw')}`,
                  marginRight: `-${theme('spacing.10vw')}`,
                  padding: theme('spacing.8'),
                  borderRadius: 0,
                  [`@media (min-width: ${theme('screens.lg')})`]: {
                    borderRadius: theme('borderRadius.lg'),
                    ...breakout,
                  },
                },
                '.embed': {
                  position: 'relative',
                  marginLeft: '-10vw',
                  marginRight: '-10vw',
                  [`@media (min-width: ${theme('screens.lg')})`]: {
                    ...breakout,
                  },
                },
                '.embed > div': {
                  height: '0px',
                },
                '.embed > div > iframe': {
                  height: '100% !important',
                  width: '100% !important',
                  top: '0',
                  left: '0',
                  position: 'absolute',
                  border: 'none',
                  borderRadius: '0 !important',
                  [`@media (min-width: ${theme('screens.lg')})`]: {
                    borderRadius: '0.5rem !important',
                  },
                },
                ul: {
                  marginTop: 0,
                  marginBottom: theme('spacing.8'),
                },
                ol: {
                  marginTop: 0,
                  marginBottom: theme('spacing.8'),
                },
                'h1, h2, h3, h4, h5, h6': {
                  marginTop: 0,
                  marginBottom: 0,
                  fontWeight: theme('fontWeight.normal'),
                  [`@media (min-width: ${theme('screens.lg')})`]: {
                    fontWeight: theme('fontWeight.medium'),
                  },
                },
                // tailwind doesn't stick to this property order, so we can't make 'h3' overrule 'h2, h3, h4'
                'h1, h2': {
                  fontSize: fontSize('2xl'),
                  marginTop: theme('spacing.20'),
                  marginBottom: theme('spacing.10'),
                  [`@media (min-width: ${theme('screens.lg')})`]: {
                    fontSize: fontSize('3xl'),
                  },
                },
                h3: {
                  fontSize: fontSize('xl'),
                  marginTop: theme('spacing.16'),
                  marginBottom: theme('spacing.10'),
                  [`@media (min-width: ${theme('screens.lg')})`]: {
                    fontSize: fontSize('2xl'),
                  },
                },
                'h4, h5, h6': {
                  fontSize: fontSize('lg'),
                  [`@media (min-width: ${theme('screens.lg')})`]: {
                    fontSize: fontSize('xl'),
                  },
                },
                img: {
                  // images are wrapped in <p>, which already has margin
                  marginTop: 0,
                  marginBottom: 0,
                  borderRadius: theme('borderRadius.lg'),
                },
                blockquote: {
                  fontWeight: theme('fontWeight.normal'),
                  border: 'none',
                  borderRadius: theme('borderRadius.lg'),
                  padding: theme('spacing.8'),
                  marginTop: 0,
                  marginBottom: theme('spacing.10'),
                },
                'blockquote > :last-child': {
                  marginBottom: 0,
                },
              },
            ],
          },
          // use prose-light instead of default, so it's easier to see theme differences
          light: {
            css: [
              {
                color: theme('colors.gray.500'),
                a: {
                  color: theme('colors.team.current'),
                },
                strong: {
                  color: theme('colors.black'),
                },
                hr: {
                  borderColor: theme('colors.gray.200'),
                },
                code: {
                  color: theme('colors.gray.800'),
                },
                'h1, h2, h3, h4, h5, h6': {
                  color: theme('colors.black'),
                },
                blockquote: {
                  color: theme('colors.gray.500'),
                  backgroundColor: theme('colors.gray.100'),
                },
                'thead, tbody tr': {
                  borderBottomColor: theme('colors.gray.200'),
                },
              },
            ],
          },
          dark: {
            css: [
              {
                color: theme('colors.blueGray.500'),
                a: {
                  color: theme('colors.team.current'),
                },
                strong: {
                  color: theme('colors.white'),
                },
                hr: {
                  borderColor: theme('colors.gray.600'),
                },
                code: {
                  color: theme('colors.gray.100'),
                },
                'h1, h2, h3, h4, h5, h6': {
                  color: theme('colors.white'),
                },
                blockquote: {
                  color: theme('colors.blueGray.500'),
                  backgroundColor: theme('colors.gray.800'),
                },
                'thead, tbody tr': {
                  borderBottomColor: theme('colors.gray.600'),
                },
              },
            ],
          },
        };
      },
    },
  },
  plugins: [],
};

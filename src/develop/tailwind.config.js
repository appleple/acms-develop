// const path = require('path');
// const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // node_modules を除外するため個別指定
    './*.html',
    './(_layouts|admin|include|contact)/**/*.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
    // 継承テーマでtailwindcssを使う場合は以下をコメントアウトしてください
    // `../*@${path.basename(__dirname)}/**/*.html`,
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        DEFAULT: '100%',
        sm: '640px',
        md: '768px',
        lg: '1024px',
      },
    },
    extend: {
      colors: {
        gray: {
          '500-75': 'rgb(107 114 120 / .75)',
        }
      },
      backgroundImage: {
        'circle': 'url("/themes/develop/images/fa-circle-solid.svg")',
        'check': 'url("/themes/develop/images/fa-check-solid.svg")',
        'select': 'url("/themes/develop/images/fa-chevron-down-solid.svg")',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Helvetica Neue"',
          '"Segoe UI"',
          '"Hiragino Kaku Gothic ProN"',
          '"Hiragino Sans"',
          'Arial',
          'Meiryo',
          'sans-serif'
        ],
      },
      typography: {
        DEFAULT: {
          css: {
            h4: {
              'font-size': '1.125rem',
            },
            p: {
              'line-height': '1.7',
            },
            a: {
              '&:hover': {
                'text-decoration': 'none',
              }
            },
            hr: false,
            blockquote: {
              'font-style': 'normal',
            },
            'ul > li::marker': {
              'color': '#9CA3AF',
            },
            'ol > li::marker': {
              'font-weight': 'bold',
            },
            dd: {
              'margin-top': '0',
              'padding-inline-start': '1em',
            },
            table: {
              'overflow': 'hidden',
              'margin-top': '0',
              'margin-bottom': '0',
              'border': '1px solid var(--tw-prose-td-borders)',
              'border-collapse': 'separate',
              'border-spacing': '0',
              'border-radius': '0.375rem',
              'font-size': '1rem',
            },
            th: {
              'padding': '1rem',
              'border-bottom': '1px solid var(--tw-prose-td-borders)',
              'border-left': '1px solid var(--tw-prose-td-borders)',
              'background': '#F9FAFB'
            },
            td: {
              'padding': '1rem',
              'border-bottom': '1px solid var(--tw-prose-td-borders)',
              'border-left': '1px solid var(--tw-prose-td-borders)',
            },
            'th:first-child, td:first-child': {
              'border-left': '0',
            },
            'tr:last-child th, tr:last-child td': {
              'border-bottom': '0',
            },
            '[class*="column-media-"] img': {
              "margin-bottom": ".75em",
            }
          },
        },
      },
    }
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    require('@tailwindcss/typography'),
    // plugin(function ({ addBase, addComponents, addUtilities, theme }) {
    //   addBase({
    //     html: {
    //       scrollPaddingTop: theme('spacing.20'),
    //       scrollBehavior: 'smooth',
    //     },
    //     body: {
    //       backgroundColor: theme('colors.white'),
    //       color: theme('colors.gray.900'),
    //     },
    //   });
    //   addComponents({
    //     '.card': {
    //       backgroundColor: theme('colors.white'),
    //       borderRadius: theme('borderRadius.lg'),
    //       padding: theme('spacing.6'),
    //       boxShadow: theme('boxShadow.xl'),
    //     }
    //   })
    //   addUtilities({
    //     '.content-auto': {
    //       contentVisibility: 'auto',
    //     }
    //   })
    // }),
  ],
}

// const path = require('path');
// const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // node_modules を除外するため個別指定
    './*.html',
    './(_layouts|admin|include)/**/*.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
    // 継承テーマでtailwindcssを使う場合は以下をコメントアウトしてください
    // `../*@${path.basename(__dirname)}/**/*.html`,
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            hr: false,
            blockquote: {
              'font-style': 'normal',
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

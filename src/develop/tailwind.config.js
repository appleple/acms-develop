/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h4: {
              'font-size': '1.125rem',
            },
            p: {
              'margin-bottom': '1.5rem',
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
            ul: {
              'margin-top': '0',
              'margin-bottom': '1.5rem',
            },
            'ul > li::marker': {
              'color': '#9CA3AF',
            },
            'ol > li::marker': {
              'font-weight': 'bold',
            },
            li: {
              margin: '.375rem 0'
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
            '[class*="column-media-"]': {
              'margin-bottom': '1.5rem',
            },
            '[class*="column-media-"] img': {
              'margin-bottom': '.75em',
              'border-radius': '0.375rem',
            },
            '[class*=column-map]': {
              'overflow': 'hidden',
              'margin-bottom': '1.5rem',
              'border-radius': '0.375rem',
            },
            '[class*=column-quote]': {
              'margin-bottom': '1.5rem',
            },
            '[class*=column-quote] blockquote': {
              'font-style': 'normal',
              'padding-left': '0',
              'color': 'inherit',
              'quotes': 'none',
              '&::before, &::after': {
                content: 'none',
              }
            },
          },
        },
      },
    },
  },
}

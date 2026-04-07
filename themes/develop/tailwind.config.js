const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '');
const em = (px, base) => `${round(px / base)}em`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            // ------------------------------
            // コンテンツ先頭の余白リセット／レイアウト用カスタムプロパティ
            // ------------------------------
            '*:first-child': {
              marginBlockStart: '0',
            },
            '*:first-child.column-block-editor > *:first-child': {
              marginBlockStart: '0',
            },
            '*:first-child.js-edit_inplace > *:first-child': {
              marginBlockStart: '0',
            },
            '*:first-child.js-edit_inplace-hovering + .js-edit_inplace > *:first-child': {
              marginBlockStart: '0',
            },
            '.acms-cssgrid': {
              '--acms-gap': '0 var(--unit-gap-x)',
            },
            '.acms-stack, .acms-vstack, .acms-hstack': {
              '--acms-stack-spacing': '0 var(--unit-gap-x)',
            },
            // ------------------------------
            // 基本スタイル
            // ------------------------------
            'img, video': {
              maxWidth: '100%',
              height: 'auto',
            },
            'audio, canvas, embed, iframe, object, svg, video': {
              display: 'block',
              verticalAlign: 'middle',
            },
            table: {
              'text-indent': '0',
              'border-color': 'inherit',
              'border-collapse': 'collapse',
            },

            // ------------------------------
            // figure 要素 上書き
            // ------------------------------
            'figure, [role="figure"]': {
              marginLeft: 0,
              marginRight: 0,
              marginTop: em(32, 16),
              marginBottom: em(32, 16),
            },
            'figure img, [role="figure"] img': {
              marginTop: '0',
              marginBottom: '0',
              borderRadius: 'var(--radius-md)',
            },

            // [role="figure"] のキャプションを figcaption と同等に
            '[role="figure"] .caption': {
              color: 'var(--tw-prose-captions)',
              fontSize: em(14, 16),
              lineHeight: round(20 / 14),
              marginTop: em(12, 14),
              marginBottom: '0',
            },
            // ------------------------------
            // blockquote 上書き
            // ------------------------------
            blockquote: {
              marginInline: '0',
              borderInlineStartStyle: 'solid',
            },
            // ------------------------------
            // table 上書き
            // ------------------------------
            'tbody th': {
              paddingInlineEnd: em(8, 14),
              paddingBottom: em(8, 14),
              paddingInlineStart: em(8, 14),
            },
            'tbody th:first-child': {
              paddingInlineStart: '0',
            },
            'tbody th:last-child': {
              paddingInlineEnd: '0',
            },
            'tbody tr': {
              borderBottomStyle: 'solid',
            },
            'table *:last-child': {
              marginTop: '0',
              marginBottom: '0',
            },
            'div:has(> table)': {
              // When wrapping tables for horizontal scroll, carry margins on wrapper
              // to preserve vertical rhythm (overflow prevents margin-collapsing).
              marginTop: em(32, 16),
              marginBottom: em(32, 16),
              overflowX: 'auto',
            },
            'div:has(> table) table': {
              marginTop: '0',
              marginBottom: '0',
            },

            // ------------------------------
            // リンクボタン／ファイル（ボタン型）
            // ------------------------------
            '[data-type="linkButton"]': {
              // Align with paragraph spacing in defaults: 20px -> 1.25em
              marginTop: em(20, 16),
              marginBottom: em(20, 16),
            },
            '[data-type="linkButton"] a, [data-type="fileBlock"][data-display-type="button"] a': {
              display: 'inline-flex',
              alignItems: 'center',
              paddingLeft: '.75em',
              paddingRight: '.75em',
              paddingTop: '.5em',
              paddingBottom: '.5em',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'var(--color-gray-200)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-indigo-50) !important',
              lineHeight: '1.3',
              textDecoration: 'none !important',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              gap: '.375em',
              color: 'var(--color-gray-900) !important',
              transitionProperty: 'opacity',
            },
            '[data-type="linkButton"] a:hover, [data-type="fileBlock"][data-display-type="button"] a:hover': {
              opacity: '0.7',
              color: 'var(--color-gray-900)',
            },
            '[data-type="fileBlock"][data-display-type="button"] img': {
              width: '2rem', // w-8
              height: 'auto',
              marginTop: '0',
              marginBottom: '0',
            },
            '[data-type="fileBlock"][data-display-type="button"] .caption': {
              margin: '0',
              color: 'currentColor',
            },

            // ------------------------------
            // ファイルブロック（縦積み／アイコン／リンク）
            // ------------------------------
            '[data-type="fileBlock"]': {
              // Treat as a standard block with paragraph-like rhythm
              marginTop: em(20, 16),
              marginBottom: em(20, 16),
              textAlign: 'center',
              lineHeight: '0',
            },
            '[data-type="fileBlock"][data-display-type="icon"] img, [class*="column-media"] .columnIcon, [class*="column-file"] .columnIcon':
              {
                display: 'inline-block',
                maxWidth: '100%',
                height: 'auto',
                width: '70px',
                margin: '0',
              },
            '[data-type="fileBlock"][data-display-type="icon"] .caption, [class*="column-file"] .caption, [class*="column-media"]:has(a[href*="media-download"], a[href*="storage"]) .caption':
              {
                margin: '0',
                marginTop: '.75em',
                color: theme('colors.gray.500'),
                fontSize: 'var(--text-sm)',
                textAlign: 'center',
                lineHeight: 'normal',
              },
            '[data-type="fileBlock"][data-display-type="icon"] a, [class*="column-media"] a[href*="media-download"], [class*="column-media"] a[href*="storage"], [class*="column-file"] a':
              {
                display: 'inline-block',
                textDecoration: 'none',
                transitionProperty: 'opacity',
              },
            '[data-type="fileBlock"][data-display-type="icon"] a:hover, [class*="column-media"] a[href*="media-download"]:hover, [class*="column-media"] a[href*="storage"]:hover, [class*="column-file"] a:hover':
              {
                opacity: '0.7',
              },
            '.column-pdf-image': {
              maxWidth: '100%',
              borderColor: 'var(--color-gray-200)',
              borderWidth: '1px',
              borderStyle: 'solid',
              marginBottom: '0',
            },

            // ------------------------------
            // 埋め込みカード
            // ------------------------------
            "[class*='column-embed']": {
              // Align with media/figure rhythm: 32px -> 2em
              marginTop: em(32, 16),
              marginBottom: em(32, 16),
            },
            "[class*='column-embed'] .acms-embed-link": {
              overflow: 'hidden',
              display: 'block',
              padding: '0',
              color: 'inherit',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'var(--color-gray-200)',
              borderRadius: 'var(--radius-md)',
              fontWeight: '400',
              backgroundColor: 'var(--color-white)',
              textDecoration: 'none',
              transitionProperty: 'opacity',
            },
            [`@media (min-width: ${theme('breakpoint.md')})`]: {
              "[class*='column-embed'] .acms-embed-link": {
                display: 'flex',
                transitionProperty: 'opacity',
              },
              "[class*='column-embed'] .acms-embed-link-image-container": {
                width: '33.333333%',
                flex: 'none',
              },
              "[class*='column-embed'] .acms-embed-link-image-container img": {
                height: '100%',
                objectFit: 'cover',
              },
              "[class*='column-embed'] .acms-embed-link-content": {
                width: '66.666667%',
              },
            },
            "[class*='column-embed'] .acms-embed-link:hover": {
              opacity: '0.7',
            },
            "[class*='column-embed'] .acms-embed-link-image-container": {
              marginRight: '0',
            },
            "[class*='column-embed'] .acms-embed-link-image-container img": {
              display: 'block',
              width: '100%',
              margin: '0',
            },
            "[class*='column-embed'] .acms-embed-link-content": {
              display: 'flex',
              flexDirection: 'column',
              maxWidth: 'none',
              padding: '2em',
              backgroundColor: 'var(--color-white)',
            },
            "[class*='column-embed'] .acms-embed-link-title": {
              marginBottom: '.375em',
              marginTop: '0',
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--leading-normal)',
              fontWeight: '400',
              color: 'var(--color-gray-700)',
              textDecoration: 'none',
            },
            "[class*='column-embed'] .acms-embed-link-site-name": {
              order: '-1',
              padding: '0',
              marginTop: '0',
              marginBottom: '.25em',
              color: 'var(--color-gray-700)',
              fontSize: 'var(--text-sm)',
            },
            "[class*='column-embed'] .acms-embed-link-description": {
              padding: '0',
              margin: '0',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-gray-500)',
              lineHeight: 'var(--leading-relaxed)',
            },

            // ------------------------------
            // カラムレイアウト
            // ------------------------------
            "[data-type='columns']": {
              display: 'grid',
              gridAutoFlow: 'column',
              boxSizing: 'border-box',
              gap: 'var(--unit-gap-x)',
            },
            "[data-type='columns'].layout-two-column": {
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            },
            "[data-type='columns'].layout-three-column": {
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            },

            // ------------------------------
            // 配置
            // ------------------------------
            // Align helpers
            '.align-left': {
              display: 'flex',
              justifyContent: 'flex-start',
            },
            '.align-right': {
              display: 'flex',
              justifyContent: 'flex-end',
            },
            '.align-center': {
              display: 'flex',
              justifyContent: 'center',
            },

            // ------------------------------
            // 地図／ストリートビュー
            // ------------------------------
            // Map blocks
            "[class*='column-map'], [class*='column-street-view']": {
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              // Align with media rhythm (img/video/figure)
              marginTop: em(32, 16),
              marginBottom: em(32, 16),
            },
            ':where(.column-map div:has(> .js-open-street-map)), :where(.column-map div:has(> .js-s2d-ready)), :where(.column-street-view div:has(> .js-street-view))':
              {
                maxWidth: '100%',
              },
            ':where(.column-map .js-open-street-map), :where(.column-map .js-s2d-ready), :where(.column-street-view .js-street-view)':
              {
                aspectRatio: '16 / 9',
              },

            // ------------------------------
            // ファイル
            // ------------------------------
            // File/media block spacing (outside prose previously)
            '[class*="column-media"]:has(a[href*="media-download"], a[href*="storage"]), [class*="column-file"]': {
              // Treat as paragraph-like blocks
              marginTop: em(20, 16),
              marginBottom: em(20, 16),
              textAlign: 'center',
              lineHeight: '0',
            },

            // ------------------------------
            // 目次（toc）
            // ------------------------------
            // TOC custom unit
            '.toc .level-1': {
              paddingLeft: '0',
              marginTop: em(24, 16),
              marginBottom: em(-4, 16),
            },
            '.toc .level-1 li': {
              paddingLeft: '0',
            },
            '.toc .level-2': {
              paddingLeft: '1em',
              marginBottom: '0',
            },
            '.toc .level-2 li': {
              display: 'flex',
              gap: '.5em',
            },
            '.toc .level-2 li::before': {
              content: "''",
              display: 'block',
              width: '1em',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundImage:
                "url(\"data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 24 24'><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' /></svg>\")",
            },

            // ------------------------------
            // テーブルユーティリティ（acms）
            // ------------------------------
            '.acms-table-scrollable th, .acms-table-scrollable td, .js-table-unit-scroll-hint th, .js-table-unit-scroll-hint td':
              {
                whiteSpace: 'nowrap',
                wordBreak: 'keep-all',
              },
            '.acms-cell-text-left': {
              textAlign: 'left',
            },
            '.acms-cell-text-center': {
              textAlign: 'center',
            },
            '.acms-cell-text-right': {
              textAlign: 'right',
            },
            '.acms-cell-text-nowrap': {
              whiteSpace: 'nowrap',
            },
            '.acms-cell-text-bold': {
              fontWeight: 'var(--font-weight-bold)',
            },
            '.acms-cell-text-normal': {
              fontWeight: 'var(--font-weight-normal)',
            },
            '.acms-cell-text-top': {
              verticalAlign: 'top',
            },
            '.acms-cell-text-middle': {
              verticalAlign: 'middle',
            },
            '.acms-cell-text-bottom': {
              verticalAlign: 'bottom',
            },
          },
        },
      }),
    },
  },
};

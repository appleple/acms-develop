import path, { resolve, basename } from 'path';
import { defineConfig, mergeConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import eslint from 'vite-plugin-eslint2';
import stylelint from 'vite-plugin-stylelint';
import { viteStaticCopy } from 'vite-plugin-static-copy'

const themeName = basename(__dirname);
export default defineConfig(({ command, mode }) => {
  return mergeConfig(
    {
      base: './',
      define: {
        'THEME_NAME': JSON.stringify(themeName),
      },
      plugins: [
        eslint({
          include: ['src/js/**/*.{js,jsx,ts,tsx,vue,svelte}'],
          emitError: true,
          emitWarning: true,
          fix: true,
        }),
        stylelint({
          include: ['src/style/**/*.{css,scss,sass,less,styl,vue,svelte}'],
          fix: true,
        }),
        ...(command === 'build'
          ? [
              viteStaticCopy({
                targets: [
                  {
                    src: 'node_modules/pdfjs-dist/build/pdf.worker.min.js',
                    dest: 'pdfjs'
                  },
                  {
                    src: 'node_modules/pdfjs-dist/cmaps',
                    dest: 'pdfjs'
                  }
                ]
              })
            ]
          : []),
      ],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src/js'),
          './src/js/': path.resolve(__dirname, './src/js'),
        },
      },
      build: {
        manifest: true, // dist に manifest.json を出力
        rollupOptions: {
          input: {
            bundle: resolve(__dirname, 'src/js/main.js'),
          },
        },
        assetsInlineLimit: 4096, // 4kbより小さいアセットをインライン化
      },
    },
    mode === 'analyze'
      ? {
          plugins: [
            visualizer({
              open: true,
              filename: 'dist/stats.html',
              gzipSize: true,
              brotliSize: true,
            }),
          ],
        }
      : {}
  );
});

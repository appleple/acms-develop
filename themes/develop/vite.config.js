import path, { resolve, basename } from 'path';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import tailwindcss from '@tailwindcss/vite';
import eslint from 'vite-plugin-eslint2';
import stylelint from 'vite-plugin-stylelint';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(({ command, mode }) => ({
  base: './',
  define: {
    THEME_NAME: JSON.stringify(basename(__dirname)),
  },
  plugins: [
    tailwindcss(),
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
    command === 'build' &&
      viteStaticCopy({
        targets: [
          {
            src: 'node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs',
            dest: 'pdfjs',
          },
          {
            src: 'node_modules/pdfjs-dist/cmaps',
            dest: 'pdfjs',
          },
        ],
      }),
    mode === 'analyze' &&
      visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
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
        admin: resolve(__dirname, 'src/js/admin.js'),
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    assetsInlineLimit: 4096, // 4kbより小さいアセットをインライン化
  },
  server: {
    cors: true,
  },
}));

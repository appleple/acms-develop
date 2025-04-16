import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jquery,
        ACMS: 'writable',
      },
    },
    ignores: ['dist/'],
  },
  pluginJs.configs.recommended,
];

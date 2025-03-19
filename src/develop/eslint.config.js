import globals from "globals";
import pluginJs from "@eslint/js";
import pluginTailwind from "eslint-plugin-tailwindcss";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jquery,
        ACMS: 'writable',
      }
    },
    ignores: ['dist/']
  },
  pluginJs.configs.recommended,
  ...pluginTailwind.configs['flat/recommended'],
];

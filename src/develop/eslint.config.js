import globals from "globals";
import pluginJs from "@eslint/js";
import pluginTw from "eslint-plugin-tailwindcss"

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jquery,
        ACMS: 'writable',
      }
    },
    plugins: {
      pluginTw,
    },
    ignores: ['dist/']
  },
  pluginJs.configs.recommended,
];

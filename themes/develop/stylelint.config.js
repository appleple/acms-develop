/** tailwindcss v4 の at-rule */
const tailwindAtRules = ['theme', 'source', 'utility', 'variant', 'custom-variant', 'plugin', 'apply', 'config'];

/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  rules: {
    'no-descending-specificity': null,
    'import-notation': null,
    'at-rule-no-unknown': [true, { ignoreAtRules: tailwindAtRules }],
    'at-rule-no-deprecated': [true, { ignoreAtRules: tailwindAtRules }],
    // @apply のユーティリティクラス列は CSS の構文として解釈できないため除外する
    'at-rule-prelude-no-invalid': [true, { ignoreAtRules: tailwindAtRules }],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['theme'],
      },
    ],
  },
};

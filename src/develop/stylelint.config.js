/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
  ],
  rules: {
    'no-descending-specificity': null,
    'import-notation': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          /** tailwindcss v4 */
          'theme',
          'source',
          'utility',
          'variant',
          'custom-variant',
          'plugin',
          'apply',
          'config',
        ],
      },
    ],
    'at-rule-no-deprecated': [
      true,
      {
        ignoreAtRules: [
          /** tailwindcss v4 */
          'theme',
          'source',
          'utility',
          'variant',
          'custom-variant',
          'plugin',
          'apply',
          'config',
        ],
      },
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['theme'],
      },
    ],
  },
};

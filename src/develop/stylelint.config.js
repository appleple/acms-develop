/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard',
    // 'stylelint-config-standard-sass', sassを使う場合はコメントアウトを外して、stylelint-config-standardをコメントアウトしてください。
    'stylelint-config-recess-order',
  ],
  rules: {
    'no-descending-specificity': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'apply',
          'layer',
          'tailwind',
          'config'
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

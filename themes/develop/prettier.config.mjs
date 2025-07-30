/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  printWidth: 120,
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  endOfLine: 'lf',
  jsxSingleQuote: false,
  twigAlwaysBreakObjects: false,
  plugins: ['@zackad/prettier-plugin-twig'],
};

export default config;

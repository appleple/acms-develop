/**
 * 与えられた値が関数であるかを判定する Type Guard
 * @template T
 * @param {T} value - 判定対象の値
 * @returns {value is Function} `true` の場合、`value` は `Function` 型
 */
function isFunction(value) {
  return typeof value === 'function';
}

export { isFunction };

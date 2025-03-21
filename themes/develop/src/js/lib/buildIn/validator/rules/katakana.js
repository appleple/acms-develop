/**
 * Validates if the value contains only katakana characters
 * @type {import('../types').ValidationRule}
 */
export const katakana = (val) => {
  if (!val) {
    return true;
  }
  if (val.match(/^[ァ-ヾー]+$/)) {
    return true;
  }
  return false;
};

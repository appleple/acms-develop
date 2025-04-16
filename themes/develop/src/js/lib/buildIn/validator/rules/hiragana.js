/**
 * Validates if the value contains only hiragana characters
 * @type {import('../types').ValidationRule}
 */
export const hiragana = (val) => {
  if (!val) {
    return true;
  }
  if (val.match(/^[ぁ-ゞー]+$/)) {
    return true;
  }
  return false;
};

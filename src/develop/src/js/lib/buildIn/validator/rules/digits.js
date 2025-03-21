/**
 * Validates if the value contains only digits
 * @type {import('../types').ValidationRule}
 */
export const digits = (val) => {
  if (!val) {
    return true;
  }
  return val === String(parseInt(val, 10));
};

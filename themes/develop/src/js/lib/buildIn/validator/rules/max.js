/**
 * Validates if the value is less than or equal to the specified maximum
 * @type {import('../types').ValidationRule}
 */
export const max = (val, num) => {
  if (!val) {
    return true;
  }
  return parseInt(num, 10) >= parseInt(val, 10);
};

/**
 * Validates if the value is greater than or equal to the specified minimum
 * @type {import('../types').ValidationRule}
 */
export const min = (val, num) => {
  if (!val) {
    return true;
  }
  return parseInt(num, 10) <= parseInt(val, 10);
};

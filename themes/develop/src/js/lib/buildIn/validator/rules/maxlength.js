/**
 * Validates if the value's length is less than or equal to the specified maximum
 * @type {import('../types').ValidationRule}
 */
export const maxlength = (val, len) => {
  if (!val) {
    return true;
  }
  return parseInt(len, 10) >= String(val).length;
};

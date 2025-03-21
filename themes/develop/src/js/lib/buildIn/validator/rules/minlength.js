/**
 * Minimum length validation rule
 * @type {import('../types').ValidationRule}
 */
export const minlength = (val, len) => {
  if (!val) {
    return true;
  }
  return parseInt(len, 10) <= String(val).length;
};

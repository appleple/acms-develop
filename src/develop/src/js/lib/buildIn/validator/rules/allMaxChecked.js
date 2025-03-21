/**
 * Validates if the number of checked checkboxes is less than or equal to the specified maximum
 * @type {import('../types').ValidationRule}
 */
export const allMaxChecked = (_, num, checkboxes) => {
  if (!Array.isArray(checkboxes)) {
    return true;
  }
  if (!checkboxes.every((checkbox) => checkbox instanceof HTMLInputElement)) {
    return true;
  }
  return parseInt(num, 10) >= checkboxes.filter(({ checked }) => checked).length;
};

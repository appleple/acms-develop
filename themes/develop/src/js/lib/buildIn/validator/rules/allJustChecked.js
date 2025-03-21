/**
 * Validates if exactly the specified number of checkboxes are checked
 * @type {import('../types').ValidationRule}
 */
export const allJustChecked = (_, num, checkboxes) => {
  if (!Array.isArray(checkboxes)) {
    return true;
  }
  if (!checkboxes.every((checkbox) => checkbox instanceof HTMLInputElement)) {
    return true;
  }
  return parseInt(num, 10) === checkboxes.filter(({ checked }) => checked).length;
};

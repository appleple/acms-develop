/**
 * Validates if the number of checked checkboxes is greater than or equal to the specified minimum
 * @type {import('../types').ValidationRule}
 */
export const allMinChecked = (_, num, checkboxes) => {
  if (!Array.isArray(checkboxes)) {
    return true;
  }
  if (!checkboxes.every((checkbox) => checkbox instanceof HTMLInputElement)) {
    return true;
  }
  return parseInt(num, 10) <= checkboxes.filter(({ checked }) => checked).length;
};

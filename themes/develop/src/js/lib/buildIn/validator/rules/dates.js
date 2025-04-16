/**
 * Validates if the value matches various date formats
 * @type {import('../types').ValidationRule}
 */
export const dates = (val) => {
  if (!val) {
    return true;
  }
  return /^[sS]{1,2}(\d{2})\W{1}\d{1,2}\W{1}\d{0,2}$|^[hH]{1}(\d{1,2})\W{1}\d{1,2}\W{1}\d{0,2}$|^\d{1,2}$|^\d{1,2}\W{1}\d{1,2}$|^\d{2,4}\W{1}\d{1,2}\W{1}\d{0,2}$|^\d{4}\d{2}\d{2}/.test(
    val
  );
};

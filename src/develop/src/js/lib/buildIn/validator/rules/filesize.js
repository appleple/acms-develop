/**
 * Validates if the file size is within the specified limit
 * @type {import('../types').ValidationRule}
 */
export const filesize = (_, max, input) => {
  if (!(input instanceof HTMLInputElement)) {
    return true;
  }
  if (!input.files) {
    return true;
  }
  if (input.files.length < 1) {
    return true;
  }
  if (input.files[0].size > parseInt(max, 10) * 1024) {
    return false;
  }
  return true;
};

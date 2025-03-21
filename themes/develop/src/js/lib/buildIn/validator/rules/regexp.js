/**
 * Alias for regex validation rule
 * @type {import('../types').ValidationRule}
 */
import { regex } from './regex';

export const regexp = (val, pattern, input, v) => {
  return regex(val, pattern, input, v);
};

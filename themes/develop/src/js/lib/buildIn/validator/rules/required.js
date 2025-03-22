import { getFormElements } from '../utils';

/**
 * Required validation rule
 * @type {import('../types').ValidationRule}
 */
export const required = (val, _, input) => {
  if (Array.isArray(input)) {
    return true;
  }
  if (input.type === 'checkbox' || input.type === 'radio') {
    if (input.form === null) {
      return true;
    }
    const inputs = getFormElements(input.form)
      .filter((element) => element.name === input.name)
      .filter((element) => !element.disabled);
    return inputs.some(({ checked }) => checked === true);
  }

  return !!val;
};

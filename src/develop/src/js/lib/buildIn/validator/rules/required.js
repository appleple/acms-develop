/**
 * Required validation rule
 * @type {import('../types').ValidationRule}
 */
export const required = (val, _, input, v) => {
  if (Array.isArray(input)) {
    return true;
  }
  if (input.type === 'checkbox' || input.type === 'radio') {
    if (input.form === null) {
      return true;
    }
    const inputs = Array.from(input.form.elements).filter(element => [v.field, `${v.field}[]`].includes(element.name)).filter(element => !element.disabled);
    return inputs.some(({ checked }) => checked === true);
  }

  return !!val;
};

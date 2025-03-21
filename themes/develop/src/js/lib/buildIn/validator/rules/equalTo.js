/**
 * Validates if the value equals to another input's value
 * @type {import('../types').ValidationRule}
 */
export const equalTo = (val, name, input) => {
  if (Array.isArray(input)) {
    return true;
  }

  if (input.form === null) {
    return true;
  }

  const input2 = input.form.elements.namedItem(name);

  if (input2 === null) {
    // バリデーション対象の要素がフォームの要素ではない場合は無効なルールとしてtrueを返す
    return true;
  }

  if (
    !(input2 instanceof HTMLInputElement) &&
    !(input2 instanceof HTMLSelectElement) &&
    !(input2 instanceof HTMLTextAreaElement) &&
    !(input2 instanceof HTMLButtonElement) &&
    !(input2 instanceof RadioNodeList)
  ) {
    // バリデーション対象の要素がフォームの要素ではない場合は無効なルールとしてtrueを返す
    return true;
  }

  return val === input2.value;
};

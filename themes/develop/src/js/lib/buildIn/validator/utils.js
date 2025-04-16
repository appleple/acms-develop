/**
 * 与えられた値が関数であるかを判定する Type Guard
 * @template T
 * @param {T} value - 判定対象の値
 * @returns {value is Function} `true` の場合、`value` は `Function` 型
 */
function isFunction(value) {
  return typeof value === 'function';
}

/**
 * フォームが紐付けられたフィールドを取得
 * @param {HTMLFormElement} form - フォーム
 * @returns {(HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement)[]} フィールドの配列
 */
function getFormElements(form) {
  // フォーム内のフィールドを取得
  const internalFields = Array.from(form.elements).filter((element) => !(element instanceof HTMLFieldSetElement));

  // form属性で紐付けられた外部フィールドを取得
  const externalFields = Array.from(document.querySelectorAll(`[form="${form.id}"]`)).filter(
    (element) =>
      element instanceof HTMLInputElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLButtonElement
  );

  return [...internalFields, ...externalFields];
}

export { isFunction, getFormElements };

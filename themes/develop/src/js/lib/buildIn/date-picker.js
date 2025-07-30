import flatPicker from 'flatpickr';
import flatPickerLangJa from 'flatpickr/dist/l10n/ja';
import 'flatpickr/dist/flatpickr.min.css';

/**
 * Date picker
 * @param {HTMLElement} element - Target element
 */
export default (element) => {
  const options = {
    allowInput: true,
    dateFormat: 'Y-m-d',
    locale: flatPickerLangJa.ja,
  };
  if (element.flatpickr !== undefined) {
    return;
  }
  options.defaultDate = element.value;
  const picker = flatPicker(element, options);
  element.setAttribute('autocomplete', 'off');
  element.addEventListener('change', (e) => {
    picker.jumpToDate(e.target.value);
    picker.setDate(e.target.value);
  });
  element.flatpickr = picker;
};

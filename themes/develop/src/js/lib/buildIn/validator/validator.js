import * as rules from './rules';
import { getFormElements, isFunction } from './utils';

/**
 * @type {import("./types").ValidatorOptions}
 */
const defaultOptions = {
  resultClassName: 'validator-result-',
  okClassName: 'valid',
  ngClassName: 'invalid',
  shouldScrollOnSubmitFailed: true,
  shouldFocusOnSubmitFailed: true,
  onInvalid: () => {},
  onValid: () => {},
  onValidated: () => {},
  onSubmitFailed: () => {},
  shouldValidate: 'onBlur',
  shouldRevalidate: 'onChange',
  shouldValidateOnSubmit: true,
  customRules: {},
};

class Validator {
  eventMap = {
    onBlur: ['focusout'],
    onChange: ['change', 'input'],
  };

  /**
   * constructor
   * @param {HTMLFormElement} form - The form element to validate
   * @param {import("./types").ValidatorOptions} option - The options for the validator
   */
  constructor(form, option = {}) {
    this.form = form;
    this.config = { ...defaultOptions, ...option };
    this.rules = { ...rules, ...this.config.customRules };
    this.eventRegistry = new Map();
    this.invalidFields = new Set();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRevalidate = this.handleRevalidate.bind(this);
    this.register();
  }

  /**
   * register event listener
   * @returns {void}
   */
  register() {
    if (this.config.shouldValidate !== false) {
      const eventNames = this.eventMap[this.config.shouldValidate];
      eventNames.forEach((eventName) => {
        document.addEventListener(eventName, this.handleChange);
        this.eventRegistry.set(document, [
          ...(this.eventRegistry.get(document) || []),
          { type: eventName, listener: this.handleChange },
        ]);
      });
    }
    // 失敗したフィールドの再バリデーション用のイベントリスナーを登録
    if (this.config.shouldRevalidate !== false) {
      const revalidateEventNames = this.eventMap[this.config.shouldRevalidate];
      revalidateEventNames.forEach((eventName) => {
        document.addEventListener(eventName, this.handleRevalidate);
        this.eventRegistry.set(document, [
          ...(this.eventRegistry.get(document) || []),
          { type: eventName, listener: this.handleRevalidate },
        ]);
      });
    }
    if (this.config.shouldValidateOnSubmit) {
      this.form.addEventListener('submit', this.handleSubmit);
      this.eventRegistry.set(this.form, [{ type: 'submit', listener: this.handleSubmit }]);
    }
  }

  /**
   * unregister event listener
   * @returns {void}
   */
  unregister() {
    for (const [element, listeners] of this.eventRegistry) {
      listeners.forEach(({ type, listener }) => {
        element.removeEventListener(type, listener);
      });
    }
    this.eventRegistry.clear();
  }

  /**
   * バリデーションルールを登録する
   * @param {string} name - ルールの名前
   * @param {import("./types").ValidationRule} rule - ルールの関数
   * @returns {void}
   */
  registerRule(name, rule) {
    this.rules[name] = rule;
  }

  /**
   * バリデーションルールを削除する
   * @param {string} name - ルールの名前
   * @returns {void}
   */
  unregisterRule(name) {
    delete this.rules[name];
  }

  /**
   * destroy
   * @returns {void}
   */
  destroy() {
    this.unregister();
  }

  /**
   * handleChange
   * @param {Event} event - The event to handle
   * @returns {void}
   */
  handleChange(event) {
    if (
      !(event.target instanceof HTMLInputElement) &&
      !(event.target instanceof HTMLSelectElement) &&
      !(event.target instanceof HTMLTextAreaElement)
    ) {
      return;
    }
    if (this.config.shouldValidate === false) {
      return;
    }

    if (this.form.noValidate) {
      return;
    }

    if (!this.getFields().includes(event.target)) {
      return;
    }
    this.checkValidity(event.target);
  }

  /**
   * handleRevalidate
   * @param {Event} event - The event to handle
   * @returns {void}
   */
  handleRevalidate(event) {
    if (
      !(event.target instanceof HTMLInputElement) &&
      !(event.target instanceof HTMLSelectElement) &&
      !(event.target instanceof HTMLTextAreaElement)
    ) {
      return;
    }

    if (this.config.shouldRevalidate === false) {
      return;
    }

    if (this.form.noValidate) {
      return;
    }

    if (!this.getFields().includes(event.target)) {
      return;
    }

    // 失敗したフィールドの場合のみ再バリデーション
    if (!this.invalidFields.has(event.target.name)) {
      return;
    }
    this.checkValidity(event.target);
  }

  /**
   * handleSubmit
   * @param {SubmitEvent} event - The event to handle
   * @returns {void}
   */
  handleSubmit(event) {
    if (this.form.noValidate) {
      return;
    }
    if (
      (event.submitter instanceof HTMLButtonElement || event.submitter instanceof HTMLInputElement) &&
      event.submitter.formNoValidate
    ) {
      return;
    }
    if (!this.config.shouldValidateOnSubmit) {
      return;
    }
    if (!this.checkFormValidity()) {
      event.preventDefault();
      event.stopPropagation();

      if (this.config.shouldScrollOnSubmitFailed) {
        this.scrollToInvalidElement().then(() => {
          if (this.config.shouldFocusOnSubmitFailed) {
            this.focusInvalidElement();
          }
        });
      }
      if (!this.config.shouldScrollOnSubmitFailed && this.config.shouldFocusOnSubmitFailed) {
        this.focusInvalidElement();
      }
    }
  }

  /**
   * フォーム要素のすべての検証を行う
   * @returns {ok: boolean; validationResults: import("./types").ValidationResult[]} - 検証結果
   */
  validateAll() {
    const fields = this.getFields().filter((field) => field.disabled === false); // disabledな要素はバリデーション対象外
    const names = [...new Set(fields.map((field) => field.name.replace(/\[[\d]*\]/, '')))];
    const nameToValidation = names.reduce((obj, name) => {
      const validations = this.extractValidations(name);
      if (validations.length === 0) {
        return obj;
      }
      return { ...obj, [name]: validations };
    }, {});
    const allValidations = Object.values(nameToValidation)
      .flat()
      .filter((validation) => validation.rule.substring(0, 4) === 'all_');
    const validationResults = [];
    allValidations.forEach((validation) => {
      const checkboxes = Array.from(fields).filter(
        (field) => field.name === validation.field || field.name === `${validation.field}[]`
      );
      const ok = this.rules[validation.rule]('', validation.arg, checkboxes, validation);
      this.label(validation.id, -1, ok);
      this.toggleClass(validation.field, ok);
      validationResults.push({
        ok,
        element: checkboxes,
        validation,
      });
    });
    fields.forEach((field) => {
      const validations = nameToValidation[field.name.replace(/\[[\d]*\]/, '')];
      if (typeof validations === 'undefined') {
        return;
      }
      const { ok, results } = this.validate(field, validations);
      this.toggleClass(field.name, ok);
      validationResults.push(...results);
    });
    const ok = validationResults.every((result) => result.ok);
    return {
      ok,
      validationResults,
    };
  }

  /**
   * フォーム要素の検証を行う
   * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} input - The input element to validate
   * @param {import("./types").Validation[]} validations - The validations to validate
   * @returns {ok: boolean; results: import("./types").ValidationResult[]} - 検証結果
   */
  validate(input, validations) {
    const matches = input.name.match(/\[([\d]+)\]/);
    const number = matches !== null ? parseInt(matches[1], 10) : -1;
    const results = [];
    if (validations.length > 0) {
      validations.forEach((validation) => {
        if (!validation || !validation.rule) {
          return;
        }
        if (!isFunction(this.rules[validation.rule])) {
          return;
        }
        if (validation.rule.substring(0, 4) === 'all_') {
          return;
        }
        if (
          input instanceof HTMLInputElement &&
          (input.type === 'checkbox' || input.type === 'radio') &&
          validation.rule !== 'required'
        ) {
          return;
        }
        const ok = this.rules[validation.rule](input.value, validation.arg, input, validation);
        results.push({
          ok,
          element: input,
          validation,
        });
        this.label(validation.id, number, ok);
      });
    }
    const ok = results.every((result) => result.ok);
    return {
      ok,
      results,
    };
  }

  /**
   * フォームの検証を行う
   * @returns {boolean} - 検証結果
   */
  checkFormValidity() {
    const { ok, validationResults } = this.validateAll();
    validationResults.forEach((result) => {
      if (Array.isArray(result.element)) {
        result.element.forEach((element) => {
          this.toggleAriaInvalid(element, result.ok);
          // 失敗フィールドを管理
          if (!result.ok) {
            this.invalidFields.add(element.name);
          } else {
            this.invalidFields.delete(element.name);
          }
        });
      } else {
        this.toggleAriaInvalid(result.element, result.ok);
        // 失敗フィールドを管理
        if (!result.ok) {
          this.invalidFields.add(result.element.name);
        } else {
          this.invalidFields.delete(result.element.name);
        }
      }
    });
    if (!ok) {
      this.config.onSubmitFailed(validationResults, this.form);
    }
    this.config.onValidated(validationResults, this.form);
    return ok;
  }

  /**
   * フォーム要素の検証を行う
   * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} input - The input element to validate
   * @returns {boolean} - 検証結果
   */
  checkValidity(input) {
    const validations = this.extractValidations(input.name);
    const { ok, results } = this.validate(input, validations);
    this.toggleClass(input.name, ok);
    this.toggleAriaInvalid(input, ok);
    if (ok) {
      this.invalidFields.delete(input.name);
      this.config.onValid(results, input);
    } else {
      this.invalidFields.add(input.name);
      this.config.onInvalid(results, input);
    }
    this.config.onValidated(results, input);
    return ok;
  }

  /**
   * name属性に対するバリデーションを抽出する
   * @param {string} name - The name of the input element to validate
   * @returns {import("./types").Validation[]} - The validations
   */
  extractValidations(name) {
    const replaced = name.replace(/\[[\d]*\]/, '');
    const inputs = Array.from(this.form.elements)
      .filter(
        (element) => element.name.startsWith(`${replaced}:validator#`) || element.name.startsWith(`${replaced}:v#`)
      )
      .filter((element) => !element.disabled);
    return inputs.reduce((validations, input) => {
      const element = input;
      const matchs = element.name.match(/^(.*):(validator|v)#(.*)$/);
      if (matchs === null) {
        return validations;
      }

      return [
        ...validations,
        {
          field: matchs[1],
          rule: matchs[3],
          arg: element.value,
          id: element.id,
          name: element.name,
        },
      ];
    }, []);
  }

  /**
   * フォームのフィールドを取得する
   * FieldSetElementはバリデーション対象外
   * @returns {(HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement)[]} - The fields
   */
  getFields() {
    const fields = getFormElements(this.form);
    return fields;
  }

  /**
   * ラベル要素を更新する
   * @param {string} id - ラベル要素のid
   * @param {number} number - ラベル要素の番号
   * @param {boolean} ok - ラベル要素の有効性
   * @returns {void}
   */
  label(id, number, ok) {
    const { resultClassName } = this.config;
    const label = document.querySelectorAll(`[data-validator-label="${id}"]`);
    let target = null;
    if (label.length < 1) {
      target = document.querySelector(`label[for="${id}"]`);
    }
    if (label.length === 1) {
      target = document.querySelector(`[data-validator-label="${id}"]`);
    }
    if (label.length > 1 && number > -1) {
      target = label[number];
    }
    if (target) {
      target.classList.remove(resultClassName);
      target.classList.remove(`${resultClassName}0`);
      target.classList.remove(`${resultClassName}1`);
      target.classList.add(`${resultClassName}${ok ? '1' : '0'}`);
    }
  }

  /**
   * クラスを切り替える
   * @param {string} name - クラスを切り替える要素のname属性
   * @param {boolean} ok - クラスを切り替える要素の有効性
   * @returns {void}
   */
  toggleClass(name, ok) {
    const { okClassName, ngClassName } = this.config;
    const fields = this.getFields();
    const elements = fields
      .filter((field) => field.name === name || field.name === `${name}[]`)
      .concat(Array.from(document.querySelectorAll(`[data-validator="${name.replace(/\[[\d]*\]/, '')}"]`)));
    if (elements.length > 0) {
      elements.forEach((element) => {
        if (ok) {
          element.classList.remove(ngClassName);
          element.classList.add(okClassName);
        } else {
          element.classList.remove(okClassName);
          element.classList.add(ngClassName);
        }
      });
    }
  }

  /**
   * aria-invalid属性を切り替える
   * @param {HTMLElement} element - The element to toggle aria-invalid
   * @param {boolean} ok - The validity of the element
   * @returns {void}
   */
  toggleAriaInvalid(element, ok) {
    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLTextAreaElement
    ) {
      element.setAttribute('aria-invalid', ok ? 'false' : 'true');
    }
  }

  /**
   * invalidな要素の内、最初の要素を返す
   * @returns {HTMLElement | null} - The invalid element
   */
  getInvalidElement() {
    const { ngClassName } = this.config;
    const fields = this.getFields();
    return fields.find((field) => field.classList.contains(ngClassName)) || null;
  }

  /**
   * 無効な要素までスクロールする
   * @returns {Promise<void>}
   */
  scrollToInvalidElement() {
    return new Promise((resolve) => {
      const element = this.getInvalidElement();
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        let isScrolling;

        const onScroll = () => {
          clearTimeout(isScrolling);
          isScrolling = setTimeout(() => {
            window.removeEventListener('scroll', onScroll);
            resolve();
          }, 100); // 100ms スクロールが停止したらスクロール終了と判断
        };

        window.addEventListener('scroll', onScroll);
      }
    });
  }

  /**
   * 無効な要素をフォーカスする
   * @returns {void}
   */
  focusInvalidElement() {
    const element = this.getInvalidElement();
    if (element) {
      element.focus();
    }
  }
}

export default Validator;

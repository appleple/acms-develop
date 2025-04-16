import * as rules from './rules';

/**
 * バリデーターの設定オプション
 * @typedef {Object} ValidatorOptions
 * @property {string} resultClassName - バリデーション結果のクラス名のプレフィックス
 * @property {string} okClassName - バリデーション成功時に付与されるクラス名
 * @property {string} ngClassName - バリデーション失敗時に付与されるクラス名
 * @property {boolean} shouldScrollOnSubmitFailed - バリデーション失敗時にスクロールするかどうか
 * @property {boolean} shouldFocusOnSubmitFailed - バリデーション失敗時に要素をフォーカスするかどうか
 * @property {function(ValidationResult[], HTMLFormElement): void} onSubmitFailed - 送信時のバリデーション失敗時のコールバック関数
 * @property {function(ValidationResult[], HTMLElement): void} onValid - バリデーション成功時のコールバック関数
 * @property {function(ValidationResult[], HTMLElement): void} onInvalid - バリデーション失敗時のコールバック関数
 * @property {function(ValidationResult[], HTMLElement): void} onValidated - バリデーション後に実行されるコールバック関数
 * @property {'onBlur' | 'onChange' | false} shouldValidate - バリデーションのタイミング
 * @property {'onBlur' | 'onChange' | false} shouldRevalidate - 再バリデーションのタイミング
 * @property {boolean} shouldValidateOnSubmit - 送信時にバリデーションを実行するかどうか
 * @property {Record<string, ValidationRule>} customRules - カスタムバリデーションルール
 */

/**
 * バリデーションルールの定義
 * @typedef {Object} Validation
 * @property {string} field - バリデーション対象のフィールド名
 * @property {keyof typeof rules} rule - 適用するバリデーションルール
 * @property {string} arg - バリデーションルールの引数
 * @property {string} id - バリデーション要素のid属性
 * @property {string} name - バリデーション要素のname属性
 */

/**
 * バリデーション結果
 * @typedef {Object} ValidationResult
 * @property {boolean} ok - バリデーションが成功したかどうか
 * @property {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement |
 * (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement)[]} element - バリデーション対象の要素
 * @property {Validation} validation - 適用されたバリデーションルール
 */

/**
 * バリデーションルールの型定義
 * @typedef {function(string, string, HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement |
 * (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement)[], Validation): boolean} ValidationRule
 */

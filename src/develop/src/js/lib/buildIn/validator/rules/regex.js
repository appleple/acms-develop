/**
 * Validates if the value matches the specified regular expression
 * @type {import('../types').ValidationRule}
 */
export const regex = (val, regex) => {
  if (!val) {
    return true;
  }
  let flag = '';
  let re = regex;
  if (regex.match(/^@(.*)@([igm]*)$/)) {
    re = RegExp.$1;
    flag = RegExp.$2;
  }
  return new RegExp(re, flag).test(val);
};

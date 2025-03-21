import Validator from "./validator";

export default (elm, options = {}) => {
  new Validator(elm, options);
};

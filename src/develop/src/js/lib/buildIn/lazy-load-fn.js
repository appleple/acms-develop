import lozad from 'lozad';

/**
 * Lazy loading function
 * @param {string} selector - selector
 * @param {function} isLazy - lazy loading condition
 * @param {function} run - run function
 * @return {void}
 */
export default (selector, isLazy, run) => {
  const observer = lozad(selector, {
    loaded: (el) => {
      if (isLazy(el)) {
        run(el);
      }
    },
  });
  observer.observe();
  [].forEach.call(document.querySelectorAll(selector), (item) => {
    if (!isLazy(item)) {
      run(item);
    }
  });
};

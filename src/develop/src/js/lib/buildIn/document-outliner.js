import DocumentOutliner from 'document-outliner';

const defaultOptions = {
  link: true,
  listType: 'ol',
  listClassName: 'acms-ol',
  itemClassName: 'acms-ol-item',
  linkClassName: 'scrollTo',
  anchorName: 'heading-$1',
  exceptClass: 'js-except',
  levelLimit: 5,
};

/**
 * Document Outliner
 * @param {Element} element
 * @param {object} options
 */
export default (element, options = {}) => {
  requestAnimationFrame(() => {
    const target = element.getAttribute('data-target');
    if (!target || !document.querySelector(target)) {
      return;
    }
    const outline = new DocumentOutliner(element);
    const overrideConfig = {};
    Object.keys(defaultOptions).forEach((key) => {
      let value = element.getAttribute(`data-${key}`);
      if (value) {
        if (isNaN(value) === false) {
          value = parseInt(value, 10);
        }
        if (value === 'true' || value === 'false') {
          value = value === 'true';
        }
        overrideConfig[key] = value;
      }
    });
    outline.makeList(target, { ...defaultOptions, ...options, ...overrideConfig });
  });
};

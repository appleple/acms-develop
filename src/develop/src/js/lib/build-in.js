import domContentLoaded from 'dom-content-loaded';
import lazyLoadJs from './buildIn/lazy-load';
import lazyLoadFn from './buildIn/lazy-load-fn';
import alertUnloadFn from './buildIn/alert-unload';
import scrollToFn from './buildIn/scroll-to';
import validatorFn from './buildIn/validator';
import { linkMatch, linkMatchFull, linkMatchContain } from './buildIn/link-match-location';

/**
 * Validator
 * @param {Document | Element} context
 * @param {string} selector
 */
const validator = (context, selector) => {
  domContentLoaded(async () => {
    const querySelector = selector || 'form.js-validator';
    const targets = context.querySelectorAll(querySelector);

    if (targets.length > 0) {
      [].forEach.call(targets, (target) => {
        validatorFn(target);
      });
    }
  });
};

/**
 * LinkMatchLocation
 * @param {Document | Element} context
 */
const linkMatchLocation = (context) => {
  domContentLoaded(() => {
    linkMatch(context, '.js-link_match_location'); // 部分一致
    linkMatchFull(context, '.js-link_match_location-full'); // 完全一致
    linkMatchContain(context, '.js-link_match_location-contain'); // data-match属性でカスタム判定
    // ToDo: ブログ、カテゴリ、エントリのマッチも実装する
  });
};

/**
 * ExternalLinks
 * @param {Document | Element} context
 */
const externalLinks = (context) => {
  const selector = 'a:not([target]):not([href^="javascript"]):not([href^="tel"])';
  const targets = context.querySelectorAll(selector);
  const innerlinkPtn = new RegExp(`${window.location.hostname}(:\\d+)*`);
  [].forEach.call(targets, (target) => {
    const href = target.getAttribute('href');
    if (innerlinkPtn.exec(href)) {
      return;
    }
    if (!/^(https?)?:/.test(href)) {
      return;
    }
    target.setAttribute('target', '_blank');
    target.setAttribute('rel', 'noopener noreferrer');
  });
};

/**
 * ScrollTo
 * @param {Document | Element} context
 * @param {string} selector
 */
const scrollTo = (context, selector) => {
  domContentLoaded(async () => {
    const querySelector = selector || '.scrollTo';
    const target = context.querySelector(querySelector);
    if (target) {
      scrollToFn(context, querySelector);
    }
  });
};

/**
 * AlertUnload
 * @param {Document | Element} context
 * @param {string} selector
 */
const alertUnload = (context, selector = '', force = false) => {
  domContentLoaded(async () => {
    const querySelector = selector || '.js-unload_alert';
    const targets = context.querySelectorAll(querySelector);
    if (targets.length > 0) {
      if (force) {
        alertUnloadFn(targets);
      } else {
        let isRegistered = false;
        [].forEach.call(targets, (target) => {
          target.addEventListener(
            'input',
            () => {
              if (isRegistered) {
                return;
              }
              alertUnloadFn(targets);
              isRegistered = true;
            },
            { once: true },
          );
        });
      }
    }
  });
};

/**
 * SmartPhoto
 * @param {Document | Element} context
 * @param {string} selector
 * @param {object} options
 */
const smartPhoto = (context, selector = '', options = {}) => {
  domContentLoaded(async () => {
    const querySelector = selector || 'a[data-rel^=SmartPhoto],.js-smartphoto';
    const targets = context.querySelectorAll(querySelector);
    if (targets.length > 0) {
      const { default: run } = await import('./buildIn/smart-photo');
      run(targets, options);
    }
  });
};

/**
 * LazyLoad
 * @param {Document | Element} context
 * @param {string} selector
 * @param {object} options
 */
const lazyLoad = (context, selector = '', options = {}) => {
  domContentLoaded(() => {
    const querySelector = selector || '.js-lazy-load';
    if (context.querySelector(querySelector)) {
      lazyLoadJs(querySelector, options);
    }
  });
};

/**
 * InView
 * @param {Document | Element} context
 * @param {string} selector
 */
const inView = (context, selector) => {
  domContentLoaded(() => {
    const querySelector = selector || '.js-lazy-contents';
    lazyLoadFn(
      querySelector,
      () => true,
      (item) => {
        const type = item.getAttribute('data-type');
        if (!type) {
          return;
        }
        const script = document.createElement(type);
        item.attributes.forEach((data) => {
          const matches = data.name.match(/^data-(.*)/);
          if (matches && matches[1] !== 'type') {
            script[matches[1]] = data.value;
          }
        });
        item.appendChild(script);
      },
    );
  });
};

/**
 * ModalVideo
 * @param {Document | Element} context
 * @param {string} selector
 * @param {object} options
 */
const modalVideo = (context, selector = '', options = {}) => {
  domContentLoaded(async () => {
    const querySelector = selector || '.js-modal-video';
    const targets = context.querySelectorAll(querySelector);
    if (targets.length > 0) {
      const { default: run } = await import('./buildIn/modal-video');
      run(targets, options);
    }
  });
};

/**
 * ScrollHint
 * @param {Document | Element} context
 */
const scrollHint = (context) => {
  domContentLoaded(async () => {
    if (context.querySelector('.js-scroll-hint') || context.querySelector('.js-table-unit-scroll-hint')) {
      const { default: run } = await import('./buildIn/scroll-hint');
      run('.js-scroll-hint', {});
      run('.js-table-unit-scroll-hint', { applyToParents: true });
    }
  });
};

/**
 * GoogleMap
 * @param {Document | Element} context
 * @param {string} selector
 */
const googleMap = (context, selector = '') => {
  domContentLoaded(async () => {
    const querySelector = selector || '[class^="column-map-"]>img:not(.js-s2d-ready),.js-s2d-ready';
    const targets = context.querySelectorAll(querySelector);
    if (targets.length > 0) {
      lazyLoadFn(
        querySelector,
        (elm) => elm.getAttribute('data-lazy') === 'true',
        async (item) => {
          const { default: run } = await import('./buildIn/google-map');
          run(item);
        },
      );
    }
  });
};

/**
 * OpenStreetMap
 * @param {Document | Element} context
 * @param {string} selector
 */
const openStreetMap = (context, selector = '') => {
  domContentLoaded(async () => {
    const querySelector = selector || '.js-open-street-map';
    const targets = context.querySelectorAll(querySelector);
    if (targets.length > 0) {
      lazyLoadFn(
        querySelector,
        (elm) => elm.getAttribute('data-lazy') === 'true',
        async (item) => {
          const { default: run } = await import('./buildIn/open-street-map');
          run(item);
        },
      );
    }
  });
};

/**
 * DatePicker
 * @param {Document | Element} context
 * @param {string} selector
 */
const datePicker = (context, selector = '') => {
  domContentLoaded(async () => {
    const querySelector = selector || '.js-datepicker2';
    const targets = context.querySelectorAll(querySelector);
    if (targets.length > 0) {
      lazyLoadFn(
        querySelector,
        () => true,
        async (item) => {
          const { default: run } = await import('./buildIn/date-picker');
          run(item);
        },
      );
    }
  });
};

/**
 * PdfPreview
 * @param {Document | Element} context
 * @param {string} selector
 */
const pdfPreview = (context, selector = '') => {
  domContentLoaded(async () => {
    const querySelector = selector || '.js-pdf-viewer';
    const targets = context.querySelectorAll(querySelector);
    if (targets.length > 0) {
      lazyLoadFn(
        querySelector,
        () => true,
        async (item) => {
          const { default: run } = await import('./buildIn/pdf-preview');
          run(item);
        },
      );
    }
  });
};

/**
 * FocusedImage
 * @param {Document | Element} context
 * @param {string} selector
 */
const focusedImage = (context, selector = '') => {
  domContentLoaded(async () => {
    const querySelector = selector || '.js-focused-image';
    const targets = context.querySelectorAll(querySelector);
    if (targets.length > 0) {
      lazyLoadFn(
        querySelector,
        () => true,
        async (item) => {
          const { default: run } = await import('./buildIn/focused-image');
          run(item);
        },
      );
    }
  });
};

/**
 * DocumentOutliner
 * @param {Element | Document} context
 * @param {string} selector
 * @param {object} options
 */
const documentOutliner = (context, selector = '.js-outline', options = {}) => {
  domContentLoaded(async () => {
    const targets = context.querySelectorAll(selector);
    if (targets.length > 0) {
      const { default: run } = await import(/* webpackChunkName: "document-outlier" */ './buildIn/document-outliner');
      targets.forEach((target) => {
        run(target, options);
        scrollTo(target);
      });
    }
  });
};

/**
 * UnitGroupAlign
 * @param {Document | Element} context
 */
const unitGroupAlign = (context) => {
  let timer;
  const align = () => {
    const unitGroups = context.querySelectorAll('.js-unit_group-align');
    let currentWidth = 0;
    let count = 0;

    clearTimeout(timer);

    timer = setTimeout(() => {
      [].forEach.call(unitGroups, (unit) => {
        const containerWidth = parseFloat(getComputedStyle(unit.parentNode, null).width.replace('px', ''));
        const unitW = unit.offsetWidth - 1;
        unit.style.clear = 'none';

        if (!unit.previousElementSibling || !unit.previousElementSibling.classList.contains('js-unit_group-align')) {
          currentWidth = 0;
          count = 0;
        }
        if (count > 0 && ((containerWidth - (currentWidth + unitW)) < -1)) {
          unit.style.clear = 'both';
          currentWidth = unitW;
          count = 1;
        } else {
          currentWidth += unitW;
          count += 1;
        }
      });
    }, 400);
  };
  window.addEventListener('resize', align);
  align();
};

export {
  validator,
  linkMatchLocation,
  externalLinks,
  scrollTo,
  alertUnload,
  smartPhoto,
  lazyLoad,
  inView,
  modalVideo,
  scrollHint,
  googleMap,
  openStreetMap,
  datePicker,
  pdfPreview,
  focusedImage,
  documentOutliner,
  unitGroupAlign,
};

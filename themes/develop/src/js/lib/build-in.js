import domContentLoaded from 'dom-content-loaded';
import alertUnloadFn from './buildIn/alert-unload';
import validatorFn from './buildIn/validator-fn';
import observeElement from './buildIn/observer-element';
import { linkMatch, linkMatchFull, linkMatchContain } from './buildIn/link-match-location';

/**
 * Validator
 * @param {Document | Element} context
 * @param {string} selector
 * @param {import("./buildIn/validator/types").ValidatorOptions} options
 */
const validator = (context, selector, options = {}) => {
  domContentLoaded(async () => {
    const querySelector = selector || 'form.js-validator';
    const targets = context.querySelectorAll(querySelector);

    if (targets.length > 0) {
      [].forEach.call(targets, (target) => {
        validatorFn(target, options);
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
            { once: true }
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
      [].forEach.call(targets, (item) => {
        observeElement(
          item,
          async (el) => {
            const { default: run } = await import('./buildIn/google-map');
            run(el);
          },
          { once: true }
        );
      });
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
      [].forEach.call(targets, (item) => {
        observeElement(
          item,
          async (el) => {
            const { default: run } = await import('./buildIn/open-street-map');
            run(el);
          },
          { once: true }
        );
      });
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
      [].forEach.call(targets, (item) => {
        observeElement(
          item,
          async (el) => {
            const { default: run } = await import('./buildIn/date-picker');
            run(el);
          },
          { once: true }
        );
      });
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
      [].forEach.call(targets, (item) => {
        observeElement(
          item,
          async (el) => {
            const { default: run } = await import('./buildIn/pdf-preview');
            run(el);
          },
          { once: true }
        );
      });
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
      [].forEach.call(targets, (item) => {
        observeElement(
          item,
          async (el) => {
            const { default: run } = await import('./buildIn/focused-image');
            run(el);
          },
          { once: true }
        );
      });
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
 * HTMX
 * @param {Document | Element} context
 */
const htmx = (context) => {
  domContentLoaded(async () => {
    const htmxMark = 'meta[name="acms-htmx"],[data-hx-get],[data-hx-post],[hx-get],[hx-post]'; // htmxを有効にする要素のセレクタ
    const htmxConfig = {
      historyCacheSize: -1, // ローカルストレージにHTMLをキャッシュしない（キャッシュすると戻る・進むが正常に動作しないため）
      refreshOnHistoryMiss: true, // キャッシュがなければページを再読込
    };
    const existsHtmx = context.querySelector(htmxMark);
    if (existsHtmx) {
      const { default: dispatchHtmx } = await import(/* webpackChunkName: "htmx" */ './buildIn/htmx');
      dispatchHtmx(htmxConfig);
    }
  });
};

export {
  validator,
  linkMatchLocation,
  externalLinks,
  alertUnload,
  smartPhoto,
  modalVideo,
  scrollHint,
  googleMap,
  openStreetMap,
  datePicker,
  pdfPreview,
  focusedImage,
  documentOutliner,
  htmx,
};

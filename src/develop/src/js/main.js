import 'vite/modulepreload-polyfill'
// import Alpine from 'alpinejs';
// import collapse from '@alpinejs/collapse';
import htmx from 'htmx.org';
import domContentLoaded from 'dom-content-loaded';
import Dispatcher from 'a-dispatcher';
import entryOutdated from './entryOutdated';
import scrollToInvalid from './scrollToInvalid';
import './lib/polyfill';
import {
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
} from './lib/build-in'; // ToDo: いらないものはコメントアウト

/**
 * スタイルの読み込み
 */
import '../style/main.css';

// async function loadAlpineModules() {
//   // enable code splitting
//   await import('./alpinejs');
//   Alpine.plugin(collapse);
// }

/**
 * BuildInJs Dispatcher
 * acms.js が読み込まれている場合は ACMS.Dispatch を返します。
 * 読み込まれていない場合は、独自のDispatcherを返します。
 * @returns {function(Document | Element): void}
 */
function createBuildInJsDispatcher() {
  if (window.ACMS !== undefined) {
    // フォームエラー時、エラーのある項目までスクロールする
    ACMS.Ready(() => {
      ACMS.addListener('acmsValidateFailed', (event) => {
        const formElm = event.target.querySelector('.js-validator');
        const parentClass = '.js-form-item';
        scrollToInvalid(formElm, parentClass);
      });
    });

    return ACMS.Dispatch
  }

  /**
   * BuildInJs Dispatcher
   * ToDo: 使わない組み込みJSはコメントアウト
   * @param {Document | Element} context
   * @return {void}
   */
  return function (context) {
    validator(context);
    linkMatchLocation(context);
    externalLinks(context);
    scrollTo(context);
    alertUnload(context);
    smartPhoto(context);
    lazyLoad(context);
    inView(context);
    modalVideo(context);
    scrollHint(context);
    googleMap(context);
    openStreetMap(context);
    datePicker(context);
    pdfPreview(context);
    focusedImage(context);
    documentOutliner(context);
    unitGroupAlign(context);
  };
}

async function main() {
  /**
   * Alpine.js
   */
  // await loadAlpineModules();
  // window.Alpine = Alpine;
  // Alpine.start();

  /**
   * htmx
   */
  window.htmx = htmx;

  addEventListener("htmx:configRequest", function(event) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    event.detail.headers['X-CSRF-Token'] = csrfToken;
  });

  addEventListener('htmx:beforeHistoryUpdate', function (event) {
    const proposedUrl = event.detail.history.path;
    let customUrl = proposedUrl;
    if (proposedUrl.includes('/include/htmx/')) {
      customUrl = proposedUrl.replace(/\/include\/htmx\/.*\.html/, '');
    }
    event.detail.history.path = customUrl;
  });

  addEventListener('htmx:afterSwap', function (event) {
    if (window.ACMS !== undefined) {
      ACMS.Dispatch(event.target);
    }
  });

  /**
   * Root
   */
  window.root = '/';

  /**
   * Setup BuildInJs
   */
  window.dispatch = createBuildInJsDispatcher();
  if (window.ACMS === undefined) {
    window.dispatch(document);
  }

  /**
   * Dispatcher
   */
  const dispatcher = new Dispatcher();

  // ダイナミックインポート
  // dispatcher.addRoute('^/app.html$', async () => {
  //   const { default: appPage } = await import('./path/to/app');
  //   appPage();
  // });

  // 通常のバンドル
  // dispatcher.addRoute('^/example/$', examplePage);
  dispatcher.addRoute('.html$', entryOutdated);

  dispatcher.run(window.location.pathname);

  /**
   * Content Ready
   */
  domContentLoaded(() => {
    /* PC nav */
    const childToggle = document.querySelectorAll('.js-child-toggle');
    childToggle && childToggle.forEach((toggle) => {
      toggle.addEventListener('click', (event) => {
        event.preventDefault();
        const _self = event.currentTarget;
        _self.classList.toggle('is-active');
      });
    });

    /* SP menu */
    const menu = document.querySelector('.js-menu');
    const menuToggle = document.querySelector('.js-menu-toggle');
    menuToggle && menuToggle.addEventListener('click', (event) => {
      const _self = event.currentTarget;
      _self.classList.toggle('is-active');
      menu.classList.toggle('is-active');
    });

    /* SP 下層メニュー */
    const spNavParent = document.querySelectorAll('.sp-nav-link:has(+ .sp-nav-wrap)');
    spNavParent && spNavParent.forEach((parent) => {
      parent.addEventListener('click', (event) => {
        event.preventDefault();
        parent.classList.toggle('is-active');
      });
    });

    // Copy URL
    const copyButton = document.getElementById('js-copy-button');
    const copyUrl = document.getElementById('js-copy-url');
    copyButton && copyButton.addEventListener('click', () => {
      const url = copyUrl.value;
      navigator.clipboard.writeText(url);
    });
  });
}

main();

import 'vite/modulepreload-polyfill'
import Alpine from 'alpinejs';
import domContentLoaded from 'dom-content-loaded';
import Dispatcher from 'a-dispatcher';
import entryOutdated from './entryOutdated';
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

async function loadAlpineModules() {
  // enable code splitting
  await import('./alpinejs');
}

/**
 * BuildInJs Dispatcher
 * acms.js が読み込まれている場合は ACMS.Dispatch を返します。
 * 読み込まれていない場合は、独自のDispatcherを返します。
 * @returns {function(Document | Element): void}
 */
function createBuildInJsDispatcher() {
  if (window.ACMS !== undefined) {
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
  await loadAlpineModules();
  window.Alpine = Alpine;
  Alpine.start();

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
    /**
     * htmx
     */
    (async () => {
      const { default: htmx } = await import('htmx.org');
      window.htmx = htmx;
      window.addEventListener("htmx:configRequest", function(event) {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
        event.detail.headers['X-CSRF-Token'] = csrfToken;
      });

      window.addEventListener('htmx:beforeHistoryUpdate', function (event) {
        const proposedUrl = event.detail.history.path;
        let customUrl = proposedUrl;
        if (proposedUrl.includes('/include/htmx/')) {
          customUrl = proposedUrl.replace(/\/include\/htmx\/.*\.html/, '');
        }
        event.detail.history.path = customUrl;
      });

      window.addEventListener('htmx:afterSwap', function (event) {
        window.dispatch(event.target);
      });
    })();

  });
}

main();

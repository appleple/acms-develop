import 'vite/modulepreload-polyfill'
import Alpine from 'alpinejs';
import htmx from 'htmx.org';
import domContentLoaded from 'dom-content-loaded';
// import Dispatcher from 'a-dispatcher';
import './lib/polyfill';
import edit from './edit';
import fonts from './fonts';
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

/**
 * エントリー編集画面
 */
edit();

/**
 * FontAwesome
 */
fonts();

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
  await loadAlpineModules();

  window.Alpine = Alpine;
  Alpine.start();

  window.htmx = htmx;

  /**
   * FontAwesome
   */
  fonts();

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
  // const dispatcher = new Dispatcher();

  // ダイナミックインポート
  // dispatcher.addRoute('^/app.html$', async () => {
  //   const { default: appPage } = await import('./path/to/app');
  //   appPage();
  // });

  // 通常のバンドル
  // dispatcher.addRoute('^/example/$', examplePage);

  // dispatcher.run(window.location.pathname);

  /**
   * Content Ready
   */
  domContentLoaded(() => {});
}

main();

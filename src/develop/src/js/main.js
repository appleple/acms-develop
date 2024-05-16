import 'vite/modulepreload-polyfill'
import Alpine from 'alpinejs';
import htmx from 'htmx.org';
import domContentLoaded from 'dom-content-loaded';
// import Dispatcher from 'a-dispatcher';
import './lib/polyfill';
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
  unitGroupAlign,
} from './lib/build-in'; // ToDo: いらないものはコメントアウト

/**
 * スタイルの読み込み
 */
import '../style/main.css';

/**
 * FontAwesome
 */
fonts();

async function loadAlpineModules() {
  // enable code splitting
  await import('./alpinejs');
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
   * BuildInJs
   * ToDo: 使わない組み込みJSはコメントアウト
   */
  if (window.ACMS === undefined) {
    window.dispatch = (context) => {
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
      unitGroupAlign(context);
    };
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

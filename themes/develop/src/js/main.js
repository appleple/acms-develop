import 'vite/modulepreload-polyfill';
import Alpine from 'alpinejs';
import domContentLoaded from 'dom-content-loaded';
import Dispatcher from 'a-dispatcher';
import './lib/polyfill';
import {
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
    return ACMS.Dispatch;
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
    alertUnload(context);
    smartPhoto(context);
    modalVideo(context);
    scrollHint(context);
    googleMap(context);
    openStreetMap(context);
    datePicker(context);
    pdfPreview(context);
    focusedImage(context);
    documentOutliner(context);
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
   * Setup BuildInJs
   */
  window.dispatch = createBuildInJsDispatcher();
  if (window.ACMS === undefined) {
    window.dispatch(document);
    // htmx (htmx_load_strategy: static) でスワップされたコンテンツに対しても組み込みJSを
    // 再初期化する。ACMS読み込み時は window.dispatch === ACMS.Dispatch であり、コア側の
    // スワップ後リスナーがそちらを呼ぶため、ここでは未読込時のみ実行して二重初期化を避ける。
    //
    // このテーマは htmx 2 系の CMS（Ver. 3.2）と htmx 4 系の CMS（Ver. 3.3 以降）の両方で使われる。
    // htmx 2 の htmx:afterSwap は挿入された要素ごとに発火するが、htmx 4 ではイベント名が変わったうえ、
    // htmx:after:swap はリクエスト元要素（DOM から外れた場合は挿入された先頭ノード。テキストノードの
    // こともある）に 1 回だけ発火する。htmx 4 では挿入されたノード一覧を持つ htmx:after:settle を使う。
    window.addEventListener('htmx:after:settle', (event) => {
      (event.detail?.newContent ?? []).forEach((node) => {
        if (node instanceof HTMLElement) {
          window.dispatch(node);
        }
      });
    });
    window.addEventListener('htmx:afterSwap', (event) => {
      // htmx 4 で htmx-2-compat 拡張を有効にすると htmx:afterSwap も発火するため、htmx 2 のときだけ扱う
      if (Number.parseInt(window.htmx?.version ?? '', 10) >= 4) {
        return;
      }
      if (event.target instanceof HTMLElement) {
        window.dispatch(event.target);
      }
    });
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

  dispatcher.run(window.location.pathname);

  /**
   * Content Ready
   */
  domContentLoaded(() => {});
}

main();

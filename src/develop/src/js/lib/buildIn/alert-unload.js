/**
 * フォームが変更された際にアラートを表示する
 * @param {NodeList} targets - フォーム要素
 * @return {void}
 */
export default (targets) => {
  const onBeforeunloadHandler = (e) => {
    e.returnValue = '入力途中のデータがあります';
  };
  window.addEventListener('beforeunload', onBeforeunloadHandler, false);
  if (targets.length > 0) {
    [].forEach.call(targets, (target) => {
      target.addEventListener('submit', () => {
        window.removeEventListener('beforeunload', onBeforeunloadHandler, false);
      });
    });
  }
};

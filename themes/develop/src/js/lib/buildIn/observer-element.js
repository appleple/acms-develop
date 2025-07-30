/**
 * 要素が画面に表示されたときにコールバックを発火するユーティリティ
 * @param {Element} el - 監視対象のDOM要素
 * @param {Function} callback - 表示されたときに呼び出す関数
 * @param {Object} [options] - IntersectionObserverのオプションと挙動設定
 * @param {boolean} [options.once=true] - 一度だけ発火するか（デフォルト true）
 * @param {Object} [options.observerOptions] - IntersectionObserver の native オプション（threshold など）
 */
export const observeElements = (el, callback, { once = true, observerOptions = {} } = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  };

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry.target, entry);
          if (once) {
            observerInstance.unobserve(entry.target);
          }
        }
      });
    },
    { ...defaultOptions, ...observerOptions }
  );

  observer.observe(el);
};

export default observeElements;

import htmx from 'htmx.org';

export const dispatchHtmx = (customConfig) => {
  if (window.htmx) {
    return;
  }
  window.htmx = htmx;

  Object.assign(htmx.config, {
    ...customConfig,
    allowEval: false,
  });

  window.addEventListener('htmx:configRequest', (event) => {
    const csrfTokenEl = document.querySelector('meta[name="csrf-token"]');
    if (csrfTokenEl && 'detail' in event) {
      event.detail.headers['X-CSRF-Token'] = csrfTokenEl.content;
    }
  });

  window.addEventListener('htmx:afterSwap', (event) => {
    if ('target' in event && event.target) {
      window.dispatch(event.target);
    }
  });

  document.addEventListener('click', (e) => {
    const target = e.target.closest('a[hx-get]');
    if (target) {
      e.preventDefault(); // ← これで遷移を止める
    }
  });

  htmx.process(document.body);
};

export default dispatchHtmx;

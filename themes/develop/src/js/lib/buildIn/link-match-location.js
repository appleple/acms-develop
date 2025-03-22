const stayClass = 'stay';

/**
 * matches
 * @param {HTMLElement} el
 * @param {string} selector
 * @return {boolean}
 */

const matches = (el, selector) =>
  (
    el.matches ||
    el.matchesSelector ||
    el.msMatchesSelector ||
    el.mozMatchesSelector ||
    el.webkitMatchesSelector ||
    el.oMatchesSelector
  ).call(el, selector);

/**
 *
 * @param {HTMLElement} elm
 * @return {string | false}
 */
const getHref = (elm) => {
  if (matches(elm, 'a')) {
    return elm.getAttribute('href');
  }
  const a = elm.querySelectorAll('a');
  if (a.length === 0) {
    return false;
  }
  return a[0].getAttribute('href');
};

/**
 * @param {HTMLElement} elm
 * @param {'part' | 'full'} mode
 */
const match = (elm, mode) => {
  let href = getHref(elm);
  let locationHref = document.location.href;
  if (!href) {
    return;
  }
  href = href.replace(/https?/, '');
  locationHref = locationHref.replace(/https?/, '');
  if (mode === 'part') {
    if (locationHref.indexOf(href) === 0 || encodeURI(locationHref).indexOf(href) === 0) {
      elm.classList.add(stayClass);
    }
  } else if (mode === 'full') {
    if (locationHref === href || encodeURI(locationHref) === href) {
      elm.classList.add(stayClass);
    }
  }
};

/**
 * @param {Document | Element} context
 * @param {string} selector
 */
const linkMatch = (context, selector) => {
  const links = context.querySelectorAll(selector);
  if (links.length > 0) {
    [].forEach.call(links, (link) => {
      match(link, 'part');
    });
  }
};

/**
 * @param {Document | Element} context
 * @param {string} selector
 */
const linkMatchFull = (context, selector) => {
  const links = context.querySelectorAll(selector);
  if (links.length > 0) {
    [].forEach.call(links, (link) => {
      match(link, 'full');
    });
  }
};

/**
 * @param {Document | Element} context
 * @param {string} selector
 */
const linkMatchContain = (context, selector) => {
  const links = context.querySelectorAll(selector);
  if (links.length > 0) {
    [].forEach.call(links, (link) => {
      if (document.location.pathname.indexOf(link.getAttribute('data-match')) !== -1) {
        link.classList.add(stayClass);
      }
    });
  }
};

export { linkMatch, linkMatchFull, linkMatchContain };

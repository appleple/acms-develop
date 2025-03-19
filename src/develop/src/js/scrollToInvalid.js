import scrollToElement from 'scroll-to-element';

export default (formElm, parentClass, targetClass = '.invalid') => {
  const invalidItem = formElm.querySelector(targetClass)
  if (!invalidItem) return;

  const parentItem = invalidItem.closest(parentClass) || formElm;
  scrollToElement(parentItem, {
    offset: 0,
    ease: 'in-out-quad',
    duration: 800,
  });
}
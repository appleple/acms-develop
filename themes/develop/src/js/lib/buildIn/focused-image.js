import { FocusedImage } from 'image-focus';

/**
 * @param {HTMLImageElement} target
 */
export default (target) => {
  target.style.visibility = 'visible';
  new FocusedImage(target);
};

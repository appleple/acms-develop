import mountPdfPreview from '@ablogcms/pdf/preview-controller';

const config = {
  previewMark: '.js-preview', // 実際にプレビュー画像を表示する img 要素のクラス名
  prevBtnMark: '.js-prev', // 次ページのボタンにつけるクラス名
  nextBtnMark: '.js-next', // 前ページのボタンにつけるクラス名
  pdfAttr: 'data-pdf', // 対象のPDFのパスのdata属性名
  widthAttr: 'data-width', // 幅指定のdata属性名
  pageAttr: 'data-page', // 表示するページ数のdata属性名
  showBtnClass: 'acms-admin-block', // PDFのページ送りボタンがある場合につくクラス名
};

/**
 * Pdf Preview
 * @param {HTMLElement} target
 */
export default (target) => {
  // eslint-disable-next-line no-undef
  const baseUrl = `${window.root}themes/${THEME_NAME}/dist/pdfjs/`;
  return mountPdfPreview(target, {
    ...config,
    workerSource: {
      workerSrc: `${baseUrl}pdf.worker.min.mjs`,
      cMapUrl: `${baseUrl}cmaps/`,
      cMapPacked: true,
      wasmUrl: `${baseUrl}wasm/`,
    },
  });
};

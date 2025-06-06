import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';

export default class Pdf2Image {
  /**
   * Constructor
   *
   * @param url
   */
  constructor(url) {
    this.url = url;
    // eslint-disable-next-line no-undef
    this.baseUrl = `${window.root}themes/${THEME_NAME}/dist/pdfjs/`;
    this.currentPage = 1;
    this.numPages = -1;
    this.document = null;
    pdfjs.GlobalWorkerOptions.workerSrc = `${this.baseUrl}pdf.worker.min.mjs`;
  }

  async hasPrevPage() {
    return this.currentPage > 1;
  }

  async hasNextPage() {
    if (this.numPages < 1) {
      this.numPages = await this.getPages();
    }
    if (this.currentPage < this.numPages) {
      return true;
    }
    return false;
  }

  async getPrevImage(width = 0) {
    if (await this.hasPrevPage()) {
      return this.getPageImage(this.currentPage - 1, width);
    }
    return false;
  }

  async getNextImage(width = 0) {
    if (await this.hasNextPage()) {
      return this.getPageImage(this.currentPage + 1, width);
    }
    return false;
  }

  async getPages() {
    try {
      const pdfDocument = await this.getDocument();
      return pdfDocument.numPages;
    } catch {
      return false;
    }
  }

  async getPageImage(page, width = 0) {
    try {
      const canvas = document.createElement('canvas');
      await this.toCanvas(canvas, page, width);
      this.currentPage = page;
      return canvas.toDataURL('image/jpeg');
    } catch {
      return false;
    }
  }

  async toCanvas(canvas, page, width) {
    const pdfDocument = await this.getDocument();
    const pdfPage = await pdfDocument.getPage(page);
    let viewport = pdfPage.getViewport({ scale: 1 });
    if (width > 0) {
      const ratio = width / viewport.width;
      viewport = pdfPage.getViewport({ scale: ratio });
    }

    const IMAGE_RESOLUTION = 150; // widthが指定されていない場合の解像度
    const outputScale = width > 0 ? 1 : IMAGE_RESOLUTION / 72.0;

    canvas.height = Math.floor(viewport.height * outputScale);
    canvas.width = Math.floor(viewport.width * outputScale);

    const context = canvas.getContext('2d');
    context.save();
    context.fillStyle = "rgb(255, 255, 255)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();

    return pdfPage.render({
      canvasContext: context,
      transform: [outputScale, 0, 0, outputScale, 0, 0],
      viewport,
    }).promise;
  }

  getDocument() {
    return new Promise((resolve, reject) => {
      if (this.document) {
        resolve(this.document);
      }
      try {
        const src = {
          cMapUrl: `${this.baseUrl}cmaps/`,
          cMapPacked: true,
        };
        if (typeof this.url === 'string') {
          src.url = this.url;
        } else {
          src.data = this.url;
        }
        pdfjs.getDocument(src).promise.then((document) => {
          this.document = document;
          resolve(this.document);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}

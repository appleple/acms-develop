import Alpine from 'alpinejs';

const name = 'sideMenu';

// サイドメニューの目次をクリックした際に要素をスクロールさせる
function component() {
  return {
    isShowSideMenu: false,
    toggleSideMenu() {
      this.isShowSideMenu = !this.isShowSideMenu;
    },
    handleSmoothScroll(event) {
      const eventTarget = event.target;

      if (eventTarget.classList.contains('js-scroll')) {
        event.preventDefault();

        const target = eventTarget.getAttribute('href');
        const targetElement = document.querySelector(target);
        const offset = window.matchMedia('(min-width: 1024px)').matches ? 0 : 80;

        window.scrollTo({
          top: targetElement.offsetTop - offset,
          behavior: 'smooth'
        });

        this.toggleSideMenu();
      }
    },
  }
}
Alpine.data(name, component);

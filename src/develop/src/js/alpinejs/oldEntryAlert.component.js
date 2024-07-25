import Alpine from 'alpinejs';

const name = 'oldEntryAlert';

// 公開から1年以上経過後、アラートを表示する
function component(udate) {
  return {
    isOldEntry: false,
    elapsedYears: 0,
    init() {
      const updateDate = new Date(udate);
      const now = new Date();
      const aYearAgo = new Date();
      aYearAgo.setFullYear(now.getFullYear() - 1);
      if (updateDate < aYearAgo) {
        this.isOldEntry = true;
        this.elapsedYears = now.getFullYear() - updateDate.getFullYear();
      }
    },
  }
}
Alpine.data(name, component);

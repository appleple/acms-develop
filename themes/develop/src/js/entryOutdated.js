/**
 * 「この記事は最終更新日から年以上経過しています」の警告表示
 */

export default () => {
  function _checkOutdated(element) {
    const updatedAt = new Date(element.dataset.updatedAt);
    const now = new Date();
    const diff = now.getTime() - updatedAt.getTime();
    const diffDays = diff / (1000 * 60 * 60 * 24);
    return [diffDays > 365, Math.floor(diffDays / 365)];
  }

  const outdatedAlert = document.getElementById('js-outdated-alert');
  const outdatedYear = document.getElementById('js-outdated-year');

  if (outdatedAlert && _checkOutdated(outdatedAlert)[0]) {
    outdatedYear.textContent = _checkOutdated(outdatedAlert)[1];
    outdatedAlert.classList.remove('hidden');
    outdatedAlert.classList.add('flex');
  }
};

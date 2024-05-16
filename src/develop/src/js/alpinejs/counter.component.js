import Alpine from 'alpinejs';

const name = 'counter';
function component() {
  return {
    init() {
      console.log('example counter: init');
    },
    get count() {
      return this.$store.counter.count;
    },
  }
}
Alpine.data(name, component);

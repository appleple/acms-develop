import Alpine from 'alpinejs';

const name = 'counter';

const store = {
  count: 0,
  increment() {
    this.count++
  },
  decrement() {
    this.count--
  }
};

Alpine.store(name, store);

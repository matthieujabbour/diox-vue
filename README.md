# diox-vue

Official diox connector for VueJS

## Installation

```bash
yarn add diox-vue
```

## Usage

```typescript

// main.js
// --------------------------

import Vue from 'vuejs';
import Counter from './counter.vue';

const app = new Vue({
  el: '#app',
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})

// counter.vue
// --------------------------
import Vue from 'vuejs';
import connect from 'diox-vue';
import store from './store.js';

export default connect(store, {
  'my-module': newState => ({ count: newState.count }),
})(({ dispatch }) => ({
  template: `<div>{{ count }}</div>`,
  data: {
    count: 0,
  },
  methods: {
    doSomething() {
      dispatch('my-module', 'incrementAsync');
    },
  },
}));

```

## License

[MIT](https://github.com/matthieujabbour/diox-vue/blob/master/LICENSE)

Copyright (c) 2018 - present, Matthieu Jabbour.

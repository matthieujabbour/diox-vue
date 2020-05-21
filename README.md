# diox-vue

Official [diox](https://github.com/matthieujabbour/diox) connector for VueJS.

[![Build Status](https://travis-ci.org/matthieujabbour/diox-vue.svg?branch=master)](https://travis-ci.org/matthieujabbour/diox-vue)
[![Coverage Status](https://coveralls.io/repos/github/matthieujabbour/diox-vue/badge.svg)](https://coveralls.io/github/matthieujabbour/diox-vue)
[![npm version](https://badge.fury.io/js/diox-vue.svg)](https://badge.fury.io/js/diox-vue)
[![Downloads](https://img.shields.io/npm/dm/diox-vue.svg)](https://www.npmjs.com/package/diox-vue)


## Installation

```bash
yarn add diox-vue
```


## Usage

```typescript

// main.js
// --------------------------

import Vue from 'vuejs';
import Counter from './Counter.vue';

const app = new Vue({
  el: '#app',
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})


// store.js
// --------------------------
import { Store } from 'diox';

const store = new Store();
store.register('my-module', {
  mutator: ({ state }, mutation) => {
    switch (mutation) {
      case 'INCREMENT':
        return {
          count: state.count + 1,
        };
      default:
        return Object.assign({}, state || { count: 0 }};
    }
  },
  dispatcher: ({ mutate, hash }, action) => {
    switch (action) {
      case 'incrementAsync':
        setTimeout(() => {
          mutate(hash, 'INCREMENT');
        }, 1000);
        break;
      default:
        break;
    }
  },
});

export default store;


// Counter.vue
// --------------------------
<template>
  <div @click="doSomething">{{ count }}</div>
</template>

<script>
import Vue from 'vuejs';
import connect from 'diox-vue';
import store from './store.js';

const mapper = {
  'my-module': newState => ({ count: newState.count }),
};

export default connect(store, mapper)(({ dispatch }) => ({
  name: 'Counter',
  methods: {
    doSomething() {
      dispatch('my-module', 'incrementAsync');
    },
  },
}));
</script>
```


## API documentation

You can find the full API documentation [here](https://matthieujabbour.github.io/diox-vue)


## Contributing

See the [Contribution guide](https://github.com/matthieujabbour/diox-vue/blob/master/CONTRIBUTING.md)


## License

[MIT](https://github.com/matthieujabbour/diox-vue/blob/master/LICENSE)

Copyright (c) Matthieu Jabbour.

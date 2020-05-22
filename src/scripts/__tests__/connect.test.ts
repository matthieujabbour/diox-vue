/**
 * Copyright (c) 2018 - present, Inbenta France.
 * All rights reserved.
 */

import Vue from 'vue';
import { Store } from 'diox';
import connect from 'scripts/connect';

/** Any valid JavaScript primitive. */
type mixed = any; // eslint-disable-line @typescript-eslint/no-explicit-any

jest.mock('vue');
jest.mock('diox');

describe('main', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should correctly connect component to diox Store', () => {
    const store = new Store();
    const container = connect(store, {
      'my-module': (newState) => ({ count: newState.count }),
    })(({ mutate }) => ({
      name: 'MyComponent',
      methods: {
        test(): void {
          mutate('my-module', 'INCREMENT');
        },
      },
    }));
    expect(container.name).toBe('MyComponent');

    // Simulating VueJS component's mounting...
    (container as mixed).mounted();
    expect(Vue.extend).toHaveBeenCalledTimes(1);
    expect(store.subscribe).toHaveBeenCalledTimes(1);
    expect(store.unsubscribe).toHaveBeenCalledTimes(0);
    expect((container as mixed).count).toBe(5);
    expect((container as mixed).$subscriptions).toEqual([1]);

    // Simulating VueJS component's destruction...
    (container as mixed).beforeDestroy();
    expect(store.unsubscribe).toHaveBeenCalledTimes(1);
    expect((container as mixed).$subscriptions).toEqual([]);
  });
});

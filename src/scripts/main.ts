/**
 * Copyright 2017 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */

// prettier-ignore
import Vue from 'vue';

/* tslint:disable */

/**
 *
 * @param {object} mapper
 * @param {object} Component
 * @return {ExtendedVue<Vue, any, any, any, Record<never, any>>}
 */
export default function connect(store: any, mapper: any): any {
  return (component: any) => {
    const Container: any = component({
      dispatch: store.dispatch.bind(store),
      mutate: store.mutate.bind(store)
    });
    return Vue.extend({
      mixins: [
        {
          _subscriptions: [],
          mounted() {
            this._subscriptions = [];
            Object.keys(mapper).forEach((combiner: any) => {
              this._subscriptions.push(
                store.subscribe(combiner, (newState: any) => {
                  const newData = mapper[combiner](newState);
                  Object.keys(newData).forEach((key: any) => {
                    this[key] = newData[key] as any;
                  });
                })
              );
            });
          },
          beforeDestroy() {
            Object.keys(mapper).forEach((combiner) => {
              store.unsubscribe(combiner, this._subscriptions.shift());
            });
          }
        } as any,
        Container as any
      ] as any
    });
  };
}

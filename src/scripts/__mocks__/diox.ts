/**
 * Copyright (c) Matthieu Jabbour.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/** Any valid JavaScript primitive. */
type mixed = any; // eslint-disable-line @typescript-eslint/no-explicit-any

function Store(): mixed {
  return {
    subscribe: jest.fn((_hash, callback) => {
      callback({ count: 5 });
      return 1;
    }),
    unsubscribe: jest.fn(),
    dispatch: jest.fn(),
    mutate: jest.fn(),
  };
}

export {
  Store, // eslint-disable-line import/prefer-default-export
};

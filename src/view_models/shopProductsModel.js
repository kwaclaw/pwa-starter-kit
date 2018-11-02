
/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { observable } from '@nx-js/observer-util';

export default class {
  constructor(owner, productMap) {
    this._owner = owner;
    this._moveToCart = (event) => this._owner.addToCart(event.detail.itemId);
    this._map = productMap;
    return observable(this);
  }

  getKeys() {
    return Object.keys(this._map);
  }

  get(itemId) {
    return this._map[itemId];
  }

  add(itemId) {
    const item = this._map[itemId];
    if (item) {
      item.inventory++;
      return true;
    }
    return false;
  }

  remove(itemId) {
    const item = this._map[itemId];
    if (!!item && item.inventory > 0) {
      item.inventory--;
      return true;
    }
    return false;
  }
}

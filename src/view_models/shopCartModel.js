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

export class ShopCartModel {
  constructor(owner) {
    this._owner = owner;
    this.items = observable([]);
    return observable(this);
  }

  getTotal() {
    const totalPrice = this.items.reduce((total, item) => total + (item.price * item.amount), 0);
    return Math.round(totalPrice * 100) / 100;
  }

  getCount() {
    return this.items.reduce((count, item) => count + item.amount, 0);
  }

  add(itemId) {
    const item = this.items.find(i => i.id == itemId);
    if (item) {
      item.amount++;
    } else {
      const product = this._owner.getProduct(itemId);
      if (!product) {
        return;
      }
      const newItem = {
        id: product.id,
        name: product.title,
        price: product.price,
        amount: 1,
        remove: event => this._owner.removeFromCart(product.id),
      };
      this.items.push(observable(newItem));
    }
  }

  remove(itemId) {
    const itemIndex = this.items.findIndex(item => item.id == itemId);
    if (itemIndex >= 0) {
      const item = this.items[itemIndex];
      item.amount--;
      if (item.amount <= 0) {
        this.items.splice(itemIndex, 1);
      }
      return true;
    }
    return false;
  }

  clear() {
    this.items.length = 0;
  }
}

/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';
import { ModelBoundElement } from './model-bound-element.js';
import './shop-item.js';

class ShopCart extends ModelBoundElement {
  render() {
    return html`
      <style>
        :host { display: block; }
      </style>
      <p ?hidden="${this.model.items.length !== 0}">Please add some products to cart.</p>
      ${repeat(this.model.items, (item) => item.id, (item) => 
        html`
          <div>
            <shop-item .model=${item}></shop-item>
          </div>
        `
      )}
      <p ?hidden="${!this.model.items.length}"><b>Total:</b> ${this.model.getTotal()}</p>
    `;
  }
}

window.customElements.define('shop-cart', ShopCart);

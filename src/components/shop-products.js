/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from '@polymer/lit-element';

// These are the elements needed by this element.
import './product-item.js';

// These are the elements needed by this element.
import { addToCartIcon } from './my-icons.js';

// These are the shared styles needed by this element.
import { ButtonSharedStyles } from './button-shared-styles.js';

import { observable } from '@nx-js/observer-util';
import { ModelBoundElement } from './model-bound-element.js';

class ShopProducts extends ModelBoundElement {
  render() {
    return html`
      ${ButtonSharedStyles}
      <style>
        :host { display: block; }
      </style>
      ${Object.keys(this.model).map((key) => {
        const product = this.model[key];
        // need to alias property names
        const item = observable(product);
        return html`
          <div>
            <product-item .model="${item}"></product-item>
            <button
                .disabled="${item.inventory === 0}"
                @click="${this._addToCart}"
                data-index="${item.id}"
                title="${item.inventory === 0 ? 'Sold out' : 'Add to cart' }">
              ${item.inventory === 0 ? 'Sold out': addToCartIcon }
            </button>
          </div>
        `
      })}
    `;
  }

 _addToCart(event) {
    this.dispatchEvent(new CustomEvent("addToCart",
        {bubbles: true, composed: true, detail:{item:event.currentTarget.dataset['index']}}));
  }
}

window.customElements.define('shop-products', ShopProducts);

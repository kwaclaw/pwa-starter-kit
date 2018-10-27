/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from '@polymer/lit-element';

// These are the elements needed by this element.
import './shop-item.js';

// These are the elements needed by this element.
import { addToCartIcon } from './my-icons.js';

// These are the shared styles needed by this element.
import { ButtonSharedStyles } from './button-shared-styles.js';

import { observe, unobserve } from '@nx-js/observer-util';
import { ModelBoundElement } from './model-bound-element.js';

// private observer callback
function productsChanged(instance, products) {
  instance.update(products);
}

class ShopProducts extends ModelBoundElement {
  render() {
    return html`
      ${ButtonSharedStyles}
      <style>
        :host { display: block; }
      </style>
      ${Object.keys(this.model).map((key) => {
        const item = this.model[key];
        return html`
          <div>
            <shop-item name="${item.title}" amount="${item.inventory}" price="${item.price}"></shop-item>
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

  connectedCallback() {
    super.connectedCallback();
    this._productsObserver = observe(() => productsChanged(this, this.model.products), { lazy: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    unobserve(this._productsObserver);
  }

  // this starts the observation process, we dont' want to do it on observer
  // creation because the observed properties might still be undefined at that time.
  firstUpdated() {
    this._productsObserver();
  }

 _addToCart(event) {
    this.dispatchEvent(new CustomEvent("addToCart",
        {bubbles: true, composed: true, detail:{item:event.currentTarget.dataset['index']}}));
  }
}

window.customElements.define('shop-products', ShopProducts);

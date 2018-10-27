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
import { removeFromCartIcon } from './my-icons.js';
import './shop-item.js';

// These are the shared styles needed by this element.
import { ButtonSharedStyles } from './button-shared-styles.js';

import { observe, unobserve } from '@nx-js/observer-util';
import { ModelBoundElement } from './model-bound-element.js';

// private observer callback
function cartChanged(instance, cart) {
  instance.update(cart);
}

class ShopCart extends ModelBoundElement {
  render() {
    return html`
      ${ButtonSharedStyles}
      <style>
        :host { display: block; }
      </style>
      <p ?hidden="${this.model.items.length !== 0}">Please add some products to cart.</p>
      ${this.model.items.map((item) =>
        html`
          <div>
            <shop-item .name="${item.title}" .amount="${item.amount}" .price="${item.price}"></shop-item>
            <button
                @click="${this._removeFromCart}"
                data-index="${item.id}"
                title="Remove from cart">
              ${removeFromCartIcon}
            </button>
          </div>
        `
      )}
      <p ?hidden="${!this.model.items.length}"><b>Total:</b> ${this.model.getTotal()}</p>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._cartObserver = observe(() => cartChanged(this, this.model), { lazy: true });
  }

  disconnectedCallback()  {
    super.disconnectedCallback();
    unobserve(this._cartObserver);
  }

  // this starts the observation process, we dont' want to do it on observer
  // creation because the observed properties might still be undefined at that time.
  firstUpdated() {
    this._cartObserver();
  }

  _removeFromCart(event) {
    this.model.remove(event.currentTarget.dataset['index']);
  }
}

window.customElements.define('shop-cart', ShopCart);

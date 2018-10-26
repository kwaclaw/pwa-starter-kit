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

import { observable, observe } from '@nx-js/observer-util';
import { ModelBoundElement } from './model-bound-element.js';

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

  static get properties() { return {
    model: { type: Object },
  }}

  connectedCallback() {
    super.connectedCallback();
    this.model = this._getModel();
  
    this._cartObserver = observe(() => {
      const i = this.model.items;
      this.update(i);
    });
  }

  disconnectedCallback()  {
    super.disconnectedCallback();
    this._cartObserver.unobserve();
  }

  _removeFromCart(event) {
    this.model.remove(event.currentTarget.dataset['index']);
  }
}

window.customElements.define('shop-cart', ShopCart);

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
import { PageViewElement } from './page-view-element.js';

// These are the elements needed by this element.
import './shop-products.js';
import './shop-cart.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import { ButtonSharedStyles } from './button-shared-styles.js';
import { addToCartIcon } from './my-icons.js';

import { observable, observe } from '@nx-js/observer-util';

class MyView3 extends PageViewElement {
  render() {
    return html`
      ${SharedStyles}
      ${ButtonSharedStyles}
      <style>
        button {
          border: 2px solid var(--app-dark-text-color);
          border-radius: 3px;
          padding: 8px 16px;
        }
        button:hover {
          border-color: var(--app-primary-color);
          color: var(--app-primary-color);
        }
        .cart, .cart svg {
          fill: var(--app-primary-color);
          width: 64px;
          height: 64px;
        }
        .circle.small {
          margin-top: -72px;
          width: 28px;
          height: 28px;
          font-size: 16px;
          font-weight: bold;
          line-height: 30px;
        }
      </style>

      <section>
        <h2>State container example: shopping cart</h2>
        <div class="cart">${addToCartIcon}<div class="circle small">${this.model.cart.getCount()}</div></div>

        <p>This is a slightly more advanced example, that simulates a
          shopping cart: getting the products, adding/removing items to the
          cart, and a checkout action, that can sometimes randomly fail (to
          simulate where you would add failure handling). </p>
        <p>This view, passes properties down to its two children, <code>&lt;shop-products&gt;</code> and
        <code>&lt;shop-cart&gt;</code>, which fire events back up whenever
        they need to communicate changes.</p>
      </section>
      <section>
        <h3>Products</h3>
        <shop-products .products="${this.model.products}"></shop-products>

        <br>
        <h3>Your Cart</h3>
        <shop-cart></shop-cart>

        <div>${this.model.error}</div>
        <br>
        <p>
          <button ?hidden="${this.model.cart.items.length == 0}"
              @click="${() => this.model.checkout()}">
            Checkout
          </button>
        </p>
      </section>
    `;
  }

  constructor() {
    super();
    this._getModelHandler = (event) => {
      switch (event.detail.sender.tagName) {
        case 'SHOP-CART':
          event.detail.model = this.model.cart;
          break;
        case 'SHOP-PRODUCTS':
          event.detail.model = this.model.products;
          break;
        default:
          event.detail.model = null;
          return;
      }
      event.stopPropagation();
    };
  }

  _addToCart(e) {
    this.model.addToCart(e.detail.item);
  }

  connectedCallback() {
    super.connectedCallback();
    // Set the 'get-model' listener as early as possible, as any async operation
    // (e.g. async event) may trigger a 'get-model' event from a child component.
    this.addEventListener('get-model', this._getModelHandler);
    this.addEventListener('addToCart', this._addToCart);

    this._productsObserver = observe(() => {
      const p = this.model.products;
      this.update(p);
    });
  }

  disconnectedCallback()  {
    super.disconnectedCallback();
    this.removeEventListener('get-model', this._getModelHandler);
    this.removeEventListener('addToCart', this._addToCart);
    this._productsObserver.unobserve();
  }
}

window.customElements.define('my-view3', MyView3);

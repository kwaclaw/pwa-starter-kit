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
import { css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the elements needed by this element.
import './shop-products.js';
import './shop-cart.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import { ButtonSharedStyles } from './button-shared-styles.js';
import { addToCartIcon } from './my-icons.js';

import { observe, unobserve } from '@nx-js/observer-util';

class MyView3 extends PageViewElement {
  static get properties() {
    return {
      // This is the data from the store.
      _cart: { type: Object },
      _quantity: { type: Number },
      _error: { type: String }
    };
  }

  static get styles() {
    return [
      SharedStyles,
      ButtonSharedStyles,
      css`
        button {
          border: 2px solid var(--app-dark-text-color);
          border-radius: 3px;
          padding: 8px 16px;
        }

        button:hover {
          border-color: var(--app-primary-color);
          color: var(--app-primary-color);
        }

        .cart,
        .cart svg {
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
      `
    ];
  }

  render() {
    return html`
      <section>
        <h2>State container example: shopping cart</h2>
        <div class="cart">${addToCartIcon}<div class="circle small">${this.model.cart.getCount()}</div></div>

        <p>This is a slightly more advanced example, that simulates a
          shopping cart: getting the products, adding/removing items to the
          cart, and a checkout action, that can sometimes randomly fail (to
          simulate where you would add failure handling). </p>
        <p>This view sets the view models on its children <code>&lt;shop-products&gt;</code> and
          <code>&lt;shop-cart&gt;</code> declaratively through 'model' properties.
          Communication between the children is managed by the parent who listens to their events. </p>
      </section>
      <section>
        <h3>Products</h3>
        <shop-products .model=${this.model.products}></shop-products>

        <br>
        <h3>Your Cart</h3>
        <shop-cart .model=${this.model.cart}></shop-cart>

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

  connectedCallback() {
    super.connectedCallback();
    this._cartObserver = observe(() => this._doRender(), { lazy: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    unobserve(this._cartObserver);
  }

  // this starts the observation process, we dont' want to do it on observer
  // creation because the observed properties might still be undefined at that time.
  firstRendered() {
    this._cartObserver();
  }
}

window.customElements.define('my-view3', MyView3);

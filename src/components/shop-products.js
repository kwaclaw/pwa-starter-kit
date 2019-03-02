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
import { observable } from '@nx-js/observer-util';
import { ModelBoundElement } from './model-bound-element.js';

// These are the elements needed by this element.
import './product-item.js';

class ShopProducts extends ModelBoundElement {
  static get properties() {
    return {
      products: { type: Object }
    };
  }

  static get styles() {
    return [
      ButtonSharedStyles,
      css`
        :host {
          display: block;
        }
      `
    ];
  }

  render() {
    return html`
      ${this.model.getKeys().map((key) => {
        const item = this.model.get(key);
        return html`
          <div>
            <product-item .model=${item}></product-item>
          </div>
        `;
      })}
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('addToCart', this.model._moveToCart);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('addToCart', this.model._moveToCart);
  }
}

window.customElements.define('shop-products', ShopProducts);

/* eslint-disable no-underscore-dangle */
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
import { LitMvvmElement } from '@kdsoft/lit-mvvm';
import { css } from './css-tag';

// These are the elements needed by this element.
import './product-item';

class ShopProducts extends LitMvvmElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
      `,
    ];
  }

  render() {
    return html`
${this.model.getKeys().map((key) => {
    const item = this.model.get(key);
    return html`
<div>
  <product-item .model=${item}></product-item>
</div>`;
  })}`;
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

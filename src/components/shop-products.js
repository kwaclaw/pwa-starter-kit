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
import { ModelBoundElement } from './model-bound-element.js';
import { observable } from '@nx-js/observer-util';

// These are the elements needed by this element.
import './product-item.js';

class ShopProducts extends ModelBoundElement {
  render() {
    return html`
      <style>
        :host { display: block; }
      </style>
      ${Object.keys(this.model).map((key) => {
        const product = this.model[key];
        const item = observable(product);
        return html`
          <div>
            <product-item .model="${item}"></product-item>
          </div>
        `
      })}
    `;
  }
}

window.customElements.define('shop-products', ShopProducts);

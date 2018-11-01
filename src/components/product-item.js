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
import { ModelBoundElement } from './model-bound-element.js'

// These are the elements needed by this element.
import { addToCartIcon } from './my-icons.js';
// These are the shared styles needed by this element.
import { ButtonSharedStyles } from './button-shared-styles.js';


class ProductItem extends ModelBoundElement {
  render() {
    return html`
      ${ButtonSharedStyles}
      ${this.model.title}:
      <span ?hidden="${this.model.inventory === 0}">${this.model.inventory} * $${this.model.price}</span>
      <button
          .disabled="${this.model.inventory === 0}"
          @click="${this._addToCart}"
          data-index="${this.model.id}"
          title="${this.model.inventory === 0 ? 'Sold out' : 'Add to cart' }">
        ${this.model.inventory === 0 ? 'Sold out': addToCartIcon }
      </button>
    `;
  }

  // We could also implement this by modifying the model to have an addToCart method
  // that would communicate directly with the parent model.
  _addToCart(event) {
    this.dispatchEvent(new CustomEvent("addToCart",
        {bubbles: true, composed: true, detail: {itemId: event.currentTarget.dataset['index'] } }));
  }
}

window.customElements.define('product-item', ProductItem);

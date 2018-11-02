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
import { ModelBoundElement } from './model-bound-element.js';

// These are the elements needed by this element.
import { removeFromCartIcon } from './my-icons.js';
// These are the shared styles needed by this element.
import { ButtonSharedStyles } from './button-shared-styles.js';

class ShopItem extends ModelBoundElement {
  render() {
    return html`
      ${ButtonSharedStyles}
      ${this.model.name}:
      <span ?hidden="${this.model.amount === 0}">${this.model.amount} * $${this.model.price}</span>
      <button
          @click="${this.model.remove}"
          title="Remove from cart">
        ${removeFromCartIcon}
      </button>
    `;
  }
}

window.customElements.define('shop-item', ShopItem);

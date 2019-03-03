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
import { repeat } from 'lit-html/directives/repeat';
import { Queue, priorities } from '@nx-js/queue-util';
import { LitMvvmElement } from '@kdsoft/lit-mvvm';
import { css } from './css-tag';
import './shop-item';

class ShopCart extends LitMvvmElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
      `,
    ];
  }

  constructor() {
    super();
    // we do not want to observe intermediate changes to the items array (as triggered by Array.splice),
    // as this would lead to inconsistent (corrupt) states to be observed. The Queue scheduler fixes that.
    this.scheduler = new Queue(priorities.LOW);
  }

  render() {
    return html`
<p ?hidden="${this.model.items.length !== 0}">Please add some products to cart.</p>
${repeat(this.model.items, item => item.id, item => html`
    <div>
      <shop-item .model=${item}></shop-item>
    </div>
  `)
}
<p ?hidden="${!this.model.items.length}"><b>Total:</b> ${this.model.getTotal()}</p>
`;
  }
}

window.customElements.define('shop-cart', ShopCart);

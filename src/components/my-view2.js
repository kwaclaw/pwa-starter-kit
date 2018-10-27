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
import './counter-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

import { observe, unobserve } from '@nx-js/observer-util';

// private observer callback
function counterChanged(instance, counter) {
  instance.update(counter);
}

class MyView2 extends PageViewElement {
  render() {
    return html`
      ${SharedStyles}
      <section>
        <h2>State container example: simple counter</h2>
        <div class="circle">${this.model.value}</div>
        <p>This page contains a reusable <code>&lt;counter-element&gt;</code> which is connected to the
        store. When the element updates its counter, this page updates the values
        in the store, and you can see the total number of clicks reflected in
        the bubble above.</p>
        <br><br>
      </section>
      <section>
        <p>
          <counter-element value="${this.model.value}" clicks="${this.model.clicks}"
              @counter-incremented="${() => this.model.increment()}"
              @counter-decremented="${() => this.model.decrement()}">
          </counter-element>
        </p>
      </section>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._observer = observe(() => counterChanged(this, this.model), { lazy: true });
  }

  disconnectedCallback()  {
    super.disconnectedCallback();
    unobserve(this._observer);
  }

  // this starts the observation process, we dont' want to do it on observer
  // creation because the observed properties might still be undefined at that time.
  firstUpdated() {
    this._observer();
  }
}

window.customElements.define('my-view2', MyView2);

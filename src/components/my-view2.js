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

import { observable, observe } from '@nx-js/observer-util';

class MyView2 extends PageViewElement {
  render() {
    return html`
      ${SharedStyles}
      <section>
        <h2>State container example: simple counter</h2>
        <div class="circle">${this.counter.value}</div>
        <p>This page contains a reusable <code>&lt;counter-element&gt;</code> which is connected to the
        store. When the element updates its counter, this page updates the values
        in the store, and you can see the total number of clicks reflected in
        the bubble above.</p>
        <br><br>
      </section>
      <section>
        <p>
          <counter-element value="${this.counter.value}" clicks="${this.counter.clicks}"
              @counter-incremented="${() => this.counter.increment()}"
              @counter-decremented="${() => this.counter.decrement()}">
          </counter-element>
        </p>
      </section>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.counter = this._getModel();
    this._observer = observe(() => { this.update(this.counter); })
  }

  disconnectedCallback()  {
    super.disconnectedCallback();
    this._observer.unobserve();
  }
}

window.customElements.define('my-view2', MyView2);

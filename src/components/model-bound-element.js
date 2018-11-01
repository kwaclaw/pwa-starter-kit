/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement } from '@polymer/lit-element';
import { observe, unobserve } from '@nx-js/observer-util';

export class ModelBoundElement extends LitElement {

  // Setting up observer of view model changes.
  // NOTE: the observer will not get re-triggered until the observed properties are read!!!
  //       that is, until the "get" traps of the proxy are used!!!
  // In our case we use LitElement.update(model) to read the relevant view model properties.
  connectedCallback() {
    super.connectedCallback();
    this._observer = observe(() => this.update(this.model), { lazy: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    unobserve(this._observer);
  }

  // this starts the observation process, we dont' want to do it on observer
  // creation because the observed properties might still be undefined at that time.
  firstUpdated() {
    this._observer();
  }

  static get properties() { return {
      model: {
        type: Object,
        attribute: false,
        reflect: false,
        // we could force each setting of the model to trigger an update
        // hasChanged: (newValue, oldValue) => true
      }
  }};
}

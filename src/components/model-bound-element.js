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

// private fields - using the WeakMap() pattern
const _modelKey = new WeakMap();

export class ModelBoundElement extends LitElement {
  static get properties() {
    return {
      model: { type: Object }
    }
  }

  // Web-components must not have constructor arguments, so we inject the view model instance
  // using synchronous event processing with a CustomEvent named 'get-model'.
  _getModel(key) {
    let event = new CustomEvent('get-model', { detail: { sender: this, key }, bubbles: true, cancelable: true, composed: true });
    this.dispatchEvent(event);
    return event.detail.model;
  }

  connectedCallback() {
    super.connectedCallback();
    const key = this.getAttribute('view-model-key');
    const model = this._getModel(key || undefined);
    if (model) {
      this.model = model;
    }
  }
}

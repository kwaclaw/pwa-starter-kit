/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { observe, unobserve } from '@nx-js/observer-util';
import { TemplatedElement } from './templated-element.js';

const _model = new WeakMap();

export class ModelBoundElement extends TemplatedElement {

  get model() { return _model.get(this); }
  set model(value) { _model.set(this, value); }

  // Setting up observer of view model changes.
  // NOTE: the observer will not get re-triggered until the observed properties are read!!!
  //       that is, until the "get" traps of the proxy are used!!!
  // NOTE: the observer code will need to run synchronously, so that the observer
  //       can detect which properties were used at the end of the call!
  // In our case we use this._doRender() instead of this.invalidate() to read the relevant
  // view model properties syncronously.
  connectedCallback() {
    //TODO investigate the Queue scheduler for nx-js
    this._observer = observe(() => {
      this._doRender();
    }, { lazy: true, /* debugger: console.log */ });
    super.connectedCallback();
  }

  disconnectedCallback() {
    unobserve(this._observer);
  }

  firstRendered() { 
    // this starts the observation process, we dont' want to do it on observer
    // creation because the observed properties might still be undefined at that time.
    this._observer();
  }

  rendered() { }
}

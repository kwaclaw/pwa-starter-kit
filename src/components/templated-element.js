/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, render, TemplateResult } from 'lit-html';

const microtaskPromise = new Promise((resolve) => resolve(true));
const _renderPromise = new WeakMap();

export class TemplatedElement extends HTMLElement {

  get renderComplete() { return _renderPromise.get(this); }

  constructor() {
    super();
    _renderPromise.set(this, microtaskPromise);
    this.attachShadow({mode: 'open'});
  }

  render() {
    return html``;
  }

  shouldRender() {
    return true;
  }

  async invalidate(renderCallback) {
    const doRender = renderCallback || this._doRender.bind(this);

    if (!this._requestedRender) {
      this._requestedRender = true;

      let resolver = null;
      const previousRenderPromise = _renderPromise.get(this);
      _renderPromise.set(this, new Promise((r) => resolver = r));
      await previousRenderPromise;

      doRender();

      if (resolver) {
        resolver(!this._requestedRender);
      }
    }
    
    return this.renderComplete;
  }

  _doRender() {
    this._requestedRender = false;

    if (this.shouldRender()) {
      const templateResult = this.render();
      if (templateResult instanceof TemplateResult) {
        render(templateResult, this.shadowRoot, {scopeName : this.localName, eventContext : this});
      }

      if (!this._firstRendered) {
        this._firstRendered = true;
        this.firstRendered();
      }

      this.rendered();
    }
  }

  // Setting up observer of view model changes.
  // NOTE: the observer will not get re-triggered until the observed properties are read!!!
  //       that is, until the "get" traps of the proxy are used!!!
  // In our case we use LitElement.update(model) to read the relevant view model properties.
  connectedCallback() {
    this._firstRendered = false;
    this.invalidate();
  }

  disconnectedCallback() {
    //
  }

  firstRendered() { }

  rendered() { }
}

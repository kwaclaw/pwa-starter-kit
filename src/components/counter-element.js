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
import { LitMvvmElement } from '@kdsoft/lit-mvvm';
import { css } from './css-tag';

// These are the elements needed by this element.
import { plusIcon, minusIcon } from './my-icons';

// These are the shared styles needed by this element.
import { ButtonSharedStyles } from './button-shared-styles';

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class CounterElement extends LitMvvmElement {
  static get styles() {
    return [
      ButtonSharedStyles,
      css`
        span {
          width: 20px;
          display: inline-block;
          text-align: center;
          font-weight: bold;
        }
      `,
    ];
  }

  render() {
    return html`
      <div>
        <p>
          Clicked: <span>${this.model.clicks}</span> times.
          Value is <span>${this.model.value}</span>.
          <button @click="${() => this.model.increment()}" title="Add 1">${plusIcon}</button>
          <button @click="${() => this.model.decrement()}" title="Minus 1">${minusIcon}</button>
        </p>
      </div>
    `;
  }
}

window.customElements.define('counter-element', CounterElement);

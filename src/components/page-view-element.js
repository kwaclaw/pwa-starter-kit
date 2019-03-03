/* eslint-disable import/prefer-default-export */
/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitMvvmElement } from '@kdsoft/lit-mvvm';

export class PageViewElement extends LitMvvmElement {
  constructor() {
    super();
    this.active = true;
  }

  // Only render this page if it's actually visible.
  shouldRender() {
    return this.active;
  }
}

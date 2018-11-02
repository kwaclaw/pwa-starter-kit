/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { observable } from '@nx-js/observer-util';
import Page2Model from './page2Model';
import Page3Model from './page3Model';

class MyAppModel {
  constructor() {
    this.activePage = '';
    this.page2 = new Page2Model();
    this.page3 = new Page3Model();
    return observable(this);
  }
}

export default MyAppModel;

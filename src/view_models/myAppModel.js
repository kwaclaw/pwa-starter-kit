
import { observable } from '@nx-js/observer-util';
import { Page2Model } from './page2Model';
import { Page3Model } from './page3Model';

export class MyAppModel {
    constructor() {
        this.page2 = new Page2Model();
        this.page3 = new Page3Model();
        return observable(this);
    }
}


import { observable, observe } from '@nx-js/observer-util';
import { Page4Model } from './page4Model';
import { Page2Model } from './page2Model';
import { Page3Model } from './page3Model';

export class MyAppModel extends observable {
    constructor() {
        super();
        this.page2 = new Page2Model();
        this.page3 = new Page3Model();
        this.page4 = new Page4Model();
        this.page4.choice = 2;
    }
}

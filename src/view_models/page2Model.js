
import { observable } from '@nx-js/observer-util';

export class Page2Model {
    constructor() {
        this.clicks = 0;
        this.value = 0;
        return observable(this);
    }

    increment() {
        this.clicks++;
        this.value++;
    }

    decrement() {
        this.clicks++;
        this.value--;
    }
}

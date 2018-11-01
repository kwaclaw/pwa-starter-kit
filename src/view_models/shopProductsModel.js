
import { observable } from '@nx-js/observer-util';

export class ShopProductsModel {
    constructor(owner, productMap) {
        this._owner = owner;
        this._moveToCart = (event) => this._owner.addToCart(event.detail.itemId);
        this._map = productMap;
        return observable(this);
    }

    getKeys() {
        return Object.keys(this._map);
    }

    get(itemId) {
        return this._map[itemId];
    }

    add(itemId) {
        const item = this._map[itemId];
        if (item) {
            item.inventory++;
            return true;
        }
        return false;
    }

    remove(itemId) {
        const item = this._map[itemId];
        if (!!item && item.inventory > 0) {
            item.inventory--;
            return true;
        }
        return false;
    }
}


import { observable, observe } from '@nx-js/observer-util';

export class ShopCartModel {
    constructor(owner) {
        this._owner = owner;
        this.items = [];
        return observable(this);
    }

    getTotal() {
        const totalPrice = this.items.reduce((total, item) => total + (item.price * item.amount), 0);
        return Math.round(totalPrice * 100) / 100;
    }

    getCount() {
        return this.items.reduce((count, item) => count + item.amount, 0);
    }

    add(itemId) {
        const item = this.items.find(item => item.id == itemId);
        if (item) {
            item.amount++;
        } else {
            const product = this._owner.getProduct(itemId);
            if (!product) {
                return;
            }
            this.items.push({ id: product.id, title: product.title, price: product.price, amount: 1});
        }
        this._owner.inventoryRemoved(itemId);
    }

    remove(itemId) {
        const itemIndex = this.items.findIndex(item => item.id == itemId);
        if (itemIndex >= 0) {
            const item = this.items[itemIndex];
            item.amount--;
            if (item.amount <= 0) {
                this.items.splice(itemIndex, 1);
            }
            this._owner.inventoryAdded(itemId);
            return true;
        }
        return false;
    }

    clear() {
        this.items.length = 0;
    }
}

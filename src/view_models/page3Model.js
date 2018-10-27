
import { observable } from '@nx-js/observer-util';
import { ShopCartModel } from './shopCartModel.js';

function _getAllProducts() {
    // Here you would normally get the data from the server.
    const PRODUCT_LIST = [
        { "id": 1, "title": "Cabot Creamery Extra Sharp Cheddar Cheese", "price": 10.99, "inventory": 2 },
        { "id": 2, "title": "Cowgirl Creamery Mt. Tam Cheese", "price": 29.99, "inventory": 10 },
        { "id": 3, "title": "Tillamook Medium Cheddar Cheese", "price": 8.99, "inventory": 5 },
        { "id": 4, "title": "Point Reyes Bay Blue Cheese", "price": 24.99, "inventory": 7 },
        { "id": 5, "title": "Shepherd's Halloumi Cheese", "price": 11.99, "inventory": 3 }
    ];

    // You could reformat the data in the right format as well:
    const products = PRODUCT_LIST.reduce((obj, product) => {
        obj[product.id] = product
        return obj
    }, {});
    return products;
}

export class Page3Model {
    constructor() {
        this.cart = new ShopCartModel(this);
        this.products = observable(_getAllProducts());
        this.error = '';
        return observable(this);
    }

    checkout() {
        // Here you could do things like credit card validation, etc.
        // We're simulating that by flipping a coin :)
        const flip = Math.floor(Math.random() * 2);
        if (flip === 0) {
            this.error = 'Checkout failed. Please try again';
        } else {
            this.error = '';
            this.cart.clear();
        }
    }

    addToCart(productId) {
        this.error = '';
        this.cart.add(productId);
    }

    getProduct(productId) {
        return this.products[productId];
    }

    inventoryAdded(productId) {
        this.products[productId].inventory++;
    }

    inventoryRemoved(productId) {
        this.products[productId].inventory--;
    }
}

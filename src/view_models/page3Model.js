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
import ShopCartModel from './shopCartModel';
import ShopProductsModel from './shopProductsModel';

function _getAllProducts(owner) {
    // Here you would normally get the data from the server.
    const PRODUCT_LIST = [
        { "id": 1, "title": "Cabot Creamery Extra Sharp Cheddar Cheese", "price": 10.99, "inventory": 2 },
        { "id": 2, "title": "Cowgirl Creamery Mt. Tam Cheese", "price": 29.99, "inventory": 10 },
        { "id": 3, "title": "Tillamook Medium Cheddar Cheese", "price": 8.99, "inventory": 5 },
        { "id": 4, "title": "Point Reyes Bay Blue Cheese", "price": 24.99, "inventory": 7 },
        { "id": 5, "title": "Shepherd's Halloumi Cheese", "price": 11.99, "inventory": 3 }
    ];

    const productMap = PRODUCT_LIST.reduce((obj, product) => {
        obj[product.id] = product;
        return obj
    }, {});
    return new ShopProductsModel(owner, productMap);
}

export default class {
    constructor() {
        this.cart = new ShopCartModel(this);
        this.products = _getAllProducts(this);
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
        this.products.remove(productId);
    }

    removeFromCart(productId) {
        this.error = '';
        this.cart.remove(productId);
        this.products.add(productId);
    }

    getProduct(productId) {
        return this.products.get(productId);
    }
}

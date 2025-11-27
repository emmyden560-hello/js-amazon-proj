import { addtocart } from "./cart.js";

function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,

        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

            if (!this.cartItems) {
                this.cartItems = [{
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 2,
                    deliveryoptionsId: '1'
                }, {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", quantity: 1,
                    deliveryoptionsId: '2'
                }];
            }
        },

        savetostorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },

        addtocart(productId) {
            let itemMatch;

            this.cartItems.forEach((cartitem) => {
                if (productId === cartitem.productId) {
                    itemMatch = cartitem;
                }
            });

            if (itemMatch) {
                itemMatch.quantity += 1;
            } else {
                this.cartItems.push({
                    productId: productId,
                    quantity: 1,
                    deliveryoptionsId: '1'
                });
            }
        },
        removecart(productId) {
            const newcart = [];

            cart.cartItems.forEach((cartitem) => {
                if (cartitem.productId !== productId) {
                    newcart.push(cartitem);
                }
            });

            cart.cartItems = newcart;

            cart.savetostorage();
        },

        updatedeliveryoption(productId, deliveryoptionId) {
            let itemMatch;

            cart.cartItems.forEach((cartitem) => {
                if (productId === cartitem.productId) {
                    itemMatch = cartitem;
                }
            });

            if (itemMatch) {
                itemMatch.deliveryoptionsId = deliveryoptionId;
                cart.savetostorage();
            }
        }

    };

    return cart;
}


const cart = Cart("cart-oop");
const businesscart = Cart("cart-business");

cart.loadFromStorage();

businesscart.loadFromStorage();

console.log(cart);
console.log(businesscart);
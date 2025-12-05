export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'))

    if (!cart) {
        cart = [{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryoptionsId: '1'
        }, {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryoptionsId: '2'
        }];
    }

    // persist normalized shape
    savetostorage();
}


export function addtocart(productId) {
    let itemMatch;

    cart.forEach((cartitem) => {
        if (productId === cartitem.productId) {
            itemMatch = cartitem;
        }
    });

    if (itemMatch) {
        itemMatch.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryoptionsId: '1'
        });
    }

    savetostorage();
};

function savetostorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


export function removecart(productId) {
    const newcart = [];

    cart.forEach((cartitem) => {
        if (cartitem.productId !== productId) {
            newcart.push(cartitem);
        }
    });

    cart = newcart;

    savetostorage();
}

export function updatedeliveryoption(productId, deliveryoptionId) {
    let itemMatch;

    cart.forEach((cartitem) => {
        if (productId === cartitem.productId) {
            itemMatch = cartitem;
        }
    });

    itemMatch.deliveryoptionsId = deliveryoptionId;

    savetostorage()
}

export function loadCart(func) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        console.log(xhr.response);
        func();
    });

    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
}

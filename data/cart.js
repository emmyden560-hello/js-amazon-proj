export const cart = [];


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
                quantity: 1
            });
        }
};


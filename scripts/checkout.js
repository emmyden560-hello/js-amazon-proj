import { renderSummary } from "./checkout/order.js";
import { paymentSummary } from "./checkout/paylog.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import '../data/backend-practice.js';
import { loadCart } from "../data/cart.js";

async function loadPage() {
    try {
        await loadProductsFetch();

        const value = await new Promise((resolve, reject) => {
            loadCart(() => {
                reject('error3')
                // resolve('value3');
            });
        });

    } catch (error) {
        console.log('error. please try again')
    }

    renderSummary();
    paymentSummary();
}

loadPage();


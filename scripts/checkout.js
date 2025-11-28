import { renderSummary } from "./checkout/order.js";
import { paymentSummary } from "./checkout/paylog.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import '../data/backend-practice.js';
import { loadCart } from "../data/cart.js";

async function loadPage() {
    await loadProductsFetch();
    await new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });

    renderSummary();
    paymentSummary();
}

loadPage().then(() => {
    console.log('page loaded');
});


// Promise.all([
//     new Promise((resolve) => {
//         loadProductsFetch();
//         loadProducts(() => {
//             resolve('value1');
//         });
//     }),
//      new Promise((resolve) => {
//          loadCart(() => {
//              resolve();
//          });
//      })

// ]).then((values) => {
//     console.log(values);
//     renderSummary();
//     paymentSummary();
// });

// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve('value1');
//     });
// }).then((value) => {
//     console.log(value);
//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
//     }).then(() => {
//         renderSummary();
//         paymentSummary();
//     });
// });


// loadProducts(() =>{
//     loadCart(() => {
//         renderSummary();
//         paymentSummary();
//     });
// });


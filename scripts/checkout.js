import { renderSummary } from "./checkout/order.js";
import { paymentSummary } from "./checkout/paylog.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import '../data/backend-practice.js';
import { loadCart } from "../data/cart.js";

async function loadPage() {
    try {
        // throw 'error1';
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


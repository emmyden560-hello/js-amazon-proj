import { renderSummary } from "./checkout/order.js";
import { paymentSummary } from "./checkout/paylog.js";
import { loadProducts } from "../data/products.js";
import '../data/backend-practice.js';
import { loadCart } from "../data/cart.js";


Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve('value1');
        });
    }),
     new Promise((resolve) => {
         loadCart(() => {
             resolve();
         });
     })

]).then((values) => {
    console.log(values);
    renderSummary();
    paymentSummary();
});

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


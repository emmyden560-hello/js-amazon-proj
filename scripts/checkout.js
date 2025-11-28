import { renderSummary } from "./checkout/order.js";
import { paymentSummary } from "./checkout/paylog.js";
import { loadProducts } from "../data/products.js";
import '../data/backend-practice.js';

loadProducts(() =>{
    renderSummary();
    paymentSummary();
})



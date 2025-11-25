import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryoptions.js";
import { currencyformat } from "../utilities/money.js";

export function paymentSummary() {

    let productPriceCents = 0;
    let shippingPrice = 0;

    cart.forEach((cartitem) => {
        const product = getProduct(cartitem.productId);
        productPriceCents += product.priceCents * cartitem.quantity;

        const deliveryoption = getDeliveryOption(cartitem.deliveryoptionId);
        shippingPrice += deliveryoption.priceCents;

        const totalBeforeTaxCents = productPriceCents + shippingPrice;
        const taxCents = totalBeforeTaxCents * 0.1;
        const totalCents = totalBeforeTaxCents + taxCents;

        const paymentSummaryHTML = `
                  <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${currencyformat(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${currencyformat(shippingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${currencyformat(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${currencyformat(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${currencyformat(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        `;

        document.querySelector('.js-payment').innerHTML = paymentSummaryHTML;

    });


    console.log(productPriceCents)
    console.log(shippingPrice)
}
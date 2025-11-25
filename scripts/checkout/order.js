import { cart, removecart, updatedeliveryoption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js'
import { currencyformat } from '../utilities/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryoptions,getDeliveryOption } from '../../data/deliveryoptions.js';
import { paymentSummary } from './paylog.js';

export function renderSummary() {


  let carthmtl = '';

  cart.forEach((cartitem) => {
    const productId = cartitem.productId;

    const matchingproduct = getProduct(productId)

    const deliveryoptionId = cartitem.deliveryoptionsId;

    const deliveryoption = getDeliveryOption(deliveryoptionId);

    const today = dayjs();
    const deliverydate = today.add(
      deliveryoption.deliverydays,
      'days'
    );
    const datestring = deliverydate.format(
      'dddd, MMMM D'
    );


    carthmtl +=
      `
              <div class="cart-item-container js-cart-container-${matchingproduct.id}">
            <div class="delivery-date">
              Delivery date: ${datestring}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingproduct.image}">

              <div class="cart-item-details">
                <div class="product-name">${matchingproduct.name}
                </div>
                <div class="product-price">
                  $${currencyformat(matchingproduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartitem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete" data-product-id="${matchingproduct.id}">
                    Delete
                  </span>
                </div>
              </div>
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryoptionhtml(matchingproduct, cartitem)}
                </div>
              </div>
            </div>
          </div>
    `
  });


  function deliveryoptionhtml(matchingproduct, cartitem) {
    let html = '';

    deliveryoptions.forEach((deliveryoption) => {
      const today = dayjs();
      const deliverydate = today.add(
        deliveryoption.deliverydays,
        'days'
      );
      const datestring = deliverydate.format(
        'dddd, MMMM D'
      );

      const pricestring = deliveryoption.priceCents === 0
        ? `FREE`
        : `${currencyformat(deliveryoption.priceCents)} -`

      const check = deliveryoption.id === cartitem.deliveryoptionId;

      html +=
        `
                    <div class="delivery-option js-delivery-option"
                    data-product-id="${matchingproduct.id}" data-delivery-option-id="${deliveryoption.id}">
                  <input type="radio"
                    ${check ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingproduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${datestring}
                    </div>
                    <div class="delivery-option-price">
                      ${pricestring} Shipping
                    </div>
                  </div>
                </div>
    `
    });

    return html;
  }

  document.querySelector('.js-order').innerHTML = carthmtl;

  document.querySelectorAll('.js-delete').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removecart(productId);

      const container = document.querySelector(`.js-cart-container-${productId}`)
      container.remove()

      paymentSummary();
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updatedeliveryoption(productId, deliveryOptionId);
      renderSummary();
      paymentSummary();
    });
  });
}



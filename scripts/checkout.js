import { cart, removecart } from '../data/cart.js';
import { products } from '../data/products.js'
import { currencyformat } from './utilities/money.js';

let carthmtl = '';

cart.forEach((cartitem) => {
  const productId = cartitem.productId;

  let matchingproduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingproduct = product
    }
  });

  carthmtl +=
    `
              <div class="cart-item-container js-cart-container-${matchingproduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
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
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingproduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingproduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingproduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `
});

document.querySelector('.js-order').innerHTML = carthmtl;

document.querySelectorAll('.js-delete').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removecart(productId);

    const container = document.querySelector(`.js-cart-container-${productId}`)
    container.remove()
  });
});
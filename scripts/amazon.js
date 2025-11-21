import { cart, addtocart } from '../data/cart.js';
import { products } from '../data/products.js'
import { currencyformat } from './utilities/money.js';

let productHTML = '';

products.forEach((products) => {
  productHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${products.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${products.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${products.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${products.rating.count}</div>
          </div>

          <div class="product-price">$${currencyformat(products.priceCents)}</div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-add-cart">
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${products.id}">Add to Cart</button>
        </div>
    `;
});

document.querySelector(".js-product-grid").innerHTML = productHTML;

function quatityupdate() {
  let cartsize = 0;

  cart.forEach((cartitem) => {
    cartsize += cartitem.quantity;
  })

  document.querySelector('.js-cart-quantity').innerHTML = cartsize;

};

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    addtocart(productId);
    quatityupdate();

  });
});



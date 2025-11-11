import 'css-star-rating/css/star-rating.css';
import { getSelectedFurniture, setSelectedColor } from './data-store.js';
import { fetchFurnitureById } from './furniture-api.js';
import { openModal } from './modal-order.js';

const modal = document.querySelector('.js-modal-product');
const loader = modal.querySelector('.loader');

export async function openDetailsModal() {
  const id = getSelectedFurniture();
  if (!id) return;
  showLoader();
  try {
    const product = await fetchFurnitureById(id);
    openProductModal(product);
  } catch (e) {
    console.error('Помилка завантаження товару:', e);
  } finally {
    hideLoader();
  }
}

export function openProductModal(product) {
  const backdrop = document.querySelector('.js-modal-product');
  const modal = backdrop.querySelector('.product-modal');

  modal.querySelector('.js-title').textContent = product.name;
  modal.querySelector('.js-category').textContent = product.category.name;
  modal.querySelector('.js-price').textContent = `${product.price} грн`;
  modal.querySelector('.js-description').textContent = product.description;
  modal.querySelector(
    '.js-dimensions'
  ).textContent = `Розміри: ${product.sizes}`;

  const bigImg = modal.querySelector('.js-big-img');
  bigImg.innerHTML = `<img src="${product.images[0]}" alt="${product.name}">`;

  const thumbs = modal.querySelector('.js-thumbs');
  thumbs.innerHTML = `
    <img src="${product.images[1]}" alt="${product.name}">
    <img src="${product.images[2]}" alt="${product.name}">
  `;

  const colorsList = modal.querySelector('.js-colors');
  colorsList.innerHTML = product.color
    .map(
      (c, i) => `
      <li>
        <label class="color-option">
          <input type="radio" name="color" value="${c}" ${
        i === 0 ? 'checked' : ''
      }/>
          <span class="color-swatch" style="background:${c}"></span>
        </label>
      </li>`
    )
    .join('');

  modal.querySelector('.js-rating').innerHTML = renderStars(product.rate);

  backdrop.classList.add('active');
  setTimeout(() => modal.classList.add('animate-in'), 10);
  document.body.style.overflow = 'hidden';

  colorsList.addEventListener('change', e => {
    if (e.target.name === 'color') {
      setSelectedColor(e.target.value);
    }
  });

  const orderBtn = modal.querySelector('.js-to-order');
  orderBtn.addEventListener('click', () => {
    closeModal();
    setTimeout(() => {
      openModal();
    }, 350);
  });
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  const total = 5;

  let starsHtml = '';

  for (let i = 0; i < total; i++) {
    let iconId = 'star-empty';

    if (i < full) {
      iconId = 'star-filled';
    } else if (i === full && hasHalf) {
      iconId = 'star-half';
    }

    starsHtml += `
      <div class="star">
        <svg width="24" height="24" viewBox="0 0 34 32">
          <use href="./img/icons.svg#${iconId}"></use>
        </svg>
      </div>
    `;
  }

  return `
    <div class="rating star-svg medium color-default">
      <div class="star-container">
        ${starsHtml}
      </div>
    </div>
  `;
}

function closeModal() {
  const backdrop = document.querySelector('.js-modal-product');
  const modal = backdrop.querySelector('.product-modal');

  modal.classList.remove('animate-in');

  setTimeout(() => {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }, 300);
}

document.addEventListener('click', e => {
  if (e.target.closest('.js-close-product')) closeModal();

  const backdrop = document.querySelector('.js-modal-product');
  if (e.target === backdrop) closeModal();
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

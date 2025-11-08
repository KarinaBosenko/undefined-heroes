import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import 'css-star-rating/css/star-rating.css';
import { openModal } from './modal-order.js';

export function openProductModal(product) {
  const backdrop = document.querySelector('.js-modal-product');
  const modal = backdrop.querySelector('.product-modal');

  modal.querySelector('.js-title').textContent = product.title;
  modal.querySelector('.js-category').textContent = product.category;
  modal.querySelector('.js-price').textContent = product.price;
  modal.querySelector('.js-description').textContent = product.description;
  modal.querySelector('.js-dimensions').textContent = `Розміри: ${product.dimensions}`;

  const wrapper = modal.querySelector('.js-swiper-wrapper');
  wrapper.innerHTML = product.images
    .map(img => `<div class="swiper-slide"><img src="${img}" alt="${product.title}" /></div>`)
    .join('');

  const colorsList = modal.querySelector('.js-colors');
  colorsList.innerHTML = product.colors
    .map(
      (c, i) => `
        <li>
          <label class="color-option">
            <input type="radio" name="color" ${i === 0 ? 'checked' : ''} />
            <span class="color-swatch" style="background:${c.color}" title="${c.name}"></span>
          </label>
        </li>`
    )
    .join('');

  const ratingBlock = modal.querySelector('.js-rating');
  ratingBlock.innerHTML = `<span class="star-rating">
    ${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}
  </span>`;

  backdrop.classList.add('active');
  setTimeout(() => modal.classList.add('animate-in'), 10);

  new Swiper('.js-product-swiper', {
    modules: [Pagination],
    pagination: { el: '.swiper-pagination', clickable: true },
    loop: true,
  });

  document.body.style.overflow = 'hidden';
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

document.addEventListener('click', e => {
  if (e.target.closest('.js-to-order')) {
    closeModal();
    setTimeout(() => openModal(), 300); 
  }
});
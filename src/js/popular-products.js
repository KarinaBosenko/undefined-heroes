import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';

import 'swiper/css/navigation';
import 'swiper/css/pagination';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchPopularFurniture } from './furniture-api';
import { setSelectedFurniture } from './data-store.js';
import { openDetailsModal } from './modal-details.js';

const gallery = document.querySelector('.popular-products-gallery');
const loader = document.querySelector('.loader');

let swiper;

document.addEventListener('DOMContentLoaded', renderPopularProducts);
gallery.addEventListener('click', onDetailsClick);

async function renderPopularProducts() {
  try {
    showLoader();

    const { furnitures } = await fetchPopularFurniture();
    const markup = createPopularProducts(furnitures);
    gallery.insertAdjacentHTML('beforeend', markup);
    initSwiper();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      position: 'topRight',
      message: 'Oops! Something went wrong',
    });
  } finally {
    hideLoader();
  }
}

function createPopularProducts(products) {
  return products
    .map(({ _id, name, color, price, images }) => {
      const colorPick = color
        .map(
          c =>
            `<span class="gallery-item-color-pick" style="background-color:${c};"></span>`
        )
        .join('');
      return `
    <li class="gallery-item swiper-slide" data-id="${_id}">
        <img src="${images[0]}" alt="${name}" class="gallery-item-img"/>
        <div class="gallery-item-dscr">
            <p class="gallery-item-title">${name}</p>
            <div class="gallery-item-color" data-id="${color}">${colorPick}</div>
             <p class="gallery-item-price">${price} грн</p>                    
        </div>
        <button type="button" class="gallery-item-info-btn">Детальніше</button>
    </li>`;
    })
    .join('');
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function initSwiper() {
  const swiperContainer = document.querySelector('.popular-products-swiper');
  const prevBtn = document.querySelector('.swiper-button-prev');
  const nextBtn = document.querySelector('.swiper-button-next');

  swiper = new Swiper(swiperContainer, {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 16,
    loop: false,

    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      768: { slidesPerView: 2, spaceBetween: 24 },
      1440: { slidesPerView: 4 },
    },

    on: {
      init: function () {
        updateNavigationState(this, prevBtn, nextBtn);
      },
      slideChange: function () {
        updateNavigationState(this, prevBtn, nextBtn);
      },
    },
  });
}

function updateNavigationState(swiperInstance, prevBtn, nextBtn) {
  prevBtn.disabled = swiperInstance.isBeginning;
  nextBtn.disabled = swiperInstance.isEnd;
}

function onDetailsClick(event) {
  const btn = event.target.closest('.gallery-item-info-btn');
  if (!btn) return;

  const card = btn.closest('.gallery-item');
  const id = card.dataset.id;

  setSelectedFurniture(id);
  openDetailsModal();
}

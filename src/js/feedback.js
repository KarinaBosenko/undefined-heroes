import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'css-star-rating/css/star-rating.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchFeedbacks } from './furniture-api';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import iconsSpriteUrl from '../img/icons-sprite.svg';

const loader = document.getElementById('loader');
let feedbackSwiper = null;

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}
function roundRating(rating) {
  if (rating >= 3.3 && rating <= 3.7) {
    return 3.5;
  }
  if (rating >= 3.8 && rating <= 4.2) {
    return 4.0;
  }
  return Math.round(rating * 2) / 2;
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  const totalStars = 5;

  let starsHtml = '';

  for (let i = 0; i < totalStars; i++) {
    let iconId = 'star-empty';

    if (i < fullStars) {
      iconId = 'star-filled';
    } else if (i === fullStars && hasHalf) {
      iconId = 'star-half';
    }

    starsHtml += `
      <div class="star">
        <svg width="24" height="24" viewBox="0 0 34 32">
          <use href="${iconsSpriteUrl}#${iconId}"></use>
        </svg>
      </div>
    `;
  }

  return starsHtml;
}

function renderFeedbacks(feedbacks) {
  const listElement = document.getElementById('feedback-list');
  listElement.innerHTML = '';

  feedbacks.forEach(feedback => {
    const roundedRating = roundRating(feedback.rate);
    const hasHalf = roundedRating % 1 !== 0;
    const valueClass = `value-${Math.floor(roundedRating)}`;
    const halfClass = hasHalf ? 'half' : '';

    const cardHtml = `
        <li class="feedback-card swiper-slide">
            <div class="rating ${valueClass} ${halfClass} star-svg medium color-default">
              <div class="star-container">
                ${generateStars(roundedRating)}
              </div>
            </div>
            <p class="feedback-text">"${feedback.descr}"</p>
            <p class="feedback-author">${feedback.name}</p>
        </li>
    `;
    listElement.insertAdjacentHTML('beforeend', cardHtml);
  });
}

function initSwiper() {
  const swiperContainer = document.querySelector('.feedback-slider.swiper');
  const prevBtn = document.querySelector('.feedback-prev');
  const nextBtn = document.querySelector('.feedback-next');

  feedbackSwiper = new Swiper(swiperContainer, {
    modules: [Navigation, Pagination],
    loop: false,
    spaceBetween: 20,
    slidesPerView: 1,

    pagination: {
      el: '.feedback-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },

    breakpoints: {
      768: { slidesPerView: 2, spaceBetween: 30 },
      1440: { slidesPerView: 3, spaceBetween: 40 },
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

async function initFeedbackBlock() {
  showLoader();
  try {
    const result = await fetchFeedbacks();

    let feedbacksArray;

    if (result && Array.isArray(result.feedbacks)) {
      feedbacksArray = result.feedbacks;
    } else if (Array.isArray(result)) {
      feedbacksArray = result;
    } else {
      console.error('API повернуло дані в неочікуваному форматі:', result);
      return;
    }

    renderFeedbacks(feedbacksArray);
    initSwiper();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      position: 'topRight',
      message: `Помилка завантаження відгуків: ${error}`,
    });
  } finally {
    hideLoader();
  }
}

initFeedbackBlock();

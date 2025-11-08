import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { fetchFeedbacks } from './furniture-api';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

let feedbackSwiper;

function roundRating(rating) {
  if (rating >= 3.3 && rating <= 3.7) {
    return 3.5;
  }
  if (rating >= 3.8 && rating <= 4.2) {
    return 4.0;
  }
  return Math.round(rating * 2) / 2;
}

function renderFeedbacks(feedbacks) {
  const listElement = document.getElementById('feedback-list');
  listElement.innerHTML = '';

  feedbacks.forEach(feedback => {
    const roundedRating = roundRating(feedback.rate);
    const ratingValue = roundedRating.toFixed(1);

    const ratingPercent = (roundedRating / 5) * 100;

    const cardHtml = `
        <li class="feedback-card swiper-slide">
            <div 
                class="star-rating" 
                data-rating="${ratingValue}"
                style="--star-rating: ${ratingPercent}%" 
            ></div> 
            <p class="feedback-text">"${feedback.descr}"</p>
            <p class="feedback-author">${feedback.name}</p>
        </li>
    `;
    listElement.insertAdjacentHTML('beforeend', cardHtml);
  });
}

function initSwiper() {
  const swiperContainer = document.querySelector('.swiper');
  const prevBtn = document.querySelector('.swiper-button-prev');
  const nextBtn = document.querySelector('.swiper-button-next');

  feedbackSwiper = new Swiper(swiperContainer, {
    modules: [Navigation, Pagination],
    loop: false,
    spaceBetween: 20,
    slidesPerView: 1,

    pagination: {
      el: '.swiper-pagination',
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
  } catch (error) {}
}

initFeedbackBlock();

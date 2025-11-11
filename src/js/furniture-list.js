import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  fetchCategories,
  fetchDefaultFurniture,
  fetchFurnitureByCategory,
} from './furniture-api.js';
import { openDetailsModal } from './modal-details.js';
import { setSelectedFurniture } from './data-store.js';
import all1x from '../img/furniture_list/all1x.jpg';
import all2x from '../img/furniture_list/all2x.jpg';

import sofa1x from '../img/furniture_list/sofa1x.jpg';
import sofa2x from '../img/furniture_list/sofa2x.jpg';

import wardrobe1x from '../img/furniture_list/wardrobe1x.jpg';
import wardrobe2x from '../img/furniture_list/wardrobe2x.jpg';

import bed1x from '../img/furniture_list/bed1x.jpg';
import bed2x from '../img/furniture_list/bed2x.jpg';

import table1x from '../img/furniture_list/table1x.jpg';
import table2x from '../img/furniture_list/table2x.jpg';

import chairs1x from '../img/furniture_list/chairs1x.jpg';
import chairs2x from '../img/furniture_list/chairs2x.jpg';

import kitchen1x from '../img/furniture_list/kitchen1x.jpg';
import kitchen2x from '../img/furniture_list/kitchen2x.jpg';

import kid1x from '../img/furniture_list/kid1x.jpg';
import kid2x from '../img/furniture_list/kid2x.jpg';

import office1x from '../img/furniture_list/office1x.jpg';
import office2x from '../img/furniture_list/office2x.jpg';

import entryway1x from '../img/furniture_list/entryway1x.jpg';
import entryway2x from '../img/furniture_list/entryway2x.jpg';

import bathroom1x from '../img/furniture_list/bathroom1x.jpg';
import bathroom2x from '../img/furniture_list/bathroom2x.jpg';

import garden1x from '../img/furniture_list/garden1x.jpg';
import garden2x from '../img/furniture_list/garden2x.jpg';

import decor1x from '../img/furniture_list/decor1x.jpg';
import decor2x from '../img/furniture_list/decor2x.jpg';

const furnitureCategories = document.querySelector('ul.furniture-categories');
const furnitureGallery = document.querySelector('ul.furniture-gallery');
const loadMoreBtn = document.querySelector('button.furniture-load-more-btn');
const loader = document.querySelector('span.loader');

// saving order from design
const categories = [
  {
    id: 'all',
    name: 'Всі товари',
    image: { x1: all1x, x2: all2x },
  },
  {
    id: '66504a50a1b2c3d4e5f6a7b8',
    name: "М'які меблі",
    image: { x1: sofa1x, x2: sofa2x },
  },
  {
    id: '66504a50a1b2c3d4e5f6a7b9',
    name: 'Шафи та системи зберігання',
    image: { x1: wardrobe1x, x2: wardrobe2x },
  },
  {
    id: '66504a50a1b2c3d4e5f6a7ba',
    name: 'Ліжка та матраци',
    image: { x1: bed1x, x2: bed2x },
  },
  {
    id: '66504a50a1b2c3d4e5f6a7bb',
    name: 'Столи',
    image: { x1: table1x, x2: table2x },
  },
  {
    id: '66504a50a1b2c3d4e5f6a7bc',
    name: 'Стільці та табурети',
    image: { x1: chairs1x, x2: chairs2x },
  },
  {
    id: '66504a50a1b2c3d4e5f6a7bd',
    name: 'Кухні',
    image: { x1: kitchen1x, x2: kitchen2x },
  },
  {
    id: '66504a50a1b2c3d4e5f6a7be',
    name: 'Меблі для дитячої',
    image: { x1: kid1x, x2: kid2x },
  },
  {
    id: '66504a50a1b2c3d4e5f6a7bf',
    name: 'Меблі для офісу',
    image: { x1: office1x, x2: office2x },
  },
  {
    id: '66504a50a1b2c3d4e5f6a7c0',
    name: 'Меблі для передпокою',
    image: { x1: entryway1x, x2: entryway2x },
  },
  {
    id: '66504a50a1b2c3d4e5f6a7c1',
    name: 'Меблі для ванної кімнати',
    image: { x1: bathroom1x, x2: bathroom2x },
  },
  {
    id: '66504a50a1b2c3d4e5f6a7c2',
    name: 'Садові та вуличні меблі',
    image: { x1: garden1x, x2: garden2x },
  },
  {
    id: '66504a50a1b2c3d4e5f6a7c3',
    name: 'Декор та аксесуари',
    image: { x1: decor1x, x2: decor2x },
  },
];

//adding a list of categories
export const categoriesList = async () => {
  try {
    let data = await fetchCategories();
    furnitureCategories.insertAdjacentHTML(
      'beforeend',
      categories
        .filter(
          category =>
            category.id === 'all' || data.find(d => d._id === category.id)
        )
        .map(
          ({ id, name, image }) =>
            `
                    <li class="category-item">
                        <a class="category-link" data-category="${id}">
                            <div class="category-img-wrapper">
                                <img class="category-img" src="${image.x1}"  srcset="${image.x1} 1x, ${image.x2} 2x" alt="${name}"/>
                                <div class="category-overlay">${name}</div> 
                            </div>
                        </a>
                    </li>                
                    `
        )
        .join('')
    );
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Oops! Something went wrong`,
      position: 'topRight',
    });
  }
};

//creating gallery
export const createGallery = images => {
  furnitureGallery.insertAdjacentHTML(
    'beforeend',
    images
      .map(({ _id, name, color, price, images }) => {
        const colorPick = color
          .map(
            option =>
              `<span class="color-pick" style="background-color:${option};"></span>`
          )
          .join('');
        return `
                <li class="gallery-item" data-id="${_id}">
                    <img src="${images[0]}" alt="${name}" class="furniture-img"/>
                    <div class="gallery-item-dscr">
                        <p class="furniture-title">${name}</p>
                        <div class="color" data-id="${color}">${colorPick}</div>
                        <p class="price">${price} грн</p>                    
                    </div>
                    <button type="button" class="gallery-item-info-btn">Детальніше</button>
                </li>
                `;
      })
      .join('')
  );
};

export const clearGallery = () => {
  furnitureGallery.innerHTML = '';
};

export const showLoader = () => {
  loader.classList.remove('hidden');
};

export const hideLoader = () => {
  loader.classList.add('hidden');
};

//setting current category
export const setActiveCategory = categoryId => {
  furnitureCategories.querySelectorAll('.category-link').forEach(link => {
    const isActive = link.getAttribute('data-category') === categoryId;
    link.classList.toggle('active', isActive);

    const activeCategoryOverlay = link.querySelector('.category-overlay');
    if (activeCategoryOverlay) {
      activeCategoryOverlay.classList.remove('is-active');
      if (isActive) {
        activeCategoryOverlay.classList.add('is-active');
      }
    }
  });
};

let currentPage = 1;
let currentCategory = 'all';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    categoriesList(categories);
    showLoader();
    const data = await fetchDefaultFurniture(currentPage);

    if (data.furnitures.length < 8) {
      loadMoreBtn.disabled = true;
    } else {
      loadMoreBtn.disabled = false;
    }
    createGallery(data.furnitures);
    hideLoader();
    setActiveCategory('all');
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Помилка при завантаженні меблів: ${error}`,
      position: 'topRight',
    });
    hideLoader();
  }
});

//items by category
furnitureCategories.addEventListener('click', async event => {
  const link = event.target.closest('.category-link');
  if (!link) return;

  const categoryId = link.dataset.category;
  setActiveCategory(categoryId);
  clearGallery();
  showLoader();

  try {
    currentPage = 1;
    currentCategory = categoryId;
    let data;
    if (categoryId === 'all') {
      data = await fetchDefaultFurniture(currentPage);
    } else {
      data = await fetchFurnitureByCategory(categoryId, currentPage);
    }

    if (data.furnitures.length < 8) {
      loadMoreBtn.disabled = true;
    } else {
      loadMoreBtn.disabled = false;
    }

    createGallery(data.furnitures);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Помилка при завантаженні меблів по категорії: ${error}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

//additional items
loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  try {
    let data;
    if (currentCategory === 'all') {
      data = await fetchDefaultFurniture(currentPage);
    } else {
      data = await fetchFurnitureByCategory(currentCategory, currentPage);
    }

    if (data.furnitures.length < 8) {
      loadMoreBtn.disabled = true;
    }
    createGallery(data.furnitures);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Помилка при завантаженні меблів: ${error}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

//opening modal
furnitureGallery.addEventListener('click', event => {
  if (event.target.classList.contains('gallery-item-info-btn')) {
    const itemId = event.target.closest('.gallery-item').dataset.id;
    setSelectedFurniture(itemId);
    openDetailsModal();
  }
});

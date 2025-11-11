import {
  fetchCategories,
  fetchDefaultFurniture,
  fetchFurnitureByCategory,
} from './furniture-api.js';
import { openDetailsModal } from './modal-details.js';
import { setSelectedFurniture } from './data-store.js';

const furnitureCategories = document.querySelector('ul.furniture-categories');
const furnitureGallery = document.querySelector('ul.furniture-gallery');
const loadMoreBtn = document.querySelector('button.furniture-load-more-btn');
const loader = document.querySelector('span.loader');

// saving order from design
const categories = [
  {
    id: 'all',
    name: 'Всі товари',
    image: {
      x1: './img/furniture_list_section/all1x-min.jpg',
      // x2: '/img/furniture_list_section/all2x-min.jpg',
    },
  },
  {
    id: '66504a50a1b2c3d4e5f6a7b8',
    name: "М'які меблі",
    image: {
      x1: './img/furniture_list_section/sofa1x-min.jpg',
      // x2: '/img/furniture_list_section/sofa2x-min.jpg',
    },
  },
  {
    id: '66504a50a1b2c3d4e5f6a7b9',
    name: 'Шафи та системи зберігання',
    image: {
      x1: './img/furniture_list_section/wardrobe1x-min.jpg',
      // x2: '/img/furniture_list_section/wardrobe2x-min.jpg',
    },
  },
  {
    id: '66504a50a1b2c3d4e5f6a7ba',
    name: 'Ліжка та матраци',
    image: {
      x1: './img/furniture_list_section/bed1x-min.jpg',
      // x2: '/img/furniture_list_section/bed2x-min.jpg',
    },
  },
  {
    id: '66504a50a1b2c3d4e5f6a7bb',
    name: 'Столи',
    image: {
      x1: './img/furniture_list_section/table1x-min.jpg',
      // x2: '/img/furniture_list_section/table2x-min.jpg',
    },
  },
  {
    id: '66504a50a1b2c3d4e5f6a7bc',
    name: 'Стільці та табурети',
    image: {
      x1: './img/furniture_list_section/chairs1x-min.jpg',
      // x2: '/img/furniture_list_section/chairs2x-min.jpg',
    },
  },
  {
    id: '66504a50a1b2c3d4e5f6a7bd',
    name: 'Кухні',
    image: {
      x1: './img/furniture_list_section/kitchen1x-min.jpg',
      // x2: '/img/furniture_list_section/kitchen2x-min.jpg',
    },
  },
  {
    id: '66504a50a1b2c3d4e5f6a7be',
    name: 'Меблі для дитячої',
    image: {
      x1: './img/furniture_list_section/kid1x-min.jpg',
      // x2: '/img/furniture_list_section/kid2x-min.jpg',
    },
  },
  {
    id: '66504a50a1b2c3d4e5f6a7bf',
    name: 'Меблі для офісу',
    image: {
      x1: './img/furniture_list_section/office1x-min.jpg',
      // x2: '/img/furniture_list_section/office2x-min.jpg',
    },
  },
  {
    id: '66504a50a1b2c3d4e5f6a7c0',
    name: 'Меблі для передпокою',
    image: {
      x1: './img/furniture_list_section/entryway1x-min.jpg',
      // x2: '/img/furniture_list_section/entryway2x-min.jpg',
    },
  },
  {
    id: '66504a50a1b2c3d4e5f6a7c1',
    name: 'Меблі для ванної кімнати',
    image: {
      x1: './img/furniture_list_section/bathroom1x-min.jpg',
      // x2: '/img/furniture_list_section/bathroom2x-min.jpg',
    },
  },
  {
    id: '66504a50a1b2c3d4e5f6a7c2',
    name: 'Садові та вуличні меблі',
    image: {
      x1: './img/furniture_list_section/garden1x-min.jpg',
      // x2: '/img/furniture_list_section/garden2x-min.jpg',
    },
  },
  {
    id: '66504a50a1b2c3d4e5f6a7c3',
    name: 'Декор та аксесуари',
    image: {
      x1: './img/furniture_list_section/decor1x-min.jpg',
      // x2: '/img/furniture_list_section/decor2x-min.jpg',
    },
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
                                <img class="category-img" src="${image.x1}" alt="${name}"/>
                                <div class="category-overlay">${name}</div> 
                            </div>
                        </a>
                    </li>                
                    `
        )
        .join('')
    );
  } catch (error) {
    console.error('Помилка при заватаженні категорій: ', error);
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
    console.error('Помилка при завантаженні меблів:', error);
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
    console.error('Помилка при завантаженні меблів по категорії:', error);
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
    console.error('Помилка при завантаженні меблів:', error);
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

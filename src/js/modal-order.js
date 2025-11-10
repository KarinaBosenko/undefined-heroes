import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { submitOrder } from './furniture-api';
import { getSelectedColor, getSelectedFurniture } from './data-store';

const modalOverlay = document.querySelector('.modal-overlay');
const closeButton = document.querySelector('.close-button');
const orderForm = document.querySelector('.order-form');
const loader = document.querySelector('.loader');
const errorFields = document.querySelectorAll('.user-input, .user-text');
const orderButton = document.querySelector('.order-button');

// Opening and closind action

function closeModal() {
  modalOverlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

export function openModal() {
  modalOverlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}
// Appiarence actions

function appearLoader() {
  loader.classList.toggle('hidden');
}

function buttonAppear() {
  orderButton.classList.toggle('hidden');
}
// Event listeners for closing

closeButton.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', event => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// Submit process

orderForm.addEventListener('submit', handlerSubmit);

async function handlerSubmit(event) {
  event.preventDefault();
  appearLoader();
  buttonAppear();

  const name = orderForm.elements.username.value.trim();
  const phone = orderForm.elements['user-phone'].value.trim();
  const comment = orderForm.elements['form-comments'].value.trim();
  const data = {
    name,
    phone,
    modelId: getSelectedFurniture(),
    color: getSelectedColor(),
    comment,
  };

  try {
    const answer = await submitOrder(data);
    console.log(answer);

    if (answer) {
      iziToast.success({
        title: `Дякуємо, ${answer.name}!`,
        message: `Замовлення №${answer.orderNum} прийнято! Наш оператор зв'яжеться з вами найближчим часом.`,
        color: 'green',
        position: 'center',
        titleSize: '18px',
        messageSize: '18px',
      });
    }
    orderForm.reset();
    closeModal();
  } catch (error) {
    errorFields.forEach(field => {
      field.classList.add('error-message');

      field.addEventListener('input', () => {
        field.classList.remove('error-message');
      });
    });

    iziToast.error({
      title: 'Помилка',
      message: `${error.response.data.message}`,
      color: 'red',
      position: 'center',
      closeOnClick: true,
      titleSize: '18px',
      messageSize: '18px',
    });
  } finally {
    appearLoader();
    buttonAppear();
  }
}

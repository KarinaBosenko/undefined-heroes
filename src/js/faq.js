import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

function initialAccordion() {
  const params = {
    duration: 350,
    showMultiple: false,
    elementClass: 'accordion-item',
    triggerClass: 'accordion-trigger',
    panelClass: 'accordion-panel',
    activeClass: 'accordion-active',
  };

  const acc = new Accordion('.accordion-list', params);

  // добавляем класс js-enabled, если его требует CSS
  document
    .querySelectorAll('.accordion-item')
    .forEach(el => el.classList.add('js-enabled'));

  return acc;
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.accordion-list')) {
    initialAccordion();
  }
});

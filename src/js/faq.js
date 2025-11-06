document.querySelectorAll('[data-faq-arrow]').forEach(arrow => {
  arrow.addEventListener('click', e => {
    e.stopPropagation();

    const button = arrow.closest('[data-faq-question]');
    const faqItem = button.closest('[data-faq-item]');
    const answer = faqItem.querySelector('[data-faq-answer]');

    const isOpen = arrow.classList.contains('open');

    document
      .querySelectorAll('[data-faq-item]')
      .forEach(item => item.classList.remove('active'));
    document
      .querySelectorAll('[data-faq-arrow]')
      .forEach(a => a.classList.remove('open'));

    if (!isOpen) {
      faqItem.classList.add('active');
      arrow.classList.add('open');
    }

    setTimeout(updateAccordionOverflow, 300);
  });
});

function updateAccordionOverflow() {
  const accordion = document.querySelector('[data-faq-accordion]');
  if (!accordion) return;

  const contentHeight = accordion.scrollHeight;

  if (contentHeight > 1040) {
    accordion.style.overflowY = 'auto';
  } else {
    accordion.style.overflowY = 'unset';
  }
}

window.addEventListener('DOMContentLoaded', updateAccordionOverflow);

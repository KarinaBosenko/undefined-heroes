const menuButton = document.querySelector('.burger-menu');
const closeMenuButton = document.querySelector('.close-burger-menu');
const menuOverlay = document.querySelector('.menu-overlay');
const body = document.body;

const menuLinks = document.querySelectorAll(
  '.navigation-item-menu, .go-shopping-button-menu'
);

function onEscKeyPress(event) {
  if (event.key === 'Escape') {
    closeMenu();
  }
}

function onBackdropClick(event) {
  const clickedElement = event.target;
  const isInsideHeader = clickedElement.closest('.header-menu-bg');
  const isInsideNavContent = clickedElement.closest('.navigation-menu');
  const isInsideNavAfterContent = clickedElement.closest(
    '.navigation-menu::after'
  );
  if (isInsideHeader || isInsideNavContent || isInsideNavAfterContent) {
    return;
  }
  closeMenu();
}

function openMenu() {
  menuOverlay.classList.add('open');
  body.classList.add('menu-open');

  document.addEventListener('keydown', onEscKeyPress);
  menuOverlay.addEventListener('click', onBackdropClick);
}

function closeMenu() {
  menuOverlay.classList.remove('open');
  body.classList.remove('menu-open');

  document.removeEventListener('keydown', onEscKeyPress);
  menuOverlay.removeEventListener('click', onBackdropClick);
}

if (menuButton) menuButton.addEventListener('click', openMenu);
if (closeMenuButton) closeMenuButton.addEventListener('click', closeMenu);

menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

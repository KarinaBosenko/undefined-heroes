const menuButton = document.querySelector('.burger-menu');
const closeMenuButton = document.querySelector('.close-burger-menu');
const menuOverlay = document.querySelector('.menu-overlay');
const goShoppingBtnMenu = document.querySelector('.go-shopping-button-menu');

menuButton.addEventListener('click', () => {
  menuOverlay.classList.add('open');
  // if (window.innerWidth >= 768) {
  //   goShoppingBtnMenu.classList.add('container');
  // }
});

closeMenuButton.addEventListener('click', () => {
  menuOverlay.classList.remove('open');
});

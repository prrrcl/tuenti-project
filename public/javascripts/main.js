'use strict';

const main = () => {
  // Fix transitions
  const body = document.querySelector('.preload');
  body.classList.remove(...body.classList);

  // my-account
  const myAccount = document.querySelector('.my-account');
  if (myAccount) {
    myAccount.addEventListener('click', (e) => {
      myAccount.classList.toggle('opened');
    });
  }
  // menu-mobile
  const toggler = document.querySelector('.toggle-hamburger');
  const links = document.querySelector('.menu-mobile-links-box');
  if (toggler) {
    toggler.addEventListener('click', (e) => {
      toggler.classList.toggle('opened');
      links.classList.toggle('visible');
    });
  }

  // AutoSubmit profile pic
  const inputImg = document.querySelector('#profileimg');
  if (inputImg) {
    inputImg.onchange = function () {
      document.querySelector('.change-pic-form').submit();
    };
  }
};

window.addEventListener('load', main);

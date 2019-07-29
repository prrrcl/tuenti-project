'use strict';

const main = () => {
  // Fix transitions
  const body = document.querySelector('.preload');
  body.classList.remove(...body.classList);

  // my-account
  const myAccount = document.querySelector('.drop-account');
  if (myAccount) {
    myAccount.addEventListener('click', (event) => {
      myAccount.classList.toggle('opened');
      event.stopPropagation();
      if (myAccount.classList.contains('opened')) {
        document.addEventListener('click', () => {
          myAccount.classList.remove('opened');
        });
      }
      if (!myAccount.classList.contains('opened')) {
        document.removeEventListener('click');
      }
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

  // Modal upload

  const buttonUpload = document.querySelector('.upload');
  const container = document.querySelector('.modals');

  if (buttonUpload) {
    buttonUpload.addEventListener('click', () => {
      container.classList.toggle('modal-opened');
    });
  }
};

window.addEventListener('load', main);

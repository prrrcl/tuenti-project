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
  const main = document.querySelector('.content');
  const navBar = document.querySelector('.nav-bar');
  const close = document.querySelector('.close-modal');

  if (buttonUpload) {
    buttonUpload.addEventListener('click', () => {
      container.classList.add('modal-opened');
      main.classList.add('blurred');
      navBar.classList.add('blurred');
    });
  }
  if (close) {
    close.addEventListener('click', () => {
      container.classList.remove('modal-opened');
      main.classList.remove('blurred');
      navBar.classList.remove('blurred');
    });
  }
};

window.addEventListener('load', main);

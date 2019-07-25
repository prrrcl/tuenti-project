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
};

window.addEventListener('load', main);

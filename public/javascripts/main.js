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
  // Crear album
  const form = document.querySelector('.new-album');
  const listAlbums = document.querySelector('.albums-modal');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const album = {
      name: event.srcElement.name.value
    };
    const noAlbum = document.querySelector('.no-albums');
    if (noAlbum) {
      noAlbum.innerHTML = '';
    }
    const response = await axios.post('/api/addAlbum', album);
    form.reset(); // Reseteamos el form
    // creamos en el DOM lo que hemos metido en el query
    const newAlbum = response.data;
    const article = document.createElement('article');
    article.classList.add('album-item');
    article.innerHTML = `
      <a href="#">
        ${newAlbum.name}
      </a>`;
    listAlbums.appendChild(article);
  });

  // post comment
  const commentsContainer = document.querySelector('.comments');
  const formComment = document.querySelector('.comment-form');
  formComment.addEventListener('submit', async (event) => {
    event.preventDefault();
    const comment = {
      idPhoto: event.srcElement.idPhoto.value,
      comment: event.srcElement.comment.value
    };
    const responseComment = await axios.post('/api/postComment', comment);
    formComment.reset();
    const newComment = responseComment.data;
    const article = document.createElement('article');
    article.classList.add('user-comment');
    const a = document.createElement('a');
    a.setAttribute('href', `/t/user/${newComment.user[0].username}`);
    a.innerHTML = `<img src="${newComment.user[0].profileImg}">`;
    article.innerHTML = `
      <div class="comment">
        ${newComment.createdComment.comment}
      </div>
    `;
    article.appendChild(a);
    commentsContainer.appendChild(article);
  });
};

window.addEventListener('load', main);

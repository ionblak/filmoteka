import itemsTemplate from '../templates/cardsTemplate.hbs';
import itemTemplateMyLibrary from '../templates/cardsTemplatesMyLibrary.hbs';
import modalCard from '../templates/modalCard.hbs';
import { addWatchedFilm } from './add-to-watch.js';
import { addFavoriteFilm } from './add-to-favorite.js';
// import * as basicLightbox from 'basiclightbox';
// import 'basiclightbox/dist/basicLightbox.min.css';
import refs from './refs';
export default function createCards(data) {
  // перед созданием карточек чистим filmsList
  refs.filmsListHome.innerHTML = '';
  let markup = '';
  if (location.pathname === '/my-lib.html') {
    markup = itemTemplateMyLibrary(data);
  } else {
    markup = itemsTemplate(data);
  }

  refs.filmsListHome.insertAdjacentHTML('beforeend', markup);
  refs.cardFilm.addEventListener('click', openModal);

  function openModal(e) {
    const backdropModal = document.querySelector('.backdrop');
    e.preventDefault();
    const currentCard = e.target;
    if (currentCard.nodeName !== 'IMG') {
      return;
    }
    // refs.filmsListHome.innerHTML = '';
    const arrayIndex = currentCard.dataset.index;
    refs.lightboxDiv.classList.add('is-open');
    refs.mainConteiner.classList.add('backdrop_close');
    refs.backdrop.classList.add('is-opened');
    backdropModal.classList.add('is-open');

    const markup = modalCard(data[arrayIndex]);
    refs.lightboxDiv.innerHTML = markup;

    addWatchedFilm();
    addFavoriteFilm();
    const closeBtnModal = document.querySelector('.close-btn-modal');

    window.addEventListener('keydown', onEscapePress);
    refs.backdrop.addEventListener('click', hanlderCloseModal);
    closeBtnModal.addEventListener('click', handlerBtnCloseModal);

    // document.addEventListener('click', closeModal);
  }

  refs.lightboxDiv.addEventListener('click', events => {
    if (events.target === events.currentTarget) {
      onCloseModal();
    }
  });
  function hanlderCloseModal(e) {
    if (e.target.classList.contains('is-opened')) {
      onCloseModal();
    }
  }

  function handlerBtnCloseModal(e) {
    if (e.target.nodeName === 'I') {
      onCloseModal();
    }
  }
  function onCloseModal() {
    // refs.filmsListHome.innerHTML = '';
    // const markup = itemsTemplate(data);
    // refs.filmsListHome.insertAdjacentHTML('beforeend', markup);
    window.removeEventListener('keydown', onEscapePress);
    refs.lightboxDiv.classList.remove('is-open');
    refs.mainConteiner.classList.remove('backdrop_close');
    refs.backdrop.classList.remove('is-opened');
  }

  function onEscapePress(event) {
    if (event.code === 'Escape') {
      onCloseModal();
    }
  }
}

// function closeModalHandler(e) {
//   // if (e.code === 'Escape') {
//     refs.filmsListHome.innerHTML = '';
//     const markup = itemsTemplate(data);
//     refs.filmsListHome.insertAdjacentHTML('beforeend', markup);
// window.removeEventListener('keydown', closeModalHandler);
// refs.mainConteiner.classList.remove('backdrop_close');
//     refs.lightboxDiv.classList.remove("is-open");
//   // }

// }

// function closeModal(e) {
//   if (e.target !== refs.blockModalFilm) {
//     refs.filmsListHome.innerHTML = '';
//     const markup = itemsTemplate(data);
//     refs.filmsListHome.insertAdjacentHTML('beforeend', markup);
//     window.removeEventListener('keydown', closeModalHandler);
//   }
// }

import itemsTemplate from '../templates/cardsTemplate.hbs';
import itemsTemplateMyLibrary from '../templates/cardsTemplatesMyLibrary.hbs';
import modalCard from '../templates/modalCard.hbs';
import { addWatchedFilm } from './add-to-watch.js';
import { addFavoriteFilm } from './add-to-favorite.js';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import refs from './refs';

export default function createCards(data) {
  // перед созданием карточек чистим filmsList
  refs.filmsListHome.innerHTML = '';
  let markup = '';
  if (location.pathname === '/my-lib.html') {
    markup = itemsTemplateMyLibrary(data);
  } else {
    markup = itemsTemplate(data);
  }

  refs.filmsListHome.insertAdjacentHTML('beforeend', markup);
  refs.cardFilm.addEventListener('click', openModal);

  function openModal(e) {
    e.preventDefault();
    const currentCard = e.target;
    if (currentCard.nodeName !== 'IMG') {
      return;
    }
    // refs.filmsListHome.innerHTML = '';
    const arrayIndex = currentCard.dataset.index;
    // refs.lightboxDiv.classList.add('is-open');
    // refs.mainConteiner.classList.add('backdrop_close');

    const markup = modalCard(data[arrayIndex]);
    // refs.lightboxDiv.innerHTML = markup;
    const instance = basicLightbox.create(markup);
    instance.show();

    addWatchedFilm();
    addFavoriteFilm();

    // window.addEventListener('keydown', onEscapePress);
    // document.addEventListener('click', closeModal);
  }

  // refs.lightboxDiv.addEventListener('click', events => {
  //   if (events.target === events.currentTarget) {
  //     onCloseModal();
  //   }
  // });

  // function onCloseModal() {
  //   // refs.filmsListHome.innerHTML = '';
  //   // const markup = itemsTemplate(data);
  //   // refs.filmsListHome.insertAdjacentHTML('beforeend', markup);
  //   window.removeEventListener('keydown', onEscapePress);
  //   refs.lightboxDiv.classList.remove('is-open');
  //   refs.mainConteiner.classList.remove('backdrop_close');
  // }

  // function onEscapePress(event) {
  //   if (event.code === 'Escape') {
  //     onCloseModal();
  //   }
  // }
}

// function closeModalHandler(e) {
//   // if (e.code === 'Escape') {
//     refs.filmsListHome.innerHTML = '';
//     const markup = itemsTemplate(data);
//     refs.filmsListHome.insertAdjacentHTML('beforeend', markup);
//     window.removeEventListener('keydown', closeModalHandler);
//     refs.mainConteiner.classList.remove("backdrop_close");
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

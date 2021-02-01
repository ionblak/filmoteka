import itemsTemplate from '../templates/cardsTemplate.hbs';
import modalCard from '../templates/modalCard.hbs';
// import * as basicLightbox from 'basiclightbox';
// import 'basiclightbox/dist/basicLightbox.min.css';
import refs from './refs';

export default function createCards(data) {
  // перед созданием карточек чистим filmsList
  refs.filmsListHome.innerHTML = '';
  const markup = itemsTemplate(data);
  refs.filmsListHome.insertAdjacentHTML('beforeend', markup);

  refs.cardFilm.addEventListener('click', openModal);
  function openModal(e) {
    e.preventDefault();
    const currentCard = e.target;
    if (currentCard.nodeName !== 'IMG') {
      return;
    }
    refs.filmsListHome.innerHTML = '';
    const arrayIndex = currentCard.dataset.index;

    const markup = modalCard(data[arrayIndex]);
    refs.filmsListHome.innerHTML = markup;

    window.addEventListener('keydown', closeModalHandler);
    // document.addEventListener('click', closeModal);
  }

  function closeModalHandler(e) {
    if (e.code === 'Escape') {
      refs.filmsListHome.innerHTML = '';
      const markup = itemsTemplate(data);
      refs.filmsListHome.insertAdjacentHTML('beforeend', markup);
      window.removeEventListener('keydown', closeModalHandler);
    }
  }

  function closeModal(e) {
    if (e.target !== refs.blockModalFilm) {
      refs.filmsListHome.innerHTML = '';
      const markup = itemsTemplate(data);
      refs.filmsListHome.insertAdjacentHTML('beforeend', markup);
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
}

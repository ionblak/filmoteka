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

    const arrayIndex = currentCard.dataset.index;

    const markup = modalCard(data[arrayIndex]);

    const instance = basicLightbox.create(markup);
    instance.show();

    addWatchedFilm();
    addFavoriteFilm();

    window.addEventListener('keydown', () => {
      instance.close();
      window.removeEventListener('keydown');
    });
  }
}

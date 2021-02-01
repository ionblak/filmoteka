import itemsTemplate from '../templates/cardsTemplate.hbs';
import modalCard from '../templates/modalCard.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import openModal from './modalCardFilm';
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
    const arrayIndex = currentCard.dataset.index;

    const markup = modalCard(data[arrayIndex]);
    const modal = basicLightbox.create(markup);
    modal.show();
  }
}

import itemsTemplate from '../templates/cardsTemplate.hbs';
import refs from './refs';

export default function createCards(data) {
  // перед созданием карточек чистим filmsList
  refs.filmsListHome.innerHTML = '';
  const markup = itemsTemplate(data);
  refs.filmsListHome.insertAdjacentHTML('beforeend', markup);
}

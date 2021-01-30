import itemsTemplate from '../templates/cardsTemplate.hbs';
import refs from './refs';

export default function createCards(data) {
  // перед созданием карточек чистим filmsList
  refs.filmsList.innerHTML = '';
  const markup = itemsTemplate(data);
  refs.filmsList.insertAdjacentHTML('beforeend', markup);
}

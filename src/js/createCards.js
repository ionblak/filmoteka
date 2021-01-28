import itemsTemplate from '../templates/cardsTemplate.hbs';
import refs from './refs';

export default function createCards(data) {
  const markup = itemsTemplate(data);
  refs.filmsList.insertAdjacentHTML('beforeend', markup);
}

import cardsTpl from '../templates/cardsTemplate.hbs';
import refs from './refs';

function galleryList(data) {
  const markup = cardsTpl(data);
  refs.filmGallery.insertAdjacentHTML('beforeend', markup);
}

export default galleryList;

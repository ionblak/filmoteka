import 'normalize.css';

import './main.scss';
import './styles.css';

import { getPopular, getPage, DataProccessing } from './js/apiServices';
import createCards from './js/createCards';
import refs from './js/refs';
import galleryList from './js/updateGalleryMarkup';




refs.logo.addEventListener('click', () => {
  getPopular()
    .then(data => data.results)
    .then(data => {
      galleryList(data);
    });
});
refs.homeBtn.addEventListener('click', () => {
  getPopular()
    .then(data => data.results)
    .then(data => {
      galleryList(data);
    });
});


const dataProccessing = new DataProccessing();
dataProccessing.getNextPage(1).then(data => createCards(data));

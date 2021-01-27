import 'normalize.css';

import './main.scss';
import './styles.css';

import { getPopular, getPage, DataProccessing } from './js/apiServices';
import refs from './js/refs';
import galleryList from './js/updateGalleryMarkup';

// import axios from './js/apiServices';

const dataProccessing = new DataProccessing();

console.log(dataProccessing.getPopular());

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

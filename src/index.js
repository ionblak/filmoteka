import 'normalize.css';

import './main.scss';
import './styles.css';
import './js/footerModal';
import { DataProccessing, getGenresList } from './js/apiServices';
import createCards from './js/createCards';
import refs from './js/refs';
import spinner from './js/utils/spiner';
import './js/myLibrary';
import _ from 'lodash';
import './js/add-to-watch.js';

// дожлен быть только один объект для всех запросов

const dataProccessing = new DataProccessing();
const getHomePage = function () {
  // для деплоя /filmoteka/ и /filmoteka/index.html или /filmoteka/myLib.html
  if (location.pathname !== '/index.html' && location.pathname !== '/') {
    return;
  }
  dataProccessing.getPopular().then(data => {
    console.log(data);
    createCards(data);
  });
};

const searchFilm = function (event) {
  event.preventDefault();
  if (refs.searchInput.value !== '') {
    console.log(refs.searchInput.value);
    dataProccessing.keywordSearch(refs.searchInput.value).then(data => {
      createCards(data);
    });
  } else {
    console.log(refs.searchInput.value);
    refs.filmsListHome.innerHTML = '';
    getHomePage();
  }
};
if (location.pathname === '/index.html' || location.pathname === '/') {
  refs.searchForm.addEventListener('submit', searchFilm);
  refs.searchInput.addEventListener('input', _.debounce(searchFilm, 1000));
}
getHomePage();

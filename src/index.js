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
import './js/add-to-favorite.js';

// дожлен быть только один объект для всех запросов

const dataProccessing = new DataProccessing();

// для деплоя /filmoteka/ и /filmoteka/index.html или /filmoteka/myLib.html
if (location.pathname === '/index.html' || location.pathname === '/') {
  getHomePage();
}
function getHomePage() {
  dataProccessing.getPopular().then(data => {
    createCards(data);
    console.dir(data);
  });
}

const searchFilm = function (event) {
  event.preventDefault();
  dataProccessing.keywordSearch(refs.searchInput.value).then(data => {
    createCards(data);
  });
};

if (location.pathname === '/index.html' || location.pathname === '/') {
  refs.searchForm.addEventListener('submit', searchFilm);
  refs.searchInput.addEventListener('input', _.debounce(searchFilm, 1000));
}


// Слушатель на изменение окна
window.addEventListener("resize", _.debounce(() =>
{
  if (dataProccessing.isResolutionChanged()) dataProccessing.updResolution().then(data => {
    console.log('getAppPages',dataProccessing.getAppPages);
    createCards(data)
  }).catch();
}, 1000), false);
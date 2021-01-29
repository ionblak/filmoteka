import 'normalize.css';

import './main.scss';
import './styles.css';
import './js/footerModal';
import { DataProccessing } from './js/apiServices';
import createCards from './js/createCards';
import refs from './js/refs';
import spinner from './js/utils/spiner';
import './js/myLibrary';
import _ from 'lodash';
import './js/add-to-watch.js';
const dataProccessing = new DataProccessing();
const getHomePage = function () {
  if (refs.filmsList.innerHTML === '') {
    dataProccessing.getPopular().then(data => createCards(data));
  }
};
getHomePage();

const searchFilm = function (event) {
  event.preventDefault();
  if (refs.searchInput.value === '') {
    dataProccessing.getPopular().then(data => createCards(data));
  } else {
    refs.filmsList.innerHTML = '';
    dataProccessing.keywordSearch(refs.searchInput.value).then(data => {
      createCards(data);
      refs.searchInput.value = '';
    });
  }
};

refs.searchForm.addEventListener('submit', searchFilm);
refs.searchInput.addEventListener('input', _.debounce(searchFilm, 500));
refs.logo.addEventListener('click', getHomePage);
refs.homeBtn.addEventListener('click', getHomePage);

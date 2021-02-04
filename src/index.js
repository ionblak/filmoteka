import 'normalize.css';

import './main.scss';
import './styles.css';
import './js/footerModal';
import { DataProccessing } from './js/apiServices';
import createCards from './js/createCards';
import refs from './js/refs';
import spinner from './js/utils/spiner';
import './js/myLibrary';
import debounce from 'lodash.debounce';
import './js/add-to-watch.js';
import './js/add-to-favorite.js';
import './images/1fe4275159989b1b96c166aec797b5cb.jpg';
import './js/notification.js';

import toPaginateWithApi from './js/toPaginateWithApi';

// дожлен быть только один объект для всех запросов

const dataProccessing = new DataProccessing();

// для деплоя /filmoteka/ и /filmoteka/index.html или /filmoteka/my-lib.html
if (location.pathname === '/index.html' || location.pathname === '/') {
  getHomePage();
  refs.searchForm.addEventListener('submit', searchFilm);
  refs.searchInput.addEventListener('input', debounce(searchFilm, 1000));
}
// let pageNumber;
// function getHomePage() {
//   spinner.spin(refs.target);
//   dataProccessing.getPopular().then(data => {
// createCards(data);
//     console.dir(data);
//   });
// }

function getHomePage() {
  refs.filmsListHome.innerHTML = '';
  spinner.spin(refs.target);

  toPaginateWithApi();
  // console.dir(data);
}

//   dataProccessing.getPopular().then(data => {
//     createCards(data);
//     // toPaginate(data);
//     console.dir(data);
//   });
// }

function searchFilm(event) {
  spinner.spin(refs.target);
  event.preventDefault();
  refs.errorNotafication.classList.add('is-hidden');
  dataProccessing
    .keywordSearch(refs.searchInput.value)
    .then(data => {
      createCards(data);
      spinner.stop();
      console.log('data.length', data.length);
      if (data.length === 0) throw new Error('Whoops!');
    })
    .catch(function (e) {
      console.log('catch e', e);
      refs.errorNotafication.classList.remove('is-hidden');
    });
}

export { dataProccessing };

// Слушатель на изменение окна

window.addEventListener(
  'resize',
  debounce(() => {
    if (dataProccessing.isResolutionChanged())
      dataProccessing
        .updResolution()
        .then(data => {
          createCards(data);
        })
        .catch();
  }, 1000),
  false,
);

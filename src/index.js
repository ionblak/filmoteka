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
import './js/notification.js';
import './js/our-students.js';

// import toPaginateWithApi from './js/toPaginateWithApi';
import { paginateObj } from './js/toPaginateWithApi';

// дожлен быть только один объект для всех запросов

const dataProccessing = new DataProccessing();

// для деплоя /filmoteka/ и /filmoteka/index.html или /filmoteka/my-lib.html
if (location.pathname === '/index.html' || location.pathname === '/') {
  getHomePage();
  refs.searchForm.addEventListener('submit', searchFilm);
  refs.searchInput.addEventListener('input', debounce(searchFilm, 1000));
}
let keySearch = 0;

function getHomePage() {
  refs.filmsListHome.innerHTML = '';
  spinner.spin(refs.target);
  paginateObj.paginate();
}

function searchFilm(event) {
  refs.errorNotafication.classList.add('is-hidden');
  keySearch = 1;
  spinner.spin(refs.target);
  event.preventDefault();

  paginateObj.paginate();
  keySearch = 0;
}

export { dataProccessing, keySearch };

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

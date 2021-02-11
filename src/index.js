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
import './js/utils/chenge-theme';
import { listenScroll, scrollUp } from './js/utils/scroll';
import { paginateObj } from './js/toPaginateWithApi';
import './js/sign-up-modal.js';
import './js/sign-up.js';

// должен быть только один объект для всех запросов

const dataProccessing = new DataProccessing();

// для деплоя /filmoteka/ и /filmoteka/index.html или /filmoteka/my-lib.html
// if (
//   location.pathname === '/filmoteka/index.html' ||
//   location.pathname === '/filmoteka/'
// ) {
if (location.pathname === '/index.html' || location.pathname === '/') {
  getHomePage();
  refs.searchForm.addEventListener('submit', searchFilm);
  refs.searchInput.addEventListener('input', debounce(searchFilm, 1000));
  window.addEventListener('resize', debounce(lisenWindowwidth, 1000), false);
  window.addEventListener('scroll', debounce(listenScroll, 500));
  scrollUp();
}
let keySearch = false;

function getHomePage() {
  spinner.spin(refs.target);
  paginateObj.paginate();
}

function searchFilm(event) {
  keySearch = true;

  spinner.spin(refs.target);
  event.preventDefault();

  paginateObj.paginate();

  keySearch = false;
}

export { dataProccessing, keySearch };

// Слушатель на изменение окна
function lisenWindowwidth() {
  if (dataProccessing.isResolutionChanged())
    dataProccessing
      .updResolution()
      .then(data => {
        createCards(data);
      })
      .catch();
}

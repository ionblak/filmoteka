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

// дожлен быть только один объект для всех запросов
const dataProccessing = new DataProccessing();


const getHomePage = function () {
  if (refs.filmsList.innerHTML === '') {  
    dataProccessing.getPopular().then(data => createCards(data));
  }
};
getHomePage();

refs.searchForm.addEventListener('submit', (event) => event.preventDefault());

refs.searchInput.addEventListener('input',
  _.debounce(() => {
    if (refs.searchInput.value === '') dataProccessing.getPopular().then(data => createCards(data));
    else dataProccessing.keywordSearch(refs.searchInput.value).then(data => createCards(data));
    }, 500)
);

refs.logo.addEventListener('click', getHomePage);
refs.homeBtn.addEventListener('click', getHomePage);


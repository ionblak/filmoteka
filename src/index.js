import 'normalize.css';

import './main.scss';
import './styles.css';
import './js/footerModal';
import { DataProccessing } from './js/apiServices';
import createCards from './js/createCards';
import refs from './js/refs';
import _ from 'lodash';

const dataProccessing = new DataProccessing();
dataProccessing.getPopular().then(data => createCards(data));

refs.logo.addEventListener('click', () => {
  dataProccessing.getNextPage(1).then(data => createCards(data));
});
refs.homeBtn.addEventListener('click', () => {
  dataProccessing.getNextPage(1).then(data => createCards(data));
});

refs.searchForm.addEventListener('submit', (event) => event.preventDefault());

refs.searchInput.addEventListener('input',
  _.debounce(() => {
    if (refs.searchInput.value === '') dataProccessing.getPopular().then(data => createCards(data));
    else dataProccessing.keywordSearch(refs.searchInput.value).then(data => createCards(data));
    }, 500)
);
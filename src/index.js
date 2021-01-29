import 'normalize.css';

import './main.scss';
import './styles.css';
import './js/footerModal';
import { DataProccessing } from './js/apiServices';
import createCards from './js/createCards';
import refs from './js/refs';
import './js/myLibrary';
import _ from 'lodash';

const dataProccessing = new DataProccessing();
dataProccessing.getPopular().then(data => createCards(data));

refs.logo.addEventListener('click', () => {
  dataProccessing.getNextPage(1).then(data => createCards(data));
});
refs.homeBtn.addEventListener('click', () => {
  dataProccessing.getNextPage(1).then(data => createCards(data));
});
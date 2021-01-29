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

const getHomePage = function () {
  if (refs.filmsList.innerHTML === '') {
    const dataProccessing = new DataProccessing();
    dataProccessing.getPopular().then(data => createCards(data));
  }
};
getHomePage();

refs.logo.addEventListener('click', getHomePage);
refs.homeBtn.addEventListener('click', getHomePage);

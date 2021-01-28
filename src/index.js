import 'normalize.css';

import './main.scss';
import './styles.css';

import { getPopular, getPage, DataProccessing } from './js/apiServices';
import createCards from './js/createCards';

const dataProccessing = new DataProccessing();
dataProccessing.getNextPage(1).then(data => createCards(data));

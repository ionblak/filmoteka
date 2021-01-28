import 'normalize.css';

import './main.scss';
import './styles.css';

import { getPopular, getPage, DataProccessing } from './js/apiServices';

// import axios from './js/apiServices';

const dataProccessing = new DataProccessing();
dataProccessing.getNextPage(1).then(data => console.log('index.js: ', data));




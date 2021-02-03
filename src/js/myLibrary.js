const { default: refs } = require('./refs');
import { getMovieById } from '../js/apiServices';
import { getMovieByIdArray } from '../js/apiServices';

function markQueue(lokalStorage) {
  const queueListId = localStorage.getItem(lokalStorage);
  const queueList = JSON.parse(queueListId);
  const idListQueue = queueList.id;
  // for (const id of idListQueue) {
  // getMovieById(id);
  getMovieByIdArray(idListQueue).then(data => console.log(data));
}
let lokalStorageValue = 'favorite'; //'watched'
if (location.pathname === '/myLib.html') {
  markQueue(lokalStorageValue);
}


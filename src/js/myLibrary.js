import refs from './refs';

import { paginateObj } from '../js/toPaginateWithApi';
let libraryListLength = 0;
let idListQueue = [];
let myLibraryRequest = false;

import { getMovieByIdArray } from '../js/apiServices';
import createCards from './createCards';
import debounce from 'lodash.debounce';
import { listenScroll, scrollUp } from './utils/scroll';

export function markQueue(lokalStorage) {
  const queueListId = localStorage.getItem(lokalStorage);
  if (queueListId === null) {
    return;
  }
  const queueList = JSON.parse(queueListId);

  idListQueue = queueList.id;
  libraryListLength = idListQueue.length;
  myLibraryRequest = true;
    paginateObj.paginate();
    // getMovieByIdArray(idListQueue).then(data => {
    //   createCards(data);
    // });

  // for (const id of idListQueue) {
  // getMovieById(id);
//   getMoviesByIdArray(idListQueue)
//     .then(data => {
//       console.log(data);
//       data.forEach(item => (item.vote_average = item.vote_average.toFixed(1)));
//       return data;
//     })
//     .then(data => {
//       console.log(data);
//       createCards(data);
//     });

//   // export default function createCards(data) {
//   //   // перед созданием карточек чистим filmsList
//   //   refs.filmsListHome.innerHTML = '';
//   //   const markup = itemsTemplate(data);
//   //   refs.filmsListHome.insertAdjacentHTML('beforeend', markup);
//   // }


//   const idListQueue = queueList.id;

//   getMovieByIdArray(idListQueue).then(data => {
//     createCards(data);
//     if (data.length === 0) refs.upButton.style.opacity = 0;
//     else  refs.upButton.style.opacity = 1;
//   });

}
// При deploy изменить на /filmoteka/my-lib.html
// if (location.pathname === '/filmoteka/my-lib.html') {
if (location.pathname === '/my-lib.html') {
  markQueue('favorite');

  refs.libraryWatchedBtn.addEventListener('click', libraryWatched);
  refs.libraryQueueBtn.addEventListener('click', libraryQueue);

  if (refs.libraryQueueBtn.classList.contains('is-active')) {
    refs.libraryQueueBtn.removeEventListener('click', libraryQueue);
  }
  window.addEventListener('scroll', debounce(listenScroll, 500));
  scrollUp();
}

function libraryWatched(event) {
  event.preventDefault();
  refs.libraryWatchedBtn.removeEventListener('click', libraryWatched);
  refs.libraryQueueBtn.addEventListener('click', libraryQueue);
  refs.libraryWatchedBtn.classList.add('is-active');
  refs.libraryQueueBtn.classList.remove('is-active');
  markQueue('watched');
}

function libraryQueue(event) {
  event.preventDefault();
  refs.libraryQueueBtn.removeEventListener('click', libraryQueue);
  refs.libraryWatchedBtn.addEventListener('click', libraryWatched);
  refs.libraryQueueBtn.classList.add('is-active');
  refs.libraryWatchedBtn.classList.remove('is-active');
  markQueue('favorite');
}
export {myLibraryRequest,  libraryListLength, idListQueue };
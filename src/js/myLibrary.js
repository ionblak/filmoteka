import refs from './refs';
import { paginateObj } from '../js/toPaginateWithApi';

// function loadLokalStorage(lokalStorage) {
//   try {
//     const queueListId = localStorage.getItem(lokalStorage);
//     return queueListId === null ? undefined : JSON.parse(queueListId).id;
//   } catch (err) {
//     console.error('error: ', err);
//   }
// }
let libraryListLength = 0;
let idListQueue = [];
let myLibraryRequest = false;
function markQueue(lokalStorage) {
  const queueListId = localStorage.getItem(lokalStorage);
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

}
if (location.pathname === '/my-lib.html') {
  markQueue('favorite');

  refs.libraryWatchedBtn.addEventListener('click', libraryWatched);
  function libraryWatched(event) {
    event.preventDefault();
    refs.libraryWatchedBtn.removeEventListener('click', libraryWatched);
    refs.libraryQueueBtn.addEventListener('click', libraryQueue);
    refs.libraryWatchedBtn.classList.add('is-active');
    refs.libraryQueueBtn.classList.remove('is-active');
    markQueue('watched');
  }

  refs.libraryQueueBtn.addEventListener('click', libraryQueue);
  function libraryQueue(event) {
    event.preventDefault();
    refs.libraryQueueBtn.removeEventListener('click', libraryQueue);
    refs.libraryWatchedBtn.addEventListener('click', libraryWatched);
    refs.libraryQueueBtn.classList.add('is-active');
    refs.libraryWatchedBtn.classList.remove('is-active');
    markQueue('favorite');
  }

  if (refs.libraryQueueBtn.classList.contains('is-active')) {
    refs.libraryQueueBtn.removeEventListener('click', libraryQueue);
  }
}
export {myLibraryRequest,  libraryListLength, idListQueue };
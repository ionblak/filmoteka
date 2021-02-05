import refs from './refs';
import { getMovieByIdArray } from '../js/apiServices';
import createCards from './createCards';

// function loadLokalStorage(lokalStorage) {
//   try {
//     const queueListId = localStorage.getItem(lokalStorage);
//     return queueListId === null ? undefined : JSON.parse(queueListId).id;
//   } catch (err) {
//     console.error('error: ', err);
//   }
// }

function markQueue(lokalStorage) {
  const queueListId = localStorage.getItem(lokalStorage);
  const queueList = JSON.parse(queueListId);
  const idListQueue = queueList.id;
    getMovieByIdArray(idListQueue).then(data => {
      createCards(data);
    });
  
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

import refs from './refs';
import { getMovieByIdArray } from '../js/apiServices';
import createCards from './createCards';

export function markQueue(lokalStorage) {
  const queueListId = localStorage.getItem(lokalStorage);
  if (queueListId === null) {
    return;
  }
  const queueList = JSON.parse(queueListId);
  const idListQueue = queueList.id;

  getMovieByIdArray(idListQueue).then(data => {
    createCards(data);
    if (data.length === 0) refs.upButton.style.opacity = 0;
    else  refs.upButton.style.opacity = 1;
  });
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

import refs from './refs';
import debounce from 'lodash.debounce';
import { listenScroll, scrollUp } from './utils/scroll';
import { paginateObj } from '../js/toPaginateWithApi';

let libraryListLength = 0;
let idListQueue = [];
let myLibraryRequest = false;

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
export { myLibraryRequest, libraryListLength, idListQueue };

import itemsTemplate from '../templates/cardsTemplate.hbs';
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

  // export default function createCards(data) {
  //   // перед созданием карточек чистим filmsList
  //   refs.filmsListHome.innerHTML = '';
  //   const markup = itemsTemplate(data);
  //   refs.filmsListHome.insertAdjacentHTML('beforeend', markup);
  // }
  
}
let lokalStorageValue = 'favorite'; //'watched'
if (location.pathname === '/myLib.html') {
  markQueue(lokalStorageValue);
}




// export default function createCards(data) {
//   // перед созданием карточек чистим filmsList
//   refs.filmsListHome.innerHTML = '';
//   const markup = itemsTemplate(data);
//   refs.filmsListHome.insertAdjacentHTML('beforeend', markup);
//   refs.cardFilm.addEventListener('click', openModal);
//   addWatchedFilm();
//   addFavoriteFilm();
//   function openModal(e) {
//     e.preventDefault();
//     const currentCard = e.target;
//     if (currentCard.nodeName !== 'IMG') {
//       return;
//     }
//     refs.filmsListHome.innerHTML = '';
//     const arrayIndex = currentCard.dataset.index;

//     const markup = modalCard(data[arrayIndex]);
//     refs.filmsListHome.innerHTML = markup;

//     window.addEventListener('keydown', closeModalHandler);
//     // document.addEventListener('click', closeModal);
//   }

//   function closeModalHandler(e) {
//     if (e.code === 'Escape') {
//       refs.filmsListHome.innerHTML = '';
//       const markup = itemsTemplate(data);
//       refs.filmsListHome.insertAdjacentHTML('beforeend', markup);
//       window.removeEventListener('keydown', closeModalHandler);
//     }
//   }

//   function closeModal(e) {
//     if (e.target !== refs.blockModalFilm) {
//       refs.filmsListHome.innerHTML = '';
//       const markup = itemsTemplate(data);
//       refs.filmsListHome.insertAdjacentHTML('beforeend', markup);
//       window.removeEventListener('keydown', closeModalHandler);
//     }
//   }
// }
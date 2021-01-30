import modalCard from '../templates/modalCard.hbs';
import refs from './refs';

export default function createModalCards(data) {
  const markupmod = modalCard(data);
  refs.lightboxDiv.insertAdjacentHTML('beforeend', markupmod);
}



















// import * as basicLightbox from 'basiclightbox';
// import 'basiclightbox/dist/basicLightbox.min.css';

// const apiKey = '';

// const cardFilm = document.querySelector('.card__colection');



// cardFilm.addEventListener('click', openModal);

// function fetchGetMovieId(movie_id) {
//   const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`;
//   return fetch(url)
//     .then(response => response.json())
//     .then(data => ({
//       ...data,
//       popularity: data.popularity.toFixed(1),
//     }));
// }


// cardFilm.addEventListener("click", OnTagsClick);

// function OnTagsClick(event) {
//   event.preventDefault();
//   if (event.target.nodeName !== "IMG") {
//     return;
//   }
//   lightboxDiv.classList.add("is-open");
//   window.addEventListener("keydown", onEscapePress);
  
// }

// function onCloseModal(){
//   window.removeEventListener("keydown", onEscapePress);
//   lightboxDiv.classList.remove("is-open");
//  }


// function onEscapePress(event) {
// if (event.code === "Escape") {
//   onCloseModal();
// }
// }

// lightboxDiv.addEventListener("click", (events) => {
//  if (events.target === events.currentTarget) {
//     onCloseModal();
//     }
// });



// function openModal(e) {
//   e.preventDefault();

//   fetchGetMovieId(e.target.dataset.id)
//     .then(data => {
//       if (e.target.nodeName !== 'IMG') return;

//       const markup = modalFilmCard(data);
//       const modal = basicLightbox.create(markup);

//       modal.show();

//       const closeBtn = document.querySelector('.modal-close-btn');
//       closeBtn.addEventListener('click', closeModal);

//       window.addEventListener('keydown', closeModalHandler);

//       function closeModalHandler(e) {
//         if (e.code === 'Escape') {
//           modal.close();
//           window.removeEventListener('keydown', closeModalHandler);
//         }
//       }

//       function closeModal(e) {
//         modal.close();
//         window.removeEventListener('keydown', closeModalHandler);
//       }
//     })
//     .then(data => {})
//     .catch(error => {
//       console.log('oops!');
//     });
// }

// import refs from './refs';

// function fetchGetMovieId(movie_id) {
//   const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`;
//   return fetch(url)
//     .then(response => response.json())
//     .then(data => ({
//       ...data,
//       popularity: data.popularity.toFixed(1),
//     }));
// // }

// export default function openModal(e, data) {
//   // e.preventDefault();
//   const currentCard = e.target;
//   if (currentCard.nodeName !== 'IMG') return;

//   console.log(currentCard);

// fetchGetMovieId(e.target.dataset.id)
//   .then(data => {
//     const markup = modalCard(data);
//     const modal = basicLightbox.create(markup);

//     modal.show();

//     const closeBtn = document.querySelector('.modal-close-btn');
//     closeBtn.addEventListener('click', closeModal);

//     window.addEventListener('keydown', closeModalHandler);

//     function closeModalHandler(e) {
//       if (e.code === 'Escape') {
//         modal.close();
//         window.removeEventListener('keydown', closeModalHandler);
//       }
//     }

//     function closeModal(e) {
//       modal.close();
//       window.removeEventListener('keydown', closeModalHandler);
//     }
//   })
//   .then(data => {})
//   .catch(error => {
//     console.log('oops!');
//   });
// }

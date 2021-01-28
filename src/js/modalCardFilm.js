import modalCard from '../templates/modalCard.hbs';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const apiKey = '';

const cardFilm = document.querySelector('.card__colection');

cardFilm.addEventListener('click', openModal);

function fetchGetMovieId(movie_id) {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => ({
      ...data,
      popularity: data.popularity.toFixed(1),
    }));
}

function openModal(e) {
  e.preventDefault();

  fetchGetMovieId(e.target.dataset.id)
    .then(data => {
      if (e.target.nodeName !== 'IMG') return;

      const markup = modalFilmCard(data);
      const modal = basicLightbox.create(markup);

      modal.show();

      const closeBtn = document.querySelector('.modal-close-btn');
      closeBtn.addEventListener('click', closeModal);

      window.addEventListener('keydown', closeModalHandler);

      function closeModalHandler(e) {
        if (e.code === 'Escape') {
          modal.close();
          window.removeEventListener('keydown', closeModalHandler);
        }
      }

      function closeModal(e) {
        modal.close();
        window.removeEventListener('keydown', closeModalHandler);
      }
    })
    .then(data => {})
    .catch(error => {
      console.log('oops!');
    });
}

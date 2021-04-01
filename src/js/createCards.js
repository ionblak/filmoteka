import itemsTemplate from '../templates/cardsTemplate.hbs';
import itemTemplateMyLibrary from '../templates/cardsTemplatesMyLibrary.hbs';
import modalCard from '../templates/modalCard.hbs';
import { addWatchedFilm } from './add-to-watch.js';
import { addFavoriteFilm } from './add-to-favorite.js';
import { markQueue } from './myLibrary';
import refs from './refs';
export default function createCards(data) {
  // перед созданием карточек чистим filmsList
  refs.filmsListHome.innerHTML = '';
  let markup = '';
  // При deploy изменить на /filmoteka/my-lib.html
  if (location.pathname === '/filmoteka/my-lib.html') {
    // if (location.pathname === '/my-lib.html') {
    markup = itemTemplateMyLibrary(data);
  } else {
    markup = itemsTemplate(data);
  }

  refs.filmsListHome.insertAdjacentHTML('beforeend', markup);
  refs.cardFilm.addEventListener('click', openModal);

  // Стиль тень при загрузке страницы
  function loadingTheme() {
    const filmListItem = document.querySelectorAll('.film-list-item');
    const savedThem = localStorage.getItem('Theme');
    filmListItem.forEach(el => {
      if (savedThem === 'dark-theme') {
        el.classList.add('dark');
      } else {
        el.classList.remove('dark');
      }
    });
    refs.input.addEventListener('change', changeTheme);
    function changeTheme(e) {
      filmListItem.forEach(el => {
        if (e.target.checked === true) {
          el.classList.add('dark');
        } else {
          el.classList.remove('dark');
        }
      });
    }
  }
  loadingTheme();
  function openModal(e) {
    e.preventDefault();
    const currentCard = e.target;
    if (currentCard.nodeName !== 'IMG') {
      return;
    }

    refs.body.classList.add('modal-open');

    const arrayIndex = currentCard.dataset.index;

    refs.lightboxDiv.classList.add('is-open');

    const markup = modalCard(data[arrayIndex]);
    refs.lightboxDiv.innerHTML = markup;
    addWatchedFilm();
    addFavoriteFilm();

    window.addEventListener('keydown', onEscapePress);

    const butClose = document.querySelector(
      'button[data-action="close-lightbox"]',
    );
    butClose.addEventListener('click', onCloseModal);
  }

  refs.lightboxDiv.addEventListener('click', events => {
    if (events.target === events.currentTarget) {
      onCloseModal();
    }
  });

  function onCloseModal() {
    if (location.pathname === '/my-lib.html') {
      if (refs.libraryWatchedBtn.classList.contains('is-active'))
        markQueue('watched');
      else if (refs.libraryQueueBtn.classList.contains('is-active'))
        markQueue('favorite');
    }

    window.removeEventListener('keydown', onEscapePress);
    refs.lightboxDiv.classList.remove('is-open');

    refs.body.classList.remove('modal-open');
  }

  function onEscapePress(event) {
    if (event.code === 'Escape') {
      refs.body.classList.remove('modal-open');
      onCloseModal();
    }
  }
}

import itemsTemplate from '../templates/cardsTemplate.hbs';
import itemTemplateMyLibrary from '../templates/cardsTemplatesMyLibrary.hbs';
import modalCard from '../templates/modalCard.hbs';
import { addWatchedFilm } from './add-to-watch.js';
import { addFavoriteFilm } from './add-to-favorite.js';
import { markQueue } from './myLibrary';
// import * as basicLightbox from 'basiclightbox';
// import 'basiclightbox/dist/basicLightbox.min.css';
import refs from './refs';
export default function createCards(data) {
  // перед созданием карточек чистим filmsList
  refs.filmsListHome.innerHTML = '';
  let markup = '';
  if (location.pathname === '/my-lib.html') {
    markup = itemTemplateMyLibrary(data);
  } else {
    markup = itemsTemplate(data);
  }

  refs.filmsListHome.insertAdjacentHTML('beforeend', markup);
  refs.cardFilm.addEventListener('click', openModal);

  function openModal(e) {
    e.preventDefault();
    const currentCard = e.target;
    if (currentCard.nodeName !== 'IMG') {
      return;
    }

    
    const arrayIndex = currentCard.dataset.index;
    refs.lightboxDiv.classList.add('is-open');
    
   

   
    const markup = modalCard(data[arrayIndex]);
    refs.lightboxDiv.innerHTML = markup;

    addWatchedFilm();
    addFavoriteFilm();

    window.addEventListener('keydown', onEscapePress);
    

    
    const butClose = document.querySelector('button[data-action="close-lightbox"]');
    butClose.addEventListener('click',onCloseModal)
  }
  
 

  refs.lightboxDiv.addEventListener('click', events => {
    if (events.target === events.currentTarget) {
      onCloseModal();
    }
  });


  function onCloseModal() {
    if (location.pathname === '/my-lib.html') {
      if (refs.libraryWatchedBtn.classList.contains('is-active')) markQueue('watched');
      else if (refs.libraryQueueBtn.classList.contains('is-active')) markQueue('favorite');
    }
      
    window.removeEventListener('keydown', onEscapePress);
    refs.lightboxDiv.classList.remove('is-open');
    
    
   
  }

  function onEscapePress(event) {
    if (event.code === 'Escape') {
      onCloseModal();
    }
  }

  
}



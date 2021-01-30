import 'normalize.css';

import './main.scss';
import './styles.css';
import './js/footerModal';
import { getPopular, getPage, DataProccessing } from './js/apiServices';
import createCards from './js/createCards';
import createModalCards from './js/modalCardFilm';
import refs from './js/refs';

const dataProccessing = new DataProccessing();
dataProccessing.getNextPage(1).then(data => createCards(data));

refs.logo.addEventListener('click', () => {
  dataProccessing.getNextPage(1).then(data => createCards(data));
});
refs.homeBtn.addEventListener('click', () => {
  dataProccessing.getNextPage(1).then(data => createCards(data));
});




refs.cardFilm.addEventListener("click", OnTagsClick);

function OnTagsClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }

  dataProccessing.getNextPage(1).then(data =>createModalCards(data));
  refs.lightboxDiv.classList.add("is-open");
  // const target = event.path[0].currentSrc;
  // lightboxImage.setAttribute("src", target);
  window.addEventListener("keydown", onEscapePress);
 
}

function onCloseModal(){
  window.removeEventListener("keydown", onEscapePress);
  refs.lightboxDiv.classList.remove("is-open");
 }


function onEscapePress(event) {
if (event.code === "Escape") {
  onCloseModal();
}
}

refs.lightboxDiv.addEventListener("click", (events) => {
  if (events.target === events.currentTarget) {
     onCloseModal();
     }
 });
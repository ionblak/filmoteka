const { default: refs } = require('./refs');

refs.libraryBtn.addEventListener('click', markLibrary);
function markLibrary(event) {
  event.preventDefault();
  refs.filmsList.innerHTML = '';
  refs.libraryBtn.classList.add('library-btn-active');
  refs.homeBtn.classList.remove('home-btn-active');
}

refs.homeBtn.addEventListener('click', markHome);
function markHome(event) {
  refs.homeBtn.classList.add('home-btn-active');
  refs.libraryBtn.classList.remove('library-btn-active');
}

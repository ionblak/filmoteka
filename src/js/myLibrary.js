const { default: refs } = require("./refs")

refs.libraryBtn.addEventListener('click', markLibrary);
function markLibrary(event) {
    event.preventDefault();
    refs.filmsList.innerHTML = '';

}


// console.log(refs.libraryBtn);

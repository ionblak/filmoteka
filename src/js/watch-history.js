const refs = {
  btnWatched: document.querySelector('.btn-watched'),
  btnQueue: document.querySelector('.btn-queue'),
};

fetch(
  `https://api.themoviedb.org/3/search/movie?api_key=15ccc9a8c676c1c9b5477fb06b4d7b82&language=en-US&query=Wonder%20Woman%201984&page=1&include_adult=false`,
)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    data.results.forEach(({ id }) => addWatched(id));
  });

function addWatched(id) {
  refs.btnWatched.addEventListener('click', onAddWatched);
  function onAddWatched(e) {
    console.log(e);
    const objLs = {
      id: [7269],
    };
    if (e.target.nodeName === 'BUTTON') {
      const save = localStorage.getItem('watched');
      const parse = JSON.parse(save);
      console.log(parse.id);
      parse.id.push(id);

      const str = JSON.stringify(objLs);
      localStorage.setItem('watched', str);
      getMovieByID(objLs, id);
    }
  }
}
function getMovieByID(obj, id) {
  obj.id.forEach(arrayId => {
    if (arrayId === id) {
      console.log('это наш ID', arrayId);
      fetch(
        `https://api.themoviedb.org/3/movie/464052?api_key=15ccc9a8c676c1c9b5477fb06b4d7b82&language=en-US&external_source=imdb_id`,
      )
        .then(response => response.json())
        .then(data => console.log(data));
    }
  });
}

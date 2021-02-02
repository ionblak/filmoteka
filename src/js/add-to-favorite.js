import refs from './refs.js';

export function addFavoriteFilm() {
  refs.filmsListHome.addEventListener('click', handlerAddToLs);
}
function handlerAddToLs(e) {
  if (e.target.classList.contains('btn-favorite')) {
    const id = e.target.dataset.action;
    getSaveData(id);
  }
}

function getSaveData(idEl) {
  const parseObj = getObject();
  const obj = {
    id: [],
  };

  // Если данных нет, то запушить в новый объект с массивом первый ID.
  if (parseObj === null) {
    obj.id.push(idEl);
    pushToLs(obj);
    return;
  }

  // Если данные есть, то проверить на уникальность добавляемого элемента.
  getUniqueId(parseObj, idEl);
}

// Проверка при клике на кнопку, если добавляемый фильм уже есть в массиве.
function getUniqueId({ id }, idEl) {
  if (id.includes(idEl)) {
    console.log('Такой фильм уже добавлен в список просмотренных');
    return;
  }
  const parseObj = getObject();
  parseObj.id.push(idEl);
  pushToLs(parseObj);
}

// Забирает данные с LS
function getObject() {
  const save = localStorage.getItem('favorite');
  const parse = JSON.parse(save);
  return parse;
}

// Пушит объект в LS
function pushToLs(obj) {
  const str = JSON.stringify(obj);
  localStorage.setItem('favorite', str);
}
// Пример запроса на backend по ID для дальнейшего рендеринга

//  function getMovieByID( id) {
//   obj.id.forEach(arrayId => {
//
//
//       fetch(
//         `https://api.themoviedb.org/3/movie/${ID}?api_key=15ccc9a8c676c1c9b5477fb06b4d7b82&language=en-US&external_source=imdb_id`,
//       )
//         .then(response => response.json())
//         .then(data => console.log(data));
//
//   });
// }

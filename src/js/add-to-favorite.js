import refs from './refs.js';
import { renderNotyfi, renderNotyfiWarn, resetNotify } from './notification.js';

export function addFavoriteFilm() {
  refs.lightboxDiv.addEventListener('click', handlerAddToLs);
}

const favorSucsess = 'Movies has been added to favorite';
const favorWarn = 'Movie has already been added to favorite';

function handlerAddToLs(e) {
  if (e.target.classList.contains('btn-favorite')) {
    const id = e.target.dataset.action;
    getSaveData(id, e);
  }
}

function getSaveData(idEl, e) {
  const parseObj = getObject();
  const obj = {
    id: [],
  };

  // Если данных нет, то запушить в новый объект с массивом первый ID.
  if (parseObj === null) {
    resetNotify();
    renderNotyfi(favorSucsess);
    obj.id.push(idEl);
    pushToLs(obj);
    return;
  }

  // Если данные есть, то проверить на уникальность добавляемого элемента.
  getUniqueId(parseObj, idEl, e);
}

// Проверка при клике на кнопку, если добавляемый фильм уже есть в массиве.
function getUniqueId({ id }, idEl, e) {
  if (id.includes(idEl)) {
    resetNotify();
    renderNotyfiWarn(favorWarn);
    console.log('Такой фильм уже добавлен в список избранных');
    return;
  }
  resetNotify();
  renderNotyfi(favorSucsess);
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

const refs = {
  btnQueue: document.querySelector('.btn-favorite'),
};

// На место нее будет прилетать ID
const idElement = 464052;
const parseElement = getObjectFavorite();
// Потом удалится
fetch(
  `https://api.themoviedb.org/3/search/movie?api_key=15ccc9a8c676c1c9b5477fb06b4d7b82&language=en-US&query=Wonder%20Woman%201984&page=1&include_adult=false`,
)
  .then(response => response.json())
  .then(data => {
    data.results.forEach(({ id }) => addWatched(id));
  });

// Получает ID добавляемого в коллекцию элемента
function addWatched(id) {
  refs.btnQueue.addEventListener('click', onAddWatched);

  function onAddWatched(e) {
    if (e.target.nodeName === 'BUTTON') {
      getSaveData(idElement);
    }
  }
}

function getSaveData(idEl) {
  const parseObj = getObjectFavorite();
  const obj = {
    id: [532865, 399566, 531876],
  };

  // Если данных нет, то запушить в новый объект с массивом первый ID.
  if (parseObj === null) {
    obj.id.push(idEl);
    const str = JSON.stringify(obj);
    localStorage.setItem('favorite', str);

    return;
  }

  // Если данные есть, то проверить на уникальность добавляемого элемента.
  getUniqueId(parseObj, idEl);
}

// Проверка при клике на кнопку, если добавляемый фильм уже есть в массиве.
function getUniqueId({ id }, idEl) {
  console.log(id, idEl);
  id.forEach(id => {
    if (id === idEl) {
      console.log('Такой фильм уже добавлен в список просмотренных');

      return;
    }
  });
}

// Забирает данные с LS
function getObjectFavorite() {
  const save = localStorage.getItem('favorite');
  const parse = JSON.parse(save);

  return parse;
}

// Пример запроса на backend по ID для дальнейшего рендеринга

// function getMovieByID({ id }) {
//   id.forEach(id => {
//     fetch(
//       `https://api.themoviedb.org/3/movie/${id}?api_key=15ccc9a8c676c1c9b5477fb06b4d7b82&language=en-US&external_source=imdb_id`,
//     )
//       .then(response => response.json())

// Тут получаем данные после перебора
//       .then(data => console.log(data.original_title));
//   });
// }
// getMovieByID(parseElement);

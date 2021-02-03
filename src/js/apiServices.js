import axios from 'axios';
import spinner from '../js/utils/spiner';
// Для работы с API используем объект и его методы DataProccessing
// keywordSearch(keyword) - для поиска по сключевому слову
// getPopular() - получить список популярных фильмов
// getNextPage(page) - возвращает данные для страницы page
// Пока другие методы не юзаем. оказывается приватные свойства это экспериментальная тема, и ничего не компилится

const API_KEY = '15ccc9a8c676c1c9b5477fb06b4d7b82';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const getPopularPath = pageNum => {
  spinner.stop();

  return `movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}&region=UA`;
};

const getKeywordPath = (keyword, pageNum) => {
  return `search/movie?api_key=${API_KEY}&language=en-US&query=${keyword.replace(
    ' ',
    '+',
  )}&page=${pageNum}&include_adult=false`;
};

const getPage = (keyword, pageNum) => {
  let url;
  if (keyword === '') url = getPopularPath(pageNum);
  else url = getKeywordPath(keyword, pageNum);
  return axios.get(url).then(res => res.data);
};

const getGenres = () => {
  const url = `/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  return axios.get(url).then(res => res.data);
};

export const getMovieById = id => {
  const url = `movie/${id}?api_key=${apiKey}`;
  return axios.get(url).then(res => res.data);
};

// Константа кол-во фильмов на каждой странице от API
const API_RESULTS_PER_PAGE = 20;

// Объект для формирования, отправки запроса и дальнейшей обработки данных
class ApiRequest {
  constructor(keyword, apiPage, filmIndex, films) {
    this.keyword = keyword;
    this.apiPage = apiPage;
    this.filmIndex = filmIndex;
    this.films = films;
    this.promise = new Promise((resolve, reject) => {});
  }

  getData() {
    this.promise = getPage(this.keyword, this.apiPage);
    return this.promise;
  }
}

// Объект хранит в себе "служебные" результаты запроса (нужны для посчета кол-ва страниц)
class ApiData {
  constructor(keyword, totalResults, totalPages) {
    this.keyword = keyword;
    this.totalResults = totalResults;
    this.totalPages = totalPages;
  }

  updData(totalResults, totalPages) {
    this.totalResults = totalResults;
    this.totalPages = totalPages;
  }

  updKeyword(keyword) {
    this.keyword = keyword;
  }
}

export class DataProccessing {
  constructor(keyword = '', totalResults, totalPages) {
    this.apiData = new ApiData(keyword, totalResults, totalPages);
    this.apiRequests = [];
    this.appPages = 1;
    this.appCurrentPage = 1;
    this.genresList = [];
    this.promise = new Promise((resolve, reject) => {});
    this.resultsPerPage = 0;
    this.defineNewPageNumber();
  }

  get getAppPages() {
    return this.appPages;
  }

  get getAppCurrentPage() {
    return this.appCurrentPage;
  }

  getGenresArray(ids) {
    return ids.map(item => this.getGenreById(item));
  }

  keywordSearch(keyword) {
    // update keyword
    this.apiData.updKeyword(keyword);
    return this.getNextPage(1);
  }

  async getPopular() {
    if (this.genresList.length === 0) {
      await getGenres().then(
        data => (this.genresList = Array.from(data.genres)),
      );
    }
    return await this.getNextPage(1);
  }

  getNextPage(page) {
    this.apiRequests.splice(0, this.apiRequests.length);
    this.appCurrentPage = page;

    this.apiRequests = this.defineApiRequests();
    const resultDataArr = [];
    this.promise = new Promise((resolve, reject) => {
      resolve(
        Promise.all(this.apiRequests.map(item => item.getData())).then(data => {
          this.updPageData(data.total_results, data.total_pages);
          data.map((it, index) => {
            const filtered = this.filterDataArray(it.results, index);
            resultDataArr.push(...filtered);
          });
          return resultDataArr;
        }),
      );
    });
    return this.promise;
  }

  isResolutionChanged() {
    return this.resultsPerPage !== this.defineResultsPerPage();
  }

  // ------ PRIVATE ------

  getGenreById(id) {
    const searchGenre = this.genresList.find(item => item.id === id);
    if (searchGenre) return searchGenre.name;
    else return '';
  }

  updPageData(totalResults, totalPages) {
    this.apiData.updData(totalResults, totalPages);
    this.appPages = Math.ceil(totalResults / this.resultsPerPage);
  }

  async updResolution() {
    const newPageNumber = this.defineNewPageNumber();
    if (newPageNumber) {
      return this.getNextPage(newPageNumber);
    }
  }

  filterDataArray(item, ApiIndex) {
    const matchFilmIndex = this.apiRequests[ApiIndex].filmIndex;
    const matchFilms = this.apiRequests[ApiIndex].films;
    const filteredArray = item.filter(
      (it, index) =>
        index >= matchFilmIndex && index < matchFilmIndex + matchFilms,
    );
    // Названия жанров получить по ID и собрать в строку через запятую
    filteredArray.forEach(
      item =>
        (item.genre_ids = Array.from(this.getGenresArray(item.genre_ids)).join(
          ', ',
        )),
    );
    // Рейтинг фильмов виводить с одним значением после точки(0.0)
    filteredArray.forEach(
      item => (item.vote_average = item.vote_average.toFixed(1)),
    );

    // Дату обрезать (только год релиза, если он не underfined)
    filteredArray.forEach(item => {
      if (item.release_date) {
        item.release_date = item.release_date.slice(0, 4);
      }
    });
    return filteredArray;
  }

  defineApiRequests() {
    // Создаем объект запроса
    const firstRequest = new ApiRequest(this.apiData.keyword);
    const resArray = [];
    // Рассчитываем какую страницу от API нужно запросить
    firstRequest.apiPage = Math.ceil(
      ((this.appCurrentPage - 1) * this.resultsPerPage + 1) /
        API_RESULTS_PER_PAGE,
    );
    // Рассчитываем начиная с какого объекста из ответа API будем забирать инфо
    firstRequest.filmIndex =
      ((this.appCurrentPage - 1) * this.resultsPerPage) % API_RESULTS_PER_PAGE;

    // Сколько фильмов из этой страницы API заберем (не больше this.resultsPerPage)
    firstRequest.films =
      firstRequest.filmIndex > API_RESULTS_PER_PAGE - this.resultsPerPage
        ? API_RESULTS_PER_PAGE - firstRequest.filmIndex
        : this.resultsPerPage;
    // Добавляем созданный объект в массив данных для запроса
    resArray.push(firstRequest);

    // Если количество фильмов на странице будет меньше this.resultsPerPage - нам нужен второй запрос
    if (firstRequest.films < this.resultsPerPage) {
      const secondRequest = new ApiRequest(this.apiData.keyword);
      secondRequest.apiPage = firstRequest.apiPage + 1;
      secondRequest.filmIndex = 0;
      secondRequest.films = this.resultsPerPage - firstRequest.films;
      // Добавляем созданный объект в массив данных для запроса
      resArray.push(secondRequest);
    }
    return resArray;
  }

  defineResultsPerPage() {
    if (window.innerWidth >= 1024) {
      return 9;
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      return 8;
    } else if (window.innerWidth < 768) {
      return 4;
    }
  }

  defineNewPageNumber() {
    const updResults = this.defineResultsPerPage();
    if (this.resultsPerPage === 0) this.resultsPerPage = updResults;
    if (this.resultsPerPage !== updResults) {
      // Индекс второго эл-та на текущей странице начиная с 1го (второго, потому что)
      const currentPageElemId =
        this.appCurrentPage * this.resultsPerPage - (this.resultsPerPage - 1);
      // Определяем на какой странице с новым расширением будет первый элемент текущей страницы
      const pageNumWithCurrElem = Math.ceil(currentPageElemId / updResults);
      // Обновить номер текущей страницы
      this.resultsPerPage = updResults;
      return pageNumWithCurrElem;
    }
  }
}

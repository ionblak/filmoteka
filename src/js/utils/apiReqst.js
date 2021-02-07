import axios from 'axios';
import spinner from './spiner';
const API_KEY = '15ccc9a8c676c1c9b5477fb06b4d7b82';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

// Сформировать путь запроса к популярным
const getPopularPath = pageNum => {
  spinner.stop();
  return `movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}&region=UA`;
};

// Сформировать путь запроса для поиска по ключевому слову
const getKeywordPath = (keyword, pageNum) => {
  return `search/movie?api_key=${API_KEY}&language=en-US&query=${keyword.replace(
    ' ',
    '+',
  )}&page=${pageNum}&include_adult=false`;
};

// Получить страницу по номеру
export const getPage = (keyword, pageNum) => {
  let url;
  if (keyword === '') url = getPopularPath(pageNum);
  else url = getKeywordPath(keyword, pageNum);
  return axios.get(url).then(res => res.data);
};

// Получить перечень жанров фильмов
export const getGenres = () => {
  const url = `/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  return axios.get(url).then(res => res.data);
};

// Получить данные о фильму по id
export const getMovieById = id => {
  const url = `movie/${id}?api_key=${API_KEY}`;
  return axios.get(url).then(res => res.data);
};
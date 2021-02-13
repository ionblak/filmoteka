import axios from 'axios';
import spinner from './spiner';
const API_KEY = '15ccc9a8c676c1c9b5477fb06b4d7b82';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

// Сформировать путь запроса к популярным
const getPopularPath = pageNum => {
  spinner.stop();
  return `movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}&region=US`;
};

// Сформировать путь запроса для поиска по ключевому слову
const getKeywordPath = (keyword, pageNum) => {
  return `search/movie?api_key=${API_KEY}&language=en-US&query=${keyword.replace(
    ' ',
    '+',
  )}&page=${pageNum}&include_adult=false`;
};

// Сформировать путь запроса для поиска по жанру
const getGenrePath = (genreId, pageNum) => {
  return `discover/movie?api_key=${API_KEY}&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}&with_genres=${genreId}`;
};

// Получить страницу по номеру
export const getPage = (keyword, pageNum, genreID) => {
  let url;
  if (genreID === 0) {
    if (keyword === '') url = getPopularPath(pageNum);
    else url = getKeywordPath(keyword, pageNum);
  } else url = getGenrePath(genreID, pageNum);
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

export const getMoviesByGenres = (genre) => {
  const url = `genre/movie/list?api_key=${API_KEY}&language=en-US`;
  return axios.get(url).then(res => res.data);
}
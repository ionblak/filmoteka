import { renderNotyfi, renderNotyfiWarn, resetNotify } from './notification.js';
import refs from './refs.js';
import { changeBtnText } from './btn-ctrl';

const deleteFn = () =>
  `<span class="delete-btn hidden-delete"> <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" class="am_Error_Icon"> <path class="am_SVG_circle" d="m444.34693,114.07007a236.95276,236.95276 0 0 1 44.1553,137.73747c0,129.97005 -106.94772,236.96443 -236.91777,236.96443s-236.91777,-106.94772 -236.91777,-236.91777s106.94772,-236.96443 236.91777,-236.96443a236.99941,236.99941 0 0 1 168.72548,70.59483"></path> <line class="am_SVG_error1" y2="390" x2="390" y1="110" x1="110"></line> <line class="am_SVG_error2" y2="390" x2="110" y1="110" x1="390"></line> </svg></span>`;

const success = () =>
  `<span class="success-btn hidden-success"> <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" class="am_Success_Icon "> <path class="am_SVG_circle" d="m443.0136,114.07007a236.95276,236.95276 0 0 1 44.1553,137.73747c0,129.97005 -106.94772,236.96443 -236.91777,236.96443s-236.91777,-106.94772 -236.91777,-236.91777s106.94772,-236.96443 236.91777,-236.96443a236.99941,236.99941 0 0 1 168.72548,70.59483"></path> <polyline class="am_SVG_check" points="104.4892349243164,309.2001647949219 195.57406616210938,402.9600524902344 418.9292297363281,85.03718566894531 "></polyline> </svg></span>`;
let deleteInterval = null;
let successInterval = null;

const favorSucsess = 'Movies has been added to watched';
const favorWarn = 'Movie has been removed from watched';

export function addWatchedFilm() {
  // idMovieInList();
  const lightboxDiv = document.querySelector('.container_modal');
  lightboxDiv.addEventListener('click', handlerAddToLs);
}
function handlerAddToLs(e) {
  if (e.target.classList.contains('btn-watched')) {
    console.log('watched');
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
    if (id.indexOf(idEl) !== -1) id.splice(id.indexOf(idEl), 1);
    const obj = {
      id: id,
    };
    clearInterval(successInterval);
    clearInterval(deleteInterval);
    e.target.innerHTML = deleteFn();
    const btnDelete = document.querySelector('.delete-btn');
    btnDelete.classList.remove('hidden-delete');
    deleteTimer(e);
    // changeBtnText('watched', 'add');
    updLS(obj);
    return;
  }
  resetNotify();
  renderNotyfi(favorSucsess);

  clearInterval(successInterval);
  clearInterval(deleteInterval);
  e.target.innerHTML = success();
  const btnSuccess = document.querySelector('.success-btn');
  btnSuccess.classList.remove('hidden-success');
  successTimer(btnSuccess, e);

  const parseObj = getObject();
  parseObj.id.push(idEl);
  pushToLs(parseObj);
  // changeBtnText('watched', 'remove');
}

// Забирает данные с LS
function getObject() {
  const save = localStorage.getItem('watched');
  const parse = JSON.parse(save);
  return parse;
}

// Пушит объект в LS
function pushToLs(obj) {
  const str = JSON.stringify(obj);
  localStorage.setItem('watched', str);
}

// Обновляет LS
function updLS(obj) {
  localStorage.removeItem('watched');
  const str = JSON.stringify(obj);
  localStorage.setItem('watched', str);
}

// function idMovieInList() {
//   const addToListBtnRef = document.querySelector('.btn-watched');
//   if (isIDAlreadyInList(addToListBtnRef.dataset.action)) changeBtnText('watched', 'remove')
//   else changeBtnText('watched', 'add');

//   }

// Проверить объект уже в списке
function isIDAlreadyInList(id) {
  const data = getObject();
  if (data !== null) if (data.id.indexOf(id) !== -1) return true;
  return false;
}

function successTimer(btnSuccess, e) {
  successInterval = setTimeout(() => {
    console.dir(e.target);
    e.target.textContent = 'ADD TO QUEUE';
    btnSuccess.classList.add('hidden-success');
  }, 4000);
}
function deleteTimer(e) {
  deleteInterval = setTimeout(() => {
    e.target.textContent = 'ADD TO QUEUE';
    // btnDelete.classList.add('hidden-success');
  }, 4000);
}

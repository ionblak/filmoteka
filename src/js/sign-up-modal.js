import refs from './refs.js';
import { LoginFn } from './login.js';
import { SignUpFn } from './sign-up.js';
import { logout, logoutConfirm } from './logout.js';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

const API_KEY_APP = `AIzaSyBMCQtR51zm0k7g2lNEh8Aamr - jVKTpG8k`;

// Разметка модалки
const signUpMarkup = () =>
  `  <div class="modal-backdrop" data-modal="open">
      <div class="sign-up-modal">
        <h2 class=" sign-up-title">Введите логин и пароль</h2>
        <form action="" class="form-sign-up">
          <label for="login" class="login">
            <input type="login" id="login" placeholder="login">
          </label>
          <label for="password" class="password">
            <input type="password" id="password" placeholder="password">
          </label>
          <div class="btn-wrapper">
          <button class="btn-login" type="button">Логин</button>
          <button class="btn-sign-up" type="button">Регистрация</button>
          </div>
        </form>
      </div>
    </div>`;

// Если в LS есть idTOken
if (getDataFromLS() !== null) {
  refs.signUpModal.textContent = 'Logout';
}

//Функция окрытие модалки
function openModal() {
  let email = '';
  let password = '';

  // Слушает кнопку Sign Up
  refs.signUpModal.addEventListener('click', handlerSignUpOpenMOdal);
  function handlerSignUpOpenMOdal(e) {
    e.preventDefault();

    // Если залогинелись, то открыть модалку выхода из аккаунта
    if (getDataFromLS() !== null) {
      refs.headerHome.insertAdjacentHTML('beforeend', logout());
      logoutConfirm();
    } else {
      refs.headerHome.insertAdjacentHTML('beforeend', signUpMarkup());

      const emailInput = document.querySelector('#login');
      const passwordInput = document.querySelector('#password');
      const btnRegister = document.querySelector('.btn-sign-up');
      const btnLogin = document.querySelector('.btn-login');
      const modalAuth = document.querySelector('.modal-backdrop');

      modalAuth.classList.remove('modal-hidden');

      emailInput.addEventListener('input', handlerGetEmail);
      passwordInput.addEventListener('input', handlerGetPassword);
      btnLogin.addEventListener('click', handlerLogin);
      btnRegister.addEventListener('click', handlerRegister);

      window.addEventListener('keydown', onEscapePress);
      function onEscapePress(event) {
        if (event.code === 'Escape') {
          modalAuth.remove();
        }
      }
    }
  }

  function handlerGetEmail(e) {
    email = e.currentTarget.value;
  }
  function handlerGetPassword(e) {
    password = e.currentTarget.value;
  }

  function handlerLogin(e) {
    e.target.disabled = true;
    objLogin(e, { email, password });
  }
  function handlerRegister(e) {
    e.target.disabled = true;
    objRegister(e, { email, password });
  }
}

openModal();

function objLogin(e, object) {
  const modalAuth = document.querySelector('.modal-backdrop');

  LoginFn(e, API_KEY_APP, options(object)).then(data => {
    console.log(data);
    if (data.error) {
      e.target.disabled = false;
      return console.log(data.error.message);
    }
    const idToken = data.idToken;

    if (idToken) {
      console.log('Успешный вход');
      localStorage.setItem('idToken', idToken);
      modalAuth.remove();
      refs.signUpModal.textContent = 'Logout';
      refs.signUpModal.classList.remove('is-open');
    }
  });
}

function objRegister(e, object) {
  const modalAuth = document.querySelector('.modal-backdrop');

  SignUpFn(e, API_KEY_APP, options(object)).then(data => {
    if (data.error.code) {
      e.target.disabled = false;
      return console.log(data.error.message);
    }
    const idToken = data.idToken;
    if (idToken) {
      console.log('Успешная регистрация');
      localStorage.setItem('idToken', idToken);
      modalAuth.remove();
      refs.signUpModal.textContent = 'Logout';
      refs.signUpModal.classList.remove('is-open');
    }
  });
}

function getDataFromLS() {
  const save = localStorage.getItem('idToken');
  return save;
}

function options(object) {
  const options = {
    method: 'POST',
    body: JSON.stringify(object),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return options;
}

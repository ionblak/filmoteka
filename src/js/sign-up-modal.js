import refs from './refs.js';
import { handlerLoginFn } from './login.js';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

const API_KEY_APP = `AIzaSyBMCQtR51zm0k7g2lNEh8Aamr - jVKTpG8k`;

const signUpMarkup = () =>
  `  <div class="modal-backdrop">
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

if (getDataFromLS() !== null) {
  refs.signUp.textContent = 'Logged';
}

function openModal() {
  let email = '';
  let password = '';

  refs.signUp.addEventListener('click', handlerSignUp, { once: true });
  function handlerSignUp(e) {
    e.preventDefault();
    refs.headerHome.insertAdjacentHTML('beforeend', signUpMarkup());

    const emailInput = document.querySelector('#login');
    const passwordInput = document.querySelector('#password');
    const btnSubmit = document.querySelector('.btn-sign-up');
    const btnLogin = document.querySelector('.btn-login');
    const modalAuth = document.querySelector('.modal-backdrop');

    emailInput.addEventListener('input', handlerGetEmail);
    passwordInput.addEventListener('input', handlerGetPassword);
    btnLogin.addEventListener('click', handlerLogin);
    btnSubmit.addEventListener('click', handlerSubmit);

    window.addEventListener('keydown', onEscapePress);

    function onEscapePress(event) {
      if (event.code === 'Escape') {
        modalAuth.classList.add('modal-hidden');
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
    obj(e, { email, password });
  }
}

openModal();

function obj(e, object) {
  const options = {
    method: 'POST',
    body: JSON.stringify(object),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  handlerLoginFn(e, API_KEY_APP, options).then(data => {
    const modalAuth = document.querySelector('.modal-backdrop');
    const idToken = data.idToken;

    if (idToken) {
      console.log('Успешный вход');
      localStorage.setItem('idToken', idToken);
      modalAuth.classList.add('modal-hidden');
      refs.signUp.textContent = 'Logged';
    }
  });
}

function getDataFromLS() {
  const save = localStorage.getItem('idToken');
  console.log(save);
  return save;
}

function handlerSubmit(e) {
  e.preventDefault();
  //   return fetch(
  //     `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY_APP}`,
  //     options,
  //   )
  //     .then(response => response.json())
  //     .then(data => console.log(data));
}

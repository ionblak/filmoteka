const favorSucsess = 'This movies has been added to favorites';
const favorWarn = 'This movie has already been added to favorites';

const templateNotyfi = message => {
  return `<div class="notifycation__container">
    <p class="notifycation__title">${message}</p>
    </div>`;
};

export function renderNotyfi(message) {
  const btnWrapper = document.querySelector('.history-btn-wrapper');
  btnWrapper.insertAdjacentHTML('beforeend', templateNotyfi(message));

  const btnContainer = document.querySelector('.notifycation__container');
  btnContainer.classList.add('notify-is-visible');

  setTimeout(() => {
    btnContainer.classList.remove('notify-is-visible');
  }, 2000);

  setTimeout(() => {
    btnContainer.remove();
  }, 3000);
}

export function renderNotyfiWarn(message) {
  const btnWrapper = document.querySelector('.history-btn-wrapper');
  btnWrapper.insertAdjacentHTML('beforeend', templateNotyfi(message));

  const btnContainer = document.querySelector('.notifycation__container');
  const btnNotifyTItle = document.querySelector('.notifycation__title');

  btnContainer.classList.add('notify-is-visible');
  btnNotifyTItle.classList.add('warn');

  setTimeout(() => {
    btnContainer.classList.remove('notify-is-visible');
  }, 2000);

  setTimeout(() => {
    btnContainer.remove();
  }, 3000);
}

export function resetNotify() {
  const btnContainer = document.querySelector('.notifycation__container');
  if (btnContainer) {
    btnContainer.remove();
  }
}

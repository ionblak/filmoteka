import refs from './refs';

export const logout = () => `
  <div class="modal-backdrop logout-backdrop data-modal="open">
      <div class="sign-up-modal logout">
        <h2 class=" sign-up-title logout-title">Do you really want to leave?</h2>
        <div class="btn-wrapper">
        <button class="logout-yes" type="button">Yes</button>
        <button class="logout-no" type="button">No</button>
        </div>
      </div>
    </div>
`;

export function logoutConfirm() {
  const btnLogoutYes = document.querySelector('.logout-yes');
  const btnLogoutNo = document.querySelector('.logout-no');
  btnLogoutYes.addEventListener('click', handlerLogoutYes);
  btnLogoutNo.addEventListener('click', handlerLogoutNo);
}

function handlerLogoutYes(e) {
  const modalConfirm = document.querySelector('.modal-backdrop');

  if (e.currentTarget.classList.contains('logout-yes')) {
    localStorage.removeItem('idToken');
    refs.signUpModal.textContent = 'Sign Up';
    modalConfirm.remove();
  }
}

function handlerLogoutNo(e) {
  const modalConfirm = document.querySelector('.modal-backdrop');

  if (e.currentTarget.classList.contains('logout-no')) {
    modalConfirm.remove();
    return;
  }
}

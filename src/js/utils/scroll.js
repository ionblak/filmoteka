import refs from '../refs';

export function listenScroll() {
    if (window.innerWidth >= 1024) {
      if (window.scrollY > 600) {
        refs.upButton.style.opacity = 1;
        refs.upButton.disabled = false;
      }
      else {
        refs.upButton.style.opacity = 0;
        refs.upButton.disabled = true;
      }
    }
}
  
export function scrollUp() {
  if (refs.upButton) {
  refs.upButton.addEventListener('click', event => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      });
    });
  }
}
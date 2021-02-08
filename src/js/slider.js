/* Индекс слайда по умолчанию */
export const slider = () => {
  let slideIndex = 1;
  const list = document.querySelector('.slider-dots');
  const dots = document.querySelectorAll('.slider-dots_item');
  let intervalId = null;
  let numActive = [...dots];
  numActive = numActive.findIndex(nodes) + 1;
  function nodes(node) {
    node.forEach(node => {
      node.classList.contains('active');

      dots[slideIndex - 1].dataset.active === '';
    });
  }
  function handlerActive(e) {
    if (e.target.nodeName === 'LI') {
      console.log(e.target.dataset.onclick === '1');
      if (e.target.dataset.onclick === '1') {
        currentSlide(1);
        sliderStart(1);
      } else if (e.target.dataset.onclick === '2') {
        currentSlide(2);
        sliderStart(2);
      } else if (e.target.dataset.onclick === '3') {
        currentSlide(3);
        sliderStart(3);
      } else if (e.target.dataset.onclick === '4') {
        currentSlide(4);
        sliderStart(4);
      } else if (e.target.dataset.onclick === '5') {
        currentSlide(5);
        sliderStart(5);
      } else if (e.target.dataset.onclick === '6') {
        currentSlide(6);
        sliderStart(6);
      } else if (e.target.dataset.onclick === '7') {
        currentSlide(7);
        sliderStart(7);
      } else if (e.target.dataset.onclick === '8') {
        console.log('8');
        currentSlide(8);
        sliderStart(8);
      }
    }
  }

  list.addEventListener('click', handlerActive);

  showSlides(slideIndex);
  /* Функция увеличивает индекс на 1, показывает следующй слайд*/
  function plusSlide() {
    showSlides((slideIndex += 1));
  }
  /* Функция уменьшает индекс на 1, показывает предыдущий слайд*/
  function minusSlide() {
    showSlides((slideIndex -= 1));
  }
  /* Устанавливает текущий слайд */
  function currentSlide(n) {
    console.log('tet');
    showSlides((slideIndex = n));
  }
  /* Основная функция слайдера */
  function showSlides(n) {
    console.log('showlides', n);
    let i;
    const slides = document.getElementsByClassName('slider-item');
    const dots = document.getElementsByClassName('slider-dots_item');
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    slides[slideIndex - 1].style.display = 'block';
    for (i = 1; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace('active', '');
    }
    dots[slideIndex - 1].className += ' active';
  }
  // функция запускает слайдер
  function sliderStart(number) {
    if (intervalId) {
      clearInterval(intervalId);
    }

    numActive =
      [...dots].findIndex(node => [...node.classList].includes('active')) + 1;

    if (number) {
      numActive = number;
    }

    intervalId = setInterval(() => {
      if (numActive !== 8) {
        numActive++;
      } else {
        numActive = 1;
      }
      // console.log('numActive', numActive);
      currentSlide(numActive);
    }, 1000);
    console.log(intervalId);
  }
  if (!intervalId) {
    sliderStart();
  }
};

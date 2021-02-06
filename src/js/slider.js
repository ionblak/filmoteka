/* Индекс слайда по умолчанию */

const image = [
  `./images/students/anton.png`,
  `./images/students/vlad.png`,
  `./images/students/neliia.png`,
  `./images/students/anton.png`,
  `./images/students/ion.png`,
];

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
      console.log(e);
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
      }
    }

    // [...dots].forEach(element => {
    //   console.dir(element);
    // });
    // let active = [...dots];
    // active.forEach(node => {
    //   node.forEach(nodeEl => {
    //     nodeEl.classList.remove('active');
    //   });
    // });
    // e.target.dataset.active = '';
    // function nodesActive(active) {
    //   console.log(active);
    //   active.classList.contains('active') === '';
    //   // node.getAttribute('data-active') === '';
    //   currentSlide(active);
    //   sliderStart();
    // }
    // active = active.findIndex(nodesActive);
    // console.log('тут акстив', active) + 1;
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
    var i;
    const slides = document.getElementsByClassName('slider-item');
    var dots = document.getElementsByClassName('slider-dots_item');
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
    console.log('выше ', intervalId);
    if (intervalId) {
      clearInterval(intervalId);
    }

    numActive =
      [...dots].findIndex(node => [...node.classList].includes('active')) + 1;

    if (number) {
      numActive = number;
    }

    intervalId = setInterval(() => {
      if (numActive !== 5) {
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

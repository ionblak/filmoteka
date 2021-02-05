import refs from './refs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { markupStudents } from './our-students.js';

let intervalId = null;

const showModalFooter = function (event) {
  event.preventDefault();

  // Ристует модалку
  const instance = basicLightbox.create(markupStudents());
  // Вызывает модалку
  instance.show();

  const lightboxRef = document.querySelector('.basicLightbox');

  // Закрытие модалки по кнопке ESC
  window.addEventListener('keydown', handlerClose);

  function handlerClose(e) {
    if (e.code === 'Escape') {
      instance.close();
      clearInterval(intervalId);
      intervalId = null;
    }
  }
  // Закрытие модалки по клику на бекдроп
  lightboxRef.addEventListener('click', handlerClickClose);

  function handlerClickClose(e) {
    if (e.target.classList.contains('basicLightbox')) {
      instance.close();
      clearInterval(intervalId);
      intervalId = null;
    }
  }
  // Если слабые нервы, лучше сюда не лезть
  (() => {
    let slideIndex = 1;
    const list = document.querySelector('.slider-dots');
    const dots = document.querySelectorAll('.slider-dots_item');

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
      showSlides((slideIndex = n));
    }
    /* Основная функция слайдера */
    function showSlides(n) {
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
      if (intervalId) {
        clearInterval(intervalId);
      }

      numActive =
        [...dots].findIndex(node => [...node.classList].includes('active')) + 2;

      if (number) {
        numActive = number;
      }

      intervalId = setInterval(() => {
        if (numActive !== 6) {
          numActive++;
        } else {
          numActive = 1;
        }
        // console.log('numActive', numActive);
        currentSlide(numActive);
      }, 4000);
    }
    if (!intervalId) {
      sliderStart();
    }
  })();
};

// Открывает модалку
refs.modalStudents.addEventListener('click', showModalFooter);

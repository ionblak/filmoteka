import refs from './refs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const showModalFooter = function (event) {
  event.preventDefault();
  const instance = basicLightbox.create('');

  instance.show();
};

refs.modalStudents.addEventListener('click', showModalFooter);

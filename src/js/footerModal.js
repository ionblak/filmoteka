import refs from './refs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const showModalFooter = function () {
  const instance = basicLightbox.create(
    ` <div class="modal">
      <h2>Our Team</h2>
      <ul class="team-list conteiner">
        <li class="">
          <img
            class="team-photo"
            src="./images/students/1fe4275159989b1b96c166aec797b5cb.jpg"
            alt=""
          />
          <h3>Vladyslav Kirienko</h3>
        </li>
        <li class="">
          <img class="team-photo" src="./images/students/43.png" alt="" />
          <h3>Liliia Pedorych</h3>
        </li>
        <li class="">
          <img
            class="team-photo"
            src="./images/students/8782.970-1000x1000.jpg"
            alt=""
          />
          <h3>Maksym Chubarov</h3>
        </li>
        <li class="">
          <img
            class="team-photo"
            src="./images/students/CCFwsfSKoCNkoyd-800x450-noPad.jpg"
            alt=""
          />
          <h3>Igor Ionashku</h3>
        </li>

        <li class="">
          <img
            class="team-photo"
            src="./images/students/Deadpool-3-600x337.jpg"
            alt=""
          />
          <h3>Neliia Zelienova</h3>
        </li>

        <li class="">
          <img class="team-photo" src="./images/students/deadpool.jpg" alt="" />
          <h3>Olga Brekhuntsova</h3>
        </li>

        <li class="">
          <img
            class="team-photo"
            src="./images/students/deadpool_121-e1454924608869.jpg"
            alt=""
          />
          <h3>Sasha Beidyk</h3>
        </li>

        <li class="">
          <img class="team-photo" src="./images/students/images.jpg" alt="" />
          <h3>Anton Chyhariev</h3>
        </li>

        <li class="">
          <img
            class="team-photo"
            src="./images/students/maxresdefault.jpg"
            alt=""
          />
          <h3>VatryaVV</h3>
        </li>

        <li class="">
          <img
            class="team-photo"
            src="./images/students/1fe4275159989b1b96c166aec797b5cb.jpg"
            alt=""
          />
          <h3>Станислав</h3>
        </li>

        <li class="">
          <img
            class="team-photo"
            src="./images/students/8782.970-1000x1000.jpg"
            alt=""
          />
          <h3>Alexandr Shalimov</h3>
        </li>
      </ul>
    </div>`,
    // {
    //   onShow: instance => {
    //     instance.element().querySelector('a').onclick = instance.close;
    //   },
    // },
  );

  instance.show();
};

refs.modalStudents.addEventListener('click', showModalFooter);

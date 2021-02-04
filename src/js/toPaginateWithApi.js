// import itemsTemplate from '../templates/cardsTemplate.hbs';
import refs from './refs';
import 'jquery/dist/jquery';
import 'jquery/src/jquery';
import './utils/paginator';
import { dataProccessing } from '../index';
import createCards from './createCards';

export default function paginate() {
  $(refs.paginatorWrapper).pagination({
    dataSource: `https://#`, //заглушка
    //    locator: 'results',
    //   locator: 'data',
    //   totalNumberLocator: function (response) {
    //         return response.total_results;
    //   },
    pageSize: 1, //заглушка

    // ajax: {
    //   beforeSend: function () {
    //     refs.filmsListinnerHTML ='Loading data from flickr.com ...';
    //   }
    // },
    callback: function (data, pagination) {
      createCards(data);
      // console.log(pageNumber);
      // console.log(this.totalNumber);
      // console.log(refs.filmsListHome.pagination('getSelectedPageNum'));
    },
  });
  // console.log(pagination.getSelectedPageNum);
  //   refs.paginationPageList.addEventListener('click', onPageClick);
}

export { dataProccessing };

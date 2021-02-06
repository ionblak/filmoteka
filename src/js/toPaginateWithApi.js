// import itemsTemplate from '../templates/cardsTemplate.hbs';
import refs from './refs';
import 'jquery/dist/jquery';
import 'jquery/src/jquery';
import './utils/paginator';
import spinner from './utils/spiner';

import { dataProccessing, keySearch } from '../index';
import createCards from './createCards';

export const paginateObj = {
  paginate() {
    $(refs.paginatorWrapper).pagination({
      dataSource: `https://#`, //заглушка

      // import { dataProccessing } from '../index';
      // import createCards from './createCards';

      // export default function paginate() {
      //   $(refs.paginatorWrapper).pagination({
      //     dataSource: `https://#`, //заглушка

      //    locator: 'results',
      //    totalNumberLocator: function (response) {
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
      },
    });
  },
  chooseFn(pageNumber) {
    if (!keySearch) {
      return dataProccessing.getNextPage(pageNumber);
    } else {
      return dataProccessing
        .keywordSearch(refs.searchInput.value)
        .then(data => {
          refs.errorNotafication.classList.add('is-hidden');
          if (data.length === 0) throw new Error('Whoops!');
          spinner.stop();

          return data;
        })
        .catch(e => {
          console.log('catch e', e);
          spinner.stop();
          refs.errorNotafication.classList.remove('is-hidden');
        });
    }
  },

  //     callback: function (data, pagination) {
  //       createCards(data);
  //       // console.log(pageNumber);
  //       // console.log(this.totalNumber);
  //       // console.log(refs.filmsListHome.pagination('getSelectedPageNum'));
  //     },
  //   });
  // console.log(pagination.getSelectedPageNum);
  //   refs.paginationPageList.addEventListener('click', onPageClick);
};

export { dataProccessing };

import refs from './refs';
import 'jquery/dist/jquery';
import 'jquery/src/jquery';
import './utils/paginator';
import vars from './utils/variables';

import { getMovieByIdArray } from './apiServices';
import { dataProccessing, keySearch } from '../index';
import { myLibraryRequest, libraryListLength, idListQueue } from './myLibrary';
import createCards from './createCards';
import spinner from './utils/spiner';

import { data } from 'jquery';
 let pageSizeNum = 1; //default
export const paginateObj = {
  paginate() {
    $(refs.paginatorWrapper).pagination({
      dataSource: `https://#`, //заглушка
      pageSize: 9, //заглушка
      autoHidePrevious: true,
      autoHideNext: true,
       //    locator: 'results',
      //    totalNumberLocator: function (response) {
      //         return response.total_results;
      //   },
 
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
    if (myLibraryRequest) {
        return getMovieByIdArray(idListQueue).then(data => {
         defineResultsPerPage();
        let j = 0;
        const dataPerPage = [];
        for (
          let i =  pageSizeNum * (pageNumber - 1);
          i < Math.min(data.length,  pageSizeNum  * pageNumber);
          i += 1
        ) {
          dataPerPage[j] = data[i];
          j += 1;
        }
        return dataPerPage;
      });
    } else {
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
    }
  },
  getTotalAppPages() {
    if (myLibraryRequest) {
        defineResultsPerPage();
           return Math.ceil(libraryListLength / pageSizeNum);
    } else {
      return dataProccessing.getAppPages;
    }
  },
};

//   //     callback: function (data, pagination) {
//   //       createCards(data);
//   //       // console.log(pageNumber);
//   //       // console.log(this.totalNumber);
//   //       // console.log(refs.filmsListHome.pagination('getSelectedPageNum'));
//   //     },
//   //   });
//   // console.log(pagination.getSelectedPageNum);
//   //   refs.paginationPageList.addEventListener('click', onPageClick);
// };
function defineResultsPerPage() {
 
  if (window.innerWidth >= 1024) { pageSizeNum = vars.desktopPageSize; }
  else if (window.innerWidth >= 768 && window.innerWidth < 1024) { pageSizeNum = vars.tabletPageSize; }
  else if (window.innerWidth < 768) { pageSizeNum = vars.mobilePageSize; };
  return pageSizeNum;
};
export { dataProccessing };

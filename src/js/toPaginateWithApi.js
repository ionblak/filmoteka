import refs from './refs';
import 'jquery/dist/jquery';
import 'jquery/src/jquery';
import './utils/paginator';

import { getMovieByIdArray } from './apiServices';
import { dataProccessing, keySearch } from '../index';
import { myLibraryRequest,  libraryListLength,  idListQueue } from './myLibrary';
import createCards from './createCards';
import { data } from 'jquery';
export const paginateObj = {
   paginate() {
    $(refs.paginatorWrapper).pagination({
      dataSource: `https://#`, //заглушка
      pageSize: 9, //заглушка
 autoHidePrevious: true,
    autoHideNext: true,
    // ajax: {
    //   beforeSend: function () {
    //     refs.filmsListinnerHTML ='Loading data from flickr.com ...';
    //   }
    // },

// import spinner from './utils/spiner';

// import { dataProccessing, keySearch } from '../index';
// import createCards from './createCards';

// export const paginateObj = {
//   paginate() {
//     $(refs.paginatorWrapper).pagination({
//       dataSource: `https://#`, //заглушка

      // import { dataProccessing } from '../index';
      // import createCards from './createCards';

      // export default function paginate() {
      //   $(refs.paginatorWrapper).pagination({
      //     dataSource: `https://#`, //заглушка

      //    locator: 'results',
      //    totalNumberLocator: function (response) {
      //         return response.total_results;
      //   },
//       pageSize: 1, //заглушка

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
        return getMovieByIdArray(idListQueue).then((data) => {
        let j = 0;
        const dataPerPage = [];
        for (let i = (9 * pageNumber - 9); i < Math.min(data.length, 9 * pageNumber); i+=1) {
          dataPerPage[j] = data[i];
          j += 1; 
        }
        return (dataPerPage);
        })
    }
      else {
      if (!keySearch) {     
        
      return dataProccessing.getNextPage(pageNumber);
       }
      else {
        return dataProccessing.keywordSearch(refs.searchInput.value)
      }
    }
  },
   getTotalAppPages() {

    if (myLibraryRequest) {
      return Math.ceil(libraryListLength / 9);
    }
    else 
    { return dataProccessing.getAppPages; }
  }
  }

//     if (!keySearch) {
//       return dataProccessing.getNextPage(pageNumber);
//     } else {
//       return dataProccessing
//         .keywordSearch(refs.searchInput.value)
//         .then(data => {
//           refs.errorNotafication.classList.add('is-hidden');
//           if (data.length === 0) throw new Error('Whoops!');
//           spinner.stop();

//           return data;
//         })
//         .catch(e => {
//           console.log('catch e', e);
//           spinner.stop();
//           refs.errorNotafication.classList.remove('is-hidden');
//         });
//     }
//   },

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


export { dataProccessing};

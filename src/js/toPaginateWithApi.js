import refs from './refs';
import 'jquery/dist/jquery';
import 'jquery/src/jquery';
import './utils/paginator';
import { getMovieByIdArray } from './apiServices';
import { dataProccessing, keySearch } from '../index';
import { myLibraryRequest,  libraryListLength,  idListQueue } from './myLibrary';
import createCards from './createCards';
export const paginateObj = {
   paginate() {
    $(refs.paginatorWrapper).pagination({
      dataSource: `https://#`, //заглушка
            // dataSource: this.getDataSource(),
  
    //    locator: 'results',
    //    totalNumberLocator: function (response) {
    //         return response.total_results;
    //   },
    pageSize: 9, //заглушка
 autoHidePrevious: true,
    autoHideNext: true,
    // ajax: {
    //   beforeSend: function () {
    //     refs.filmsListinnerHTML ='Loading data from flickr.com ...';
    //   }
    // },

      callback: function (data, pagination) {
       createCards(data);
                 }
      
  });
  },
  chooseFn(pageNumber) {
    if (myLibraryRequest) {
      return getMovieByIdArray(idListQueue)
    }
      else {
      if (!keySearch) {
        return dataProccessing.getNextPage(pageNumber)
      }
      else {
        return dataProccessing.keywordSearch(refs.searchInput.value)
      }
    }
  },
  // getDataSource: function( ){
  //   if (myLibraryRequest) {
  //     this.dataSource = [];
  //     console.log(libraryListLengt);
  //     this.dataSource.length = libraryListLengt;
  //     // getMovieByIdArray(idListQueue)
  //     //   .then(data => { this.dataSource = data});
  //        }
  //     else {
  //     return this.dataSource = `https://#`;
  //      }
  //      } ,
  getTotalAppPages() {

    if (myLibraryRequest) {
      return Math.ceil(libraryListLength / 9);
    }
    else 
    { return dataProccessing.getAppPages; }
  }
  }

export { dataProccessing};

import refs from './refs';
import "jquery/dist/jquery";
import "jquery/src/jquery";
import './utils/paginator';
// import { DataProccessing, getGenresList } from './apiServices';
import {pageNumber } from '../index';
import createCards from './createCards';

export default function toPaginate(data) {
    $('#pagination-container').pagination({
        dataSource: data(),
        //  totalNumber: 250,
        totalNumber: pageNumber,
        // totalNumberLocator: function (response) {
        //     return response.total_results;
        //     },
        // pageSize: 9,

        callback: function (data, pagination) {
            createCards(data);
            console.log(pageNumber);
            console.log(this.totalNumber);
        }
    })
} 
    
    
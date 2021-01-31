import refs from './refs';
import "jquery/dist/jquery";
import "jquery/src/jquery";
import './utils/paginator';
import createCards from './createCards';

export default function toPaginate(data) {
    $('#pagination-container').pagination({
        dataSource: data(),
        locator: 'results',
        totalNumberLocator: function (response) {
            return response.total_results;
            },
        pageSize: 3,

        callback: function (data, pagination) {
        createCards(data);
        }
    })
} 
    
    
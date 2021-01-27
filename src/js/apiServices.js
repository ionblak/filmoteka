import axios from 'axios';

const API_KEY = '15ccc9a8c676c1c9b5477fb06b4d7b82';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const getPopular = () => {
    const url = `/movie/popular?api_key=${API_KEY}&language=en-US&page=1&region=UA`;
    return axios.get(url).then(res => res.data);
}

export const getByKeyword = (keyWord) => {

}

export const getPage = (keyWord, pageNum) => {
    const url = `/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}&region=UA`;
    return axios.get(url).then(res => res.data);
}



const RESULTS_PER_PAGE = 9;
const API_RESULTS_PER_PAGE = 20;


class dataRequest {
    constructor(apiPage, filmIndex, films) {
        this.apiPage = apiPage;
        this.filmIndex = filmIndex;
        this.films = films;
        this.promise = new Promise((resolve, reject) => {
            ; 
        });
    }

    updData(apiPage, filmIndex, films) {
        this.apiPage = apiPage;
        this.filmIndex = filmIndex;
        this.films = films;
    }

    getData() {
        this.promise = getPage('', this.apiPage).then(data => data.results);
        return this.promise;
    }
}


class ApiData {
    constructor(totalResults, totalPages) {
        this.totalResults = totalResults;
        this.totalPages = totalPages;
    }

    updData(totalResults, totalPages) {
        this.totalResults = totalResults;
        this.totalPages = totalPages;
    }
}

export class DataProccessing {
    constructor(totalResults, totalPages, currentResults) {
        this.apiData = new ApiData(totalResults, totalPages);
        this.apiReques = [new dataRequest(1, 0, 9)];
        this.appPages = Math.ceil(totalResults / RESULTS_PER_PAGE);
        this.appCurrentPage = 1;
        this.keyWord = '';
        this.renderResults = [];
    }

    updData(totalResults, totalPages, currentResults) {
        this.apiData.updateResults(totalResults, totalPages);
        this.appPages = Math.ceil(totalResults / RESULTS_PER_PAGE);
        this.appCurrentPage = 1;
        this.currentResults.push(...currentResults);
    };

    keywordSearch() {

    };

    getPopular() {

        return this.getNextPage(1);
        
    };

    getNextPage (newCurrentPage) {
        this.apiReques.splice(0, this.apiReques.length);
        this.renderResults.splice(0, this.renderResults.length);
        console.log('this.renderResults', this.renderResults);
        this.appCurrentPage = newCurrentPage;
        const firstRequest = new dataRequest();
        firstRequest.apiPage = Math.ceil((this.appCurrentPage * RESULTS_PER_PAGE/ API_RESULTS_PER_PAGE));
        firstRequest.filmIndex = (this.appCurrentPage * RESULTS_PER_PAGE) % API_RESULTS_PER_PAGE;
        firstRequest.films = firstRequest.filmIndex > API_RESULTS_PER_PAGE - RESULTS_PER_PAGE ? API_RESULTS_PER_PAGE - firstRequest.filmIndex : RESULTS_PER_PAGE;        
        console.log('firstRequest.films', firstRequest.films);
        this.apiReques.push(firstRequest);
        if (firstRequest.filmIndex + RESULTS_PER_PAGE > API_RESULTS_PER_PAGE) {
            const secondRequest = new dataRequest(Math.ceil((this.appCurrentPage * RESULTS_PER_PAGE) + 1, 0));
            secondRequest.apiPage = firstRequest.apiPage + 1;
            secondRequest.filmIndex = 0;
            secondRequest.films = RESULTS_PER_PAGE - firstRequest.films;    
            console.log('secondRequest.films', secondRequest.films);
            this.apiReques.push(secondRequest);
        }
        const getDataPromise = async () => {
            return Promise.all(this.apiReques.map(item => {
                item.getData().then(data => {
                    const fiteredData = data.filter((it, index) => index >= item.filmIndex && index < item.filmIndex + item.films)
                    this.renderResults = Array.from(fiteredData);
                    console.log('this.renderResults inside', this.renderResults);
                });
            }));
        }
        getDataPromise();

        return this.renderResults;
    
    };
    
}
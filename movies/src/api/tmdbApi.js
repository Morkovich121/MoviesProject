import axiosClient from "./axiosClient";

export const category = {
    movie: 'movie',
    tv: 'tv'
}

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated'
}


export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air'
}

const language = localStorage.getItem('language');

const tmdbApi = {
    getMoviesList: (type, params) => {
        const url = 'movie/' + movieType[type] + '?&language=' + language;
        return axiosClient.get(url, params);
    },
    getTvList: (type, params) => {
        const url = 'tv/' + tvType[type] + '?&language=' + language;
        return axiosClient.get(url, params);
    },
    getVideosWithLanguage: (cate, id) => {
        const url = category[cate] + '/' + id + '/videos?&language=' + language;
        return axiosClient.get(url, { params: {} });
    },
    getVideos: (cate, id) => {
        const url = category[cate] + '/' + id + '/videos';
        return axiosClient.get(url, { params: {} });
    },
    search: (categ, params) => {
        const url = 'search/' + category[categ] + '?&language=' + language;
        return axiosClient.get(url, params);
    },
    searchWithGenre: (categ, id, params) => {
        const url = 'search/' + category[categ] + '?with_genres=' + id + '&language=' + language;
        console.log(url);
        return axiosClient.get(url, params);
    },
    detail: (categ, id, params) => {
        const url = category[categ] + '/' + id + '?&language=' + language;
        return axiosClient.get(url, params);
    },
    credits: (categ, id) => {
        const url = category[categ] + '/' + id + '/credits?&language=' + language;
        return axiosClient.get(url, { params: {} });
    },
    similar: (categ, id) => {
        const url = category[categ] + '/' + id + '/similar?&language=' + language;
        return axiosClient.get(url, { params: {} });
    },
    genres: (categ) => {
        const url = 'genre/' + category[categ] + '/list?&language=' + language;
        return axiosClient.get(url, { params: {} })
    },
    getByGenre: (categ, id, params) => {
        const url = '/discover/' + category[categ] + '?with_genres=' + id + '&language=' + language;
        return axiosClient.get(url, params);
    }
}

export default tmdbApi;
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

const tmdbApi = {
    getMoviesList: (type, params) => {
        const url = 'movie/' + movieType[type];
        return axiosClient.get(url, params);
    },
    getTvList: (type, params) => {
        const url = 'tv/' + tvType[type];
        return axiosClient.get(url, params);
    },
    getVideos: (cate, id) => {
        const url = category[cate] + '/' + id + '/videos';
        return axiosClient.get(url, { params: {} });
    },
    search: (categ, params) => {
        const url = 'search/' + category[categ];
        return axiosClient.get(url, params);
    },
    detail: (categ, id, params) => {
        const url = category[categ] + '/' + id;
        return axiosClient.get(url, params);
    },
    credits: (categ, id) => {
        const url = category[categ] + '/' + id + '/credits';
        return axiosClient.get(url, { params: {} });
    },
    similar: (categ, id) => {
        const url = category[categ] + '/' + id + '/similar';
        return axiosClient.get(url, { params: {} });
    },
    movieGenres: (categ) => {
        const url = 'genre/' + category[categ] + '/list';
        console.log(url);
        return axiosClient.get(url, { params: {} })
    }
}

export default tmdbApi;
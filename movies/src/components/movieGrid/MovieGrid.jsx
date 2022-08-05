import React, { useState, useRef, useEffect } from 'react';

import './movie-grid.scss';

import MovieCard from '../movieCard/MovieCard';
import { useParams } from 'react-router-dom';
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import { OutlineButton } from '../button/Button';

const MovieGrid = props => {

    const [elements, setElements] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const { keyword } = useParams();

    useEffect(() => {
        const getList = async () => {
            let response = null;
            if (keyword === undefined) {
                const params = {};
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, { params });
                }
            } else {
                const params = {
                    query: keyword
                }
                response = await tmdbApi.search(props.category, { params });
            }
            setElements(response.results);
            setTotalPage(response.total_pages);
        }
        getList();
    }, [props.category, keyword]);

    const loadMore = async () => {
        let response = null;
        if (keyword === undefined) {
            const params = {
                page: page + 1
            };
            switch(props.category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(movieType.upcoming, {params});
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular, {params});
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword
            }
            response = await tmdbApi.search(props.category, {params});
        }
        setElements([...elements, ...response.results]);
        setPage(page + 1);
    }

    return (
        <>
            <div className='movie-grid'>
                {
                    elements.map((element, index) => <MovieCard category={props.category} item={element} key={index} />)
                }
            </div>
            {
                page < totalPage ? (
                    <div className="movie-grid__loadmore">
                        <OutlineButton className="small" onClick={loadMore}>Load more</OutlineButton>
                    </div>
                ) : null
            }
        </>
    )
}

export default MovieGrid
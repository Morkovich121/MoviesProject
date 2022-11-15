import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types'

import './movie-grid.scss';

import MovieCard from '../movieCard/MovieCard';
import { useNavigate, useParams } from 'react-router-dom';
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/Input';
import translations from '../../config/translations';

const pageText = localStorage.getItem('language') === 'uk' ? Object.values(translations['MovieGrid']) : Object.keys(translations['MovieGrid']);

const MovieGrid = props => {

    const [elements, setElements] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const { keyword } = useParams();
    const { id } = useParams();

    useEffect(() => {
        const getList = async () => {
            let response = null;
            if (keyword === undefined) {
                const params = {};
                if (id !== undefined) {
                    response = await tmdbApi.getByGenre(props.category, id, { params });

                }
                else {
                    switch (props.category) {
                        case category.movie:
                            response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
                            break;
                        default:
                            response = await tmdbApi.getTvList(tvType.popular, { params });
                    }
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
    }, [props.category, keyword, id]);

    const loadMore = async () => {
        let response = null;
        if (keyword === undefined) {
            const params = {
                page: page + 1
            };
            switch (props.category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular, { params });
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword
            }
            response = await tmdbApi.search(props.category, { params });
        }
        setElements([...elements, ...response.results]);
        setPage(page + 1);
    }

    return (
        <>
            <div className="section mb-3">
                <MovieSearch category={props.category} keyword={keyword} />
            </div>
            <div className='movie-grid'>
                {
                    elements.map((element, index) => <MovieCard category={props.category} item={element} key={index} />)
                }
            </div>
            {
                page < totalPage ? (
                    <div className="movie-grid__loadmore">
                        <OutlineButton className="small" onClick={loadMore}>{pageText[0]}</OutlineButton>
                    </div>
                ) : null
            }
        </>
    )
}

const MovieSearch = props => {
    const history = useNavigate();
    const { id } = useParams();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(
        () => {
            if (keyword.trim().length > 0) {
                history(`/${category[props.category]}/search/${keyword}`);
            }
            else {
                history(`/${category[props.category]}`);
            }
            window.location.reload();
        },
        [keyword, props.category, history]
    );

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        }
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, goToSearch]);

    return id === undefined ?
        <div className="movie-search">
            <Input
                type="text"
                placeholder={pageText[2]}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className="small" onClick={goToSearch}>{pageText[1]}</Button>
        </div> : null
}

MovieGrid.propTypes = {
    category: PropTypes.string,
}

MovieSearch.propTypes = {
    category: PropTypes.string,
    keyword: PropTypes.string,
}

export default MovieGrid
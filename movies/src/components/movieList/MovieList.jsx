import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Swiper, SwiperSlide } from 'swiper/react';

import MovieCard from '../movieCard/MovieCard';
import './movie-list.scss';

import tmdbApi, { category } from '../../api/tmdbApi';


const MovieList = props => {

    const [elements, setElements] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            if (props.type === 'favouriteTV') {
                setElements(props.favouriteTV);
            }
            else if (props.type === 'favouriteMovie') {
                setElements(props.favouriteMovie);
            }
            else {
                if (props.type !== 'similar') {
                    switch (props.category) {
                        case category.movie:
                            response = await tmdbApi.getMoviesList(props.type, { params: {} });
                            break;
                        default:
                            response = await tmdbApi.getTvList(props.type, { params: {} });
                    }
                } else {
                    response = await tmdbApi.similar(props.category, props.id);
                }
                setElements(response.results);
            }
        }
        getList();
    })

    return (
        <div className='movie-list'>
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {
                    elements.map((element, index) => (
                        <SwiperSlide key={index}>
                            <MovieCard item={element} category={props.category}></MovieCard>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

MovieList.propTypes = {
    category: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.number,
    favouriteMovie: PropTypes.array,
    favouriteTV: PropTypes.array,
}

export default MovieList
import { React, useState, useRef, useEffect } from 'react'

import  {Swiper} from 'swiper/react';

import tmdbApi, {category, movieType} from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './hero-slide.scss';

const HeroSlide = () => {



    const [movieItems, setMovieItems] = useState([]);
    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 }
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, { params });
                setMovieItems(response.results.slice(0, 4));
                console.log(response);
            } catch {
                console.log('error');
            }
        }
        getMovies();
    }, []);

    return (
        <div className='hero-slide'>
            <Swiper className='123'
            >
            </Swiper>
        </div>
    )
}

export default HeroSlide
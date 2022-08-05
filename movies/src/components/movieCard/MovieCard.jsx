import React from 'react'
import apiConfig from '../../api/apiConfig';
import { category } from '../../api/tmdbApi';

import Button from '../button/Button';

import './movie-card.scss';

const MovieCard = props => {

    const element = props.item;

    const link = '/' + category[props.category] + '/' + element.id

    const bg = apiConfig.w500Image(element.poster_path || element.backdrop_path);

    return (
        <a href={link}>
            <div className='movie-card'>
                <div className="movie-card__logo">
                    <img src={bg} alt="" className='movie-card__poster' />
                </div>
                <Button>
                    <i className='bx bx-play'></i>
                </Button>
            </div>
            <h3>{element.title || element.name}</h3>
        </a>
    )
}


export default MovieCard
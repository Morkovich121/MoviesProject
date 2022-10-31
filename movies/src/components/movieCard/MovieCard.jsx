import React from 'react';
import PropTypes from 'prop-types'

import apiConfig from '../../api/apiConfig';
import { category } from '../../api/tmdbApi';
import Button from '../button/Button';

import './movie-card.scss';

const MovieCard = props => {

    const element = props.item;

    const link = '/' + category[props.category] + '/' + element.id

    let bg = apiConfig.w500Image(element.poster_path || element.backdrop_path);
    const arr = bg.split('/');
    if (arr[arr.length - 1] === 'null') {
        return null;
    }
    else {
        return (
            <a href={link}>
                <div className='cont'>
                    <div className='movie-card'>
                        <div className="movie-card__logo">
                            <img src={bg} alt="Not found" className='movie-card__poster' />
                        </div>
                        <Button>
                            <i className='bx bx-play'></i>
                        </Button>
                    </div>
                    <h3 className='cardTitle'>{element.title || element.name}</h3>
                </div>
            </a>
        )
    }
}

MovieCard.propTypes = {
    category: PropTypes.string,
    item: PropTypes.shape({
        id: PropTypes.number,
        poster_path: PropTypes.string,
        backdrop_path: PropTypes.string,
        title: PropTypes.string,
        name: PropTypes.string
    }),
}

export default MovieCard
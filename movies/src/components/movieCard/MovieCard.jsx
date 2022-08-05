import React from 'react'
import apiConfig from '../../api/apiConfig';
import { category } from '../../api/tmdbApi';

import footerBg from '../../assets/footer-bg.jpg';
import Button from '../button/Button';

import './movie-card.scss';

const MovieCard = props => {

    const element = props.item;

    const link = '/' + category[props.category] + '/' + element.id

    let bg = apiConfig.w500Image(element.poster_path || element.backdrop_path);
    const arr = bg.split('/');
    if (arr[arr.length - 1] == 'null') {
        return 1;
    }
    else {
        return (
            <a href={link}>
                <div className='cont'>
                    <div className='movie-card'>
                        <div className="movie-card__logo">
                            <img src={bg} alt="No image found" className='movie-card__poster' />
                        </div>
                        <Button>
                            <i className='bx bx-play'></i>
                        </Button>
                    </div>
                    <h3>{element.title || element.name}</h3>
                </div>
            </a>
        )
    }
}


export default MovieCard
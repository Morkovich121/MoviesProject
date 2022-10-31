import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import './detail.scss';
import notFav from '../../assets/notFav.png';
import fav from '../../assets/fav.png';

import CastList from "./CastList";
import VideoList from "./VideoList";
import MovieList from '../../components/movieList/MovieList';
import { useCallback } from "react";

const Detail = () => {

    const { category, id } = useParams();

    const [element, setElements] = useState(null);

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, { params: {} });
            setElements(response);
            window.scrollTo(0, 0);
            let temp;
            if (category === 'tv') {
                temp = JSON.parse(localStorage.getItem('favouriteTV'));
                temp.forEach((elem) => {
                    if ((elem.title === response.title && elem.title !== undefined) || (elem.name === response.name)) setIsFavorite(true);
                })
            }
            else {
                temp = JSON.parse(localStorage.getItem('favouriteMovie'));
                temp.forEach((elem) => {
                    if ((elem.title === response.title) || (elem.name === response.name && elem.name !== undefined)) setIsFavorite(true);
                });
            }
        }
        getDetail();

    }, [category, id, isFavorite]);

    useEffect(() => {

    }, [isFavorite]);

    const addToFavorite = useCallback(() => {
        let temp;
        if (category === 'tv') {
            temp = JSON.parse(localStorage.getItem('favouriteTV'));
            let checker = false;
            temp.forEach((elem, index) => {
                if ((elem.title === element.title && elem.title !== undefined) || (elem.name === element.name)) {
                    temp.splice(index, 1);
                    checker = true
                };
            })
            if (checker === false) {
                temp.push(element);
            }
            localStorage.setItem('favouriteTV', JSON.stringify(temp));
        }
        else {
            temp = JSON.parse(localStorage.getItem('favouriteMovie'));
            let checker = false;
            temp.forEach((elem, index) => {
                if (elem.title === element.title || (elem.name === element.name && elem.name !== undefined)) {
                    temp.splice(index, 1);
                    checker = true
                };
            });
            if (checker === false) {
                temp.push(element);
            }
            localStorage.setItem('favouriteMovie', JSON.stringify(temp));
        }
        if (isFavorite) setIsFavorite(false);
        else setIsFavorite(true);
    }, [category, element, isFavorite])

    return (
        <>
            {
                element && (
                    <>
                        <div className="banner" style={{ backgroundImage: `url(${apiConfig.originalImage(element.backdrop_path || element.poster_path)})` }}></div>
                        <div className="mb-3 movie-content container">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img"
                                    style={{ backgroundImage: `url(${apiConfig.originalImage(element.poster_path || element.backdrop_path)})` }}>
                                </div>
                            </div>
                            <div className="movie-content__info">
                                <div className="title">
                                    {element.title || element.name}
                                    <button className="favorite"><img className="favoriteLogo" alt="Not found" src={`${isFavorite ? fav : notFav}`} onClick={addToFavorite}></img></button>
                                </div>
                                <div className="genres">
                                    {
                                        element.genres && element.genres.slice(0, 5).map((genre, index) => (
                                            <span key={index} className="genres__item">{genre.name}</span>
                                        ))
                                    }
                                </div>
                                <p className="overview">
                                    {element.overview}
                                </p>
                                <div className="cast">
                                    <div className="section__header">
                                        <h2>Casts</h2>
                                    </div>
                                    <CastList id={element.id} />
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="section mb-3">
                                <VideoList id={element.id} />
                            </div>
                            <div className="section mb-3">
                                <div className="section__header mb-2">
                                    <h2>Similar</h2>
                                </div>
                                <MovieList category={category} type="similar" id={element.id} />
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
}

export default Detail;
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import './detail.scss';
import notFav from '../../assets/notFav.png';
import fav from '../../assets/fav.png';

import CastList from "./CastList";
import VideoList from "./VideoList";
import MovieList from '../../components/movieList/MovieList';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import translations from "../../config/translations";


const Detail = () => {

    const pageText = Object.values(translations[localStorage.getItem('language')]['Detail'])

    if (localStorage.length === 0) {
        localStorage.setItem('theme', JSON.stringify("dark"));
        localStorage.setItem('activeAccount', JSON.stringify({}));
        localStorage.setItem('allAccounts', JSON.stringify([]));
        localStorage.setItem('language', navigator.language.substring(0, 2) === 'en' ? 'en' : 'uk');
    }

    const { category, id } = useParams();

    const [element, setElements] = useState(null);

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, { params: {} });
            setElements(response);
            window.scrollTo(0, 0);
            let acc = JSON.parse(localStorage.getItem('activeAccount'));
            if (Object.keys(acc).length > 0) {
                if (category === 'tv') {
                    acc.favouriteTV.forEach((elem) => {
                        if ((elem.title === response.title && elem.title !== undefined) || (elem.name === response.name)) setIsFavorite(true);
                    })
                }
                else {
                    acc.favouriteMovies.forEach((elem) => {
                        if ((elem.title === response.title) || (elem.name === response.name && elem.name !== undefined)) setIsFavorite(true);
                    });
                }
            }

        }
        getDetail();

    }, [category, id, isFavorite]);

    const addToFavorite = useCallback(() => {
        let acc = JSON.parse(localStorage.getItem('activeAccount'));
        let allAccs = JSON.parse(localStorage.getItem('allAccounts'));
        let ind = 0;
        allAccs.forEach((elem, index) => {
            if (elem.email === acc.email) ind = index;
        })
        if (category === 'tv') {
            let checker = false;
            acc.favouriteTV.forEach((elem, index) => {
                if ((elem.title === element.title && elem.title !== undefined) || (elem.name === element.name)) {
                    acc.favouriteTV.splice(index, 1);
                    allAccs[ind].favouriteTV.splice(index, 1);
                    checker = true
                };
            })
            if (checker === false) {
                acc.favouriteTV.push(element);
                allAccs[ind].favouriteTV.push(element);
            }
            localStorage.setItem('activeAccount', JSON.stringify(acc));
            localStorage.setItem('allAccounts', JSON.stringify(allAccs));
        }
        else {
            let checker = false;
            acc.favouriteMovies.forEach((elem, index) => {
                if (elem.title === element.title || (elem.name === element.name && elem.name !== undefined)) {
                    acc.favouriteMovies.splice(index, 1);
                    allAccs[ind].favouriteMovies.push(index, 1);
                    checker = true
                };
            });
            if (checker === false) {
                acc.favouriteMovies.push(element);
                allAccs[ind].favouriteMovies.push(element);
            }
            localStorage.setItem('activeAccount', JSON.stringify(acc));
            localStorage.setItem('allAccounts', JSON.stringify(allAccs));
        }
        if (isFavorite) setIsFavorite(false);
        else setIsFavorite(true);
    }, [category, element, isFavorite])

    return (
        <>
            <Header />
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
                                    {Object.keys(JSON.parse(localStorage.getItem('activeAccount'))).length > 0 ?
                                        <button className="favorite"><img className="favoriteLogo" alt="Not found"
                                            src={`${isFavorite ? fav : notFav}`} onClick={addToFavorite}></img></button> :
                                        ""}
                                </div>
                                <div className="genres">
                                    {
                                        element.genres && element.genres.slice(0, 5).map((genre, index) => (
                                            <a href={'/' + category + '/genre/' + genre.id} key={index}><span key={index} className="genres__item"
                                                style={{
                                                    backgroundColor: `${JSON.parse(localStorage.getItem('theme')) === 'light' ? '#fff' : ''}`,
                                                    border: `${JSON.parse(localStorage.getItem('theme')) === 'light' ? '2px solid #000 ' : ''}`
                                                }}>{genre.name}</span></a>
                                        ))
                                    }
                                </div>
                                <p className="overview">
                                    {element.overview}
                                </p>
                                <div className="cast">
                                    <div className="section__header">
                                        <h2>{pageText[0]}</h2>
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
                                    <h2>{pageText[1]}</h2>
                                </div>
                                <MovieList category={category} type="similar" id={element.id} />
                            </div>
                        </div>
                        <Footer />
                    </>
                )
            }
        </>
    );
}

export default Detail;
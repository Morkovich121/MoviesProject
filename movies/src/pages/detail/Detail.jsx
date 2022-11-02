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
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
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
            let acc = JSON.parse(localStorage.getItem('activeAccount'));
            if (acc.length > 0) {
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

    useEffect(() => {

    }, [isFavorite]);

    const addToFavorite = useCallback(() => {
        let acc = JSON.parse(localStorage.getItem('activeAccount'));
        if (Object.keys(acc).length > 0) {
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
        }
        else {
            alert("First you need to sign in")
        }

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
                        <Footer />
                    </>
                )
            }
        </>
    );
}

export default Detail;
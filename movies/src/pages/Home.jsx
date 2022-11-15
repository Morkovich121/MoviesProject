import React from "react";

import HeroSlide from '../components/slide/HeroSlide';
import { OutlineButton } from '../components/button/Button';
import MovieList from "../components/movieList/MovieList";

import { category, movieType, tvType } from '../api/tmdbApi';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import translations from "../config/translations";

const Home = () => {
    const pageText = localStorage.getItem('language') === 'uk' ? Object.values(translations['Home']) : Object.keys(translations['Home']);

    console.log(localStorage);
    //localStorage.clear();

    if (localStorage.length === 0) {
        localStorage.setItem('theme', JSON.stringify("dark"));
        localStorage.setItem('activeAccount', JSON.stringify({}));
        localStorage.setItem('allAccounts', JSON.stringify([]));
        localStorage.setItem('language', navigator.language.substring(0, 2) === 'en' ? 'en' : 'uk');
    }
    return (
        <>
            <Header />
            <HeroSlide />
            <div className="container clased">
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>{pageText[1]}</h2>
                        <a href="/movie">
                            <OutlineButton className="small">{pageText[0]}</OutlineButton>
                        </a>
                    </div>
                    <MovieList category={category.movie} type={movieType.popular}></MovieList>
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>{pageText[2]}</h2>
                        <a href="/movie">
                            <OutlineButton className="small">{pageText[0]}</OutlineButton>
                        </a>
                    </div>
                    <MovieList category={category.movie} type={movieType.top_rated}></MovieList>
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>{pageText[3]}</h2>
                        <a href="/tv">
                            <OutlineButton className="small">{pageText[0]}</OutlineButton>
                        </a>
                    </div>
                    <MovieList category={category.tv} type={tvType.popular}></MovieList>
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>{pageText[4]}</h2>
                        <a href="/tv">
                            <OutlineButton className="small">{pageText[0]}</OutlineButton>
                        </a>
                    </div>
                    <MovieList category={category.tv} type={tvType.top_rated}></MovieList>
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>{pageText[5]}</h2>
                        <a href="/movie">
                            <OutlineButton className="small">{pageText[0]}</OutlineButton>
                        </a>
                    </div>
                    {Object.keys(JSON.parse(localStorage.getItem('activeAccount'))).length !== 0 ?
                        JSON.parse(localStorage.getItem('activeAccount')).favouriteMovies.length > 0 ?
                            <MovieList category={category.movie} type="favouriteMovie" favouriteMovie={JSON.parse(localStorage.getItem('activeAccount')).favouriteMovies}></MovieList> :
                            <h2 style={{ display: "flex", justifyContent: "center", fontSize: "1.2rem" }}>{pageText[8]}</h2> :
                        <h2 style={{ display: "flex", justifyContent: "center", fontSize: "1.2rem" }}>{pageText[7]}</h2>
                    }
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>{pageText[6]}</h2>
                        <a href="/tv">
                            <OutlineButton className="small">{pageText[0]}</OutlineButton>
                        </a>
                    </div>
                    {Object.keys(JSON.parse(localStorage.getItem('activeAccount'))).length !== 0 ?
                        JSON.parse(localStorage.getItem('activeAccount')).favouriteTV.length > 0 ?
                            <MovieList category={category.tv} type="favouriteTV" favouriteTV={JSON.parse(localStorage.getItem('activeAccount')).favouriteTV}></MovieList> :
                            <h2 style={{ display: "flex", justifyContent: "center", fontSize: "1.2rem" }}>{pageText[9]}</h2> :
                        <h2 style={{ display: "flex", justifyContent: "center", fontSize: "1.2rem" }}>{pageText[7]}</h2>
                    }
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;
import React from "react";

import HeroSlide from '../components/slide/HeroSlide';
import { OutlineButton } from '../components/button/Button';
import MovieList from "../components/movieList/MovieList";

import { category, movieType, tvType } from '../api/tmdbApi';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const Home = () => {
    console.log(localStorage);
    if (localStorage.length === 0) {
        localStorage.setItem('activeAccount', JSON.stringify({}));
        localStorage.setItem('allAccounts', JSON.stringify([]));
        // localStorage.setItem('favouriteMovie', JSON.stringify([]));
        // localStorage.setItem('favouriteTV', JSON.stringify([]));
    }
    return (
        <>
            <Header />
            <HeroSlide />
            <div className="container">
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Popular movies</h2>
                        <a href="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </a>
                    </div>
                    <MovieList category={category.movie} type={movieType.popular}></MovieList>
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top rated movies</h2>
                        <a href="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </a>
                    </div>
                    <MovieList category={category.movie} type={movieType.top_rated}></MovieList>
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Popular TV</h2>
                        <a href="/tv">
                            <OutlineButton className="small">View more</OutlineButton>
                        </a>
                    </div>
                    <MovieList category={category.tv} type={tvType.popular}></MovieList>
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top rated TV</h2>
                        <a href="/tv">
                            <OutlineButton className="small">View more</OutlineButton>
                        </a>
                    </div>
                    <MovieList category={category.tv} type={tvType.top_rated}></MovieList>
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Your favorite movies</h2>
                        <a href="/Movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </a>
                    </div>
                    {Object.keys(JSON.parse(localStorage.getItem('activeAccount'))).length !== 0 ?
                        JSON.parse(localStorage.getItem('activeAccount')).favouriteMovies.length > 0 ?
                            <MovieList category={category.movie} type="favouriteMovie" favouriteMovie={JSON.parse(localStorage.getItem('activeAccount')).favouriteMovies}></MovieList> :
                            <h2 style={{ display: "flex", justifyContent: "center", fontSize: "1.2rem" }}>You don't have favorite movies yet</h2> :
                        <h2 style={{ display: "flex", justifyContent: "center", fontSize: "1.2rem" }}>First you need to sign in</h2>
                    }
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Your favorite TV</h2>
                        <a href="/Movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </a>
                    </div>
                    {Object.keys(JSON.parse(localStorage.getItem('activeAccount'))).length !== 0 ?
                        JSON.parse(localStorage.getItem('activeAccount')).favouriteTV.length > 0 ?
                            <MovieList category={category.tv} type="favouriteTV" favouriteTV={JSON.parse(localStorage.getItem('activeAccount')).favouriteTV}></MovieList> :
                            <h2 style={{ display: "flex", justifyContent: "center", fontSize: "1.2rem" }}>You don't have favorite TV yet</h2> :
                        <h2 style={{ display: "flex", justifyContent: "center", fontSize: "1.2rem" }}>First you need to sign in</h2>
                    }
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;
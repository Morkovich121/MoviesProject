import React from "react";

import HeroSlide from '../components/slide/HeroSlide';
import { OutlineButton } from '../components/button/Button';
import MovieList from "../components/movieList/MovieList";

import { category, movieType, tvType } from '../api/tmdbApi';

const Home = () => {
    return (
        <>
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
            </div>
        </>
    );
}

export default Home;
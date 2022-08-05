import React from "react";

import HeroSlide from '../components/slide/HeroSlide';
import { OutlineButton } from '../components/button/Button';

import { category, movieType, tvType } from '../api/tmdbApi';

const Home = () => {
    return (
        <>
            <HeroSlide />
            <div className="container">
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Upcoming movies</h2>
                        <a href="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </a>
                    </div>
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top rated movies</h2>
                        <a href="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </a>
                    </div>
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Popular TV</h2>
                        <a href="/tv">
                            <OutlineButton className="small">View more</OutlineButton>
                        </a>
                    </div>
                </div>
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top rated TV</h2>
                        <a href="/tv">
                            <OutlineButton className="small">View more</OutlineButton>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
import React from "react";

import { useParams } from "react-router-dom";

import { category as categ } from '../api/tmdbApi';
import MovieGrid from "../components/movieGrid/MovieGrid";
import PageHeader from '../components/pageHeader/PageHeader';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const Catalog = () => {

    if (localStorage.length === 0) {
        localStorage.setItem('activeAccount', JSON.stringify({}));
        localStorage.setItem('allAccounts', JSON.stringify([]));
    }

    const { category } = useParams();

    return (
        <>
            <Header />
            <PageHeader>
                {category === categ.movie ? 'Movies' : 'TV Series'}
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category={category} />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Catalog;
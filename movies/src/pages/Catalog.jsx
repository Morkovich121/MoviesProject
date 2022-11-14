import React from "react";

import { useParams } from "react-router-dom";

import { category as categ } from '../api/tmdbApi';
import MovieGrid from "../components/movieGrid/MovieGrid";
import PageHeader from '../components/pageHeader/PageHeader';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import translations from "../config/translations";

const Catalog = () => {

    const pageText = localStorage.getItem('language') === 'uk' ? Object.values(translations['Catalog']) : Object.keys(translations['Catalog']);
    if (localStorage.length === 0) {
        localStorage.setItem('theme', JSON.stringify("dark"));
        localStorage.setItem('activeAccount', JSON.stringify({}));
        localStorage.setItem('allAccounts', JSON.stringify([]));
        localStorage.setItem('language', navigator.language.substring(0, 2) === 'en' ? 'en' : 'uk');
    }
    const { category } = useParams();

    return (
        <>
            <Header />
            <PageHeader>
                {category === categ.movie ? pageText[0] : pageText[1]}
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
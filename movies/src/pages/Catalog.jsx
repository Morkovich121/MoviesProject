import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import tmdbApi, { category as categ } from '../api/tmdbApi';
import MovieGrid from "../components/movieGrid/MovieGrid";
import PageHeader from '../components/pageHeader/PageHeader';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import translations from "../config/translations";

const Catalog = () => {

    const pageText = localStorage.getItem('language') === 'uk' ? Object.values(translations['Catalog']) : Object.keys(translations['Catalog']);

    const { id, category } = useParams();
    const [genres, setGenres] = useState();
    if (localStorage.length === 0) {
        localStorage.setItem('theme', JSON.stringify("dark"));
        localStorage.setItem('activeAccount', JSON.stringify({}));
        localStorage.setItem('allAccounts', JSON.stringify([]));
        localStorage.setItem('language', navigator.language.substring(0, 2) === 'en' ? 'en' : 'uk');
    }

    useEffect(() => {
        const getGenres = async () => {
            const response = await tmdbApi.genres(category);
            setGenres(response.genres.sort((a, b) => a.id > b.id ? 1 : -1));
        }
        getGenres();

    }, [category]);

    const pageHeaderTitle = (category === categ.movie ? pageText[0] : pageText[1]) +
        (genres && id ? ' ' + pageText[2] + ' ' + genres.filter(elem => elem.id === Number(id))[0].name.toLowerCase() : "");

    return (
        <>
            <Header />
            <PageHeader>
                {pageHeaderTitle}
            </PageHeader>
            <div className="container">
                <div className="section mb-3" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="catalogGenres">
                        {genres ? genres.map(elem => (
                            <a href={'/' + category + '/genre/' + elem.id} key={elem.id}><span key={elem.id} className="catalogGenres__item"
                                style={{
                                    backgroundColor: `${JSON.parse(localStorage.getItem('theme')) === 'light' ? '#fff' : ''}`,
                                    border: `${JSON.parse(localStorage.getItem('theme')) === 'light' ? '2px solid #000 ' : ''}`
                                }}>{elem.name}</span></a>
                        )) : null}
                    </div>
                    <MovieGrid category={category} />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Catalog;
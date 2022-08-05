import React from "react";

import { useParams } from "react-router-dom";

import { category as categ } from '../api/tmdbApi';
import MovieGrid from "../components/movieGrid/MovieGrid";
import PageHeader from '../components/pageHeader/PageHeader';

const Catalog = () => {

    const { category } = useParams();

    return (
        <>
            <PageHeader>
                {category === categ.movie ? 'Movies' : 'TV Series'}
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category={category} />
                </div>
            </div>
        </>
    );
}

export default Catalog;
import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

const CastList = props => {

    const { category } = useParams();

    const [casts, setCasts] = useState([]);

    useEffect(() => {
        const getCast = async () => {
            const responce = await tmdbApi.credits(category, props.id);
            setCasts(responce.cast.slice(0, 5));
        }
        getCast();
    }, [category, props.id]);

    return (
        <div className='casts'>
            {
                casts.map((element, index) => (
                    <div key={index} className="casts__item">
                        <div className="casts__item__img" style={{ backgroundImage: `url(${apiConfig.w500Image(element.profile_path)})` }}></div>
                        <p className='casts__item__name'>{element.name}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default CastList
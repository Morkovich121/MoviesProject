import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { useParams } from 'react-router-dom'

import tmdbApi from '../../api/tmdbApi';

const VideoList = props => {

    const { category } = useParams();

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            const res = await tmdbApi.getVideos(category, props.id);
            setVideos(res.results.slice(0, 5));
        }
        getVideos();
    }, [category, props.id]);

    return (
        <>
            {
                videos.map((item, i) => (
                    <Video key={i} item={item} />
                ))
            }
        </>
    )
}

const Video = props => {

    const element = props.item;

    const iframeRef = useRef(null);

    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
        iframeRef.current.setAttribute('height', height);
    }, []);

    return (
        <div className="video">
            <div className="video__title">
                <h2>{element.name}</h2>
            </div>
            <iframe
                src={`https://www.youtube.com/embed/${element.key}`}
                ref={iframeRef}
                width='100%'
                title='video'
            ></iframe>
        </div>
    )
}

VideoList.propTypes = {
    id: PropTypes.number,
}

Video.propTypes = {
    item: PropTypes.shape({
        key: PropTypes.string,
        name: PropTypes.string,
    })
}

export default VideoList
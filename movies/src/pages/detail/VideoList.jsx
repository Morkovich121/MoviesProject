import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { useParams } from 'react-router-dom'

import tmdbApi from '../../api/tmdbApi';

const VideoList = props => {

    const { category } = useParams();

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            let res = await tmdbApi.getVideosWithLanguage(category, props.id);
            if (res.results.length !== 0) {
                setVideos(res.results.filter((item) => item.type === "Trailer").slice(0, 5));
            }
            else {
                const resEnglish = await tmdbApi.getVideos(category, props.id);
                setVideos(resEnglish.results.filter((item) => item.type === "Trailer").slice(0, 5));
            }
        }
        getVideos();
    }, [category, props.id]);

    return (
        <>
            {
                videos.map((item, i) => {
                    return i === 0 ?
                        <Video key={i} item={item} />
                        : null
                })
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
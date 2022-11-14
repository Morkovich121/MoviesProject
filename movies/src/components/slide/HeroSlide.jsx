import { React, useState, useRef, useEffect } from 'react'

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'

import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import translations from '../../config/translations';
import Modal, { ModalContent } from '../modal/Modal';
import Button, { OutlineButton } from '../button/Button'

import './hero-slide.scss';

const HeroSlide = () => {

    SwiperCore.use([Autoplay]);

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 }
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, { params });
                setMovieItems(response.results);
            } catch {
                console.log('error');
            }
        }
        getMovies();
    }, []);

    return (
        <div className="hero-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
            //  autoplay={{ delay: 3000 }}
            >
                {
                    movieItems.map((element, i) => (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (
                                <HeroSlideElement item={element} className={`${isActive ? 'active' : ''}`} />
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {
                movieItems.map((item, i) => <TrailerModal key={i} item={item} />)
            }
        </div>
    );
}

const HeroSlideElement = props => {
    const pageText = localStorage.getItem('language') === 'uk' ? Object.values(translations['HeroSlide']) : Object.keys(translations['HeroSlide']);

    let history = useNavigate();

    const elem = props.item;

    const bg = apiConfig.originalImage(elem.backdrop_path ? elem.backdrop_path : elem.poster_path);

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${elem.id}`);

        const videos = await tmdbApi.getVideos(category.movie, elem.id);

        if (videos.results.length > 0) {
            const videSrc = 'https://www.youtube.com/embed/' + videos.results.filter((item) => item.type === "Trailer")[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', videSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer';
        }

        modal.classList.toggle('active');
    }

    return (
        <div
            className={`hero-slide__element ${props.className}`}
            style={{ backgroundImage: `url(${bg})` }}
        >
            <div className="hero-slide__element__content container">
                <div className="hero-slide__element__content__info">
                    <div className='title'>{elem.title}</div>
                    <div className='overview'>{elem.overview}</div>
                    <div className="btns">
                        <Button onClick={() => {
                            history('/movie/' + elem.id);
                            window.location.reload();
                        }}>
                            {pageText[0]}
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            {pageText[1]}
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__element__content__poster">
                    <img src={apiConfig.w500Image(elem.poster_path)} alt="" />
                </div>
            </div>
        </div>
    )
}

const TrailerModal = props => {
    const item = props.item;
    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    )
}

HeroSlideElement.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number,
        poster_path: PropTypes.string,
        backdrop_path: PropTypes.string,
        title: PropTypes.string,
        overview: PropTypes.string
    }),
}

TrailerModal.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number,
    })
}


export default HeroSlide    
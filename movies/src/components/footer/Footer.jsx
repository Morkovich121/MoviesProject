import { React } from "react";

import './footer.scss';

import bg from '../../assets/footer-bg.jpg';

import Logo from '../logo/Logo';

const Footer = () => {
    return (
        <div className="footer" style={{backgroundImage: `url(${bg})`}}>
            <div className="footer__content container">
                <div className="footer__content__logo">
                    <Logo/>
                </div>
                <div className="footer__content__links">
                    <div className="footer__content__link">
                        <a to="/">Home</a>
                        <a to="/">Contact us</a>
                        <a href="/">Term of services</a>
                        <a href="/">About us</a>
                    </div>
                    <div className="footer__content__link">
                        <a href="/">Live</a>
                        <a href="/">FAQ</a>
                        <a href="/">Premium</a>
                        <a href="/">Privacy policy</a>
                    </div>
                    <div className="footer__content__link">
                        <a href="/">You must watch</a>
                        <a href="/">Recent release</a>
                        <a href="/">Top IMDB</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
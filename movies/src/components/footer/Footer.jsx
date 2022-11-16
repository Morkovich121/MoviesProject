import { React } from "react";
import { Link } from 'react-router-dom'

import './footer.scss';

import bg from '../../assets/footer-bg.jpg';

import Logo from '../logo/Logo';
import translations from "../../config/translations";

const Footer = () => {

    const pageText = Object.values(translations[localStorage.getItem('language')]['Footer'])

    return (
        <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
            <div className="footer__content container">
                <div className="footer__content__logo">
                    <Logo />
                </div>
                <div className="footer__content__links">
                    <div className="footer__content__link">
                        <Link to="/">{pageText[0]}</Link>
                        <Link to="/">{pageText[1]}</Link>
                        <Link to="/">{pageText[2]}</Link>
                        <Link to="/">{pageText[3]}</Link>
                    </div>
                    <div className="footer__content__link">
                        <Link to="/">{pageText[4]}</Link>
                        <Link to="/">{pageText[5]}</Link>
                        <Link to="/">{pageText[6]}</Link>
                        <Link to="/">{pageText[7]}</Link>
                    </div>
                    <div className="footer__content__link">
                        <Link to="/">{pageText[8]}</Link>
                        <Link to="/">{pageText[9]}</Link>
                        <Link to="/">{pageText[10]}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
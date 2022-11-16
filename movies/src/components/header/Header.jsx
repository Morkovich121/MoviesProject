import { React, useEffect, useRef, useCallback } from "react";
import { useLocation } from 'react-router-dom';

import Logo from '../logo/Logo';
import darkTheme from '../../assets/darkTheme.png';
import lightTheme from '../../assets/lightTheme.png';
import ukr from '../../assets/ukr.png';
import eng from '../../assets/eng.png';

import translations from "../../config/translations";
import profileImg from "../../assets/profileImg.png";

import './header.scss';

const pageText = Object.values(translations[localStorage.getItem('language')]['Header']);

const headerNav = [
    {
        display: pageText[0],
        path: '/'
    },
    {
        display: pageText[1],
        path: '/movie'
    },
    {
        display: pageText[2],
        path: '/tv'
    },
    {
        display: pageText[3],
        path: '/authorization'
    },
]

const Header = () => {

    const pathname = useLocation();
    const headerRef = useRef(null);
    const account = JSON.parse(localStorage.getItem('activeAccount'));
    const profileLink = "/profile/" + (account.id);
    const active = headerNav.findIndex(e => e.path === pathname.pathname);

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
                headerRef.current.classList.add('shrink');
                if (JSON.parse(localStorage.getItem('theme')) === 'light') headerRef.current.style.backgroundColor = "#fff";
            } else {
                headerRef.current.classList.remove('shrink');
                if (JSON.parse(localStorage.getItem('theme')) === 'light') headerRef.current.style.backgroundColor = "transparent";
            }
        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);

    const ChangeTheme = useCallback(() => {
        if (JSON.parse(localStorage.getItem('theme')) === 'dark') {
            localStorage.setItem('theme', JSON.stringify('light'));
        }
        else {
            localStorage.setItem('theme', JSON.stringify('dark'));
        }
        window.location.reload();
    }, [])

    const ChangeLanguage = useCallback(() => {
        if (localStorage.getItem('language') === 'uk') {
            localStorage.setItem('language', 'en');
        }
        else {
            localStorage.setItem('language', 'uk');
        }
        window.location.reload();
    }, [])

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="header__options">
                    <Logo />
                    <img className="header__options-theme" src={JSON.parse(localStorage.getItem('theme')) === 'dark' ? darkTheme : lightTheme}
                        alt="" onClick={ChangeTheme} />
                    <img className="header__options-language" alt="No language" src={(localStorage.getItem('language')) === 'uk' ? ukr : eng}
                        onClick={ChangeLanguage} />
                </div>
                <ul className="header__nav">
                    {
                        headerNav.map((element, index) => (
                            <li key={index} className={`${index === active ? 'active' : ''}`} style={{ fontSize: `${index > 2 ? "1.5rem" : '1.3rem'}` }} >
                                {index > 2 && Object.keys(account).length > 0 ?
                                    <a href={profileLink}>
                                        <img src={account.image}
                                            onError={() => { account.image = profileImg; localStorage.setItem('activeAccount', JSON.stringify(account)) }}
                                            alt="No logo" className="accountLogo"></img>
                                    </a>
                                    :
                                    <a href={element.path}>
                                        {element.display}
                                    </a>
                                }
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div >
    );
}

export default Header;
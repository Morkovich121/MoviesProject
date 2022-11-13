import { React, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';

import Logo from '../logo/Logo';
import darkTheme from '../../assets/darkTheme.png';
import lightTheme from '../../assets/lightTheme.png';

import './header.scss';

const links = {
    en: ['Home', 'Movies', 'TV Series', 'Sign In'],
    ru: ['Главная', "Фильмы", "Сериалы", "Авторизоваться"]
}

const headerNav = [
    {
        display: links.en[0],
        path: '/'
    },
    {
        display: links.en[1],
        path: '/movie'
    },
    {
        display: links.en[2],
        path: '/tv'
    },
    {
        display: links.en[3],
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

    const ChangeTheme = () => {
        if (JSON.parse(localStorage.getItem('theme')) === 'dark') {
            localStorage.setItem('theme', JSON.stringify('light'));
        }
        else {
            localStorage.setItem('theme', JSON.stringify('dark'));
        }
        window.location.reload();
    }

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="header__options">
                    <Logo />
                    <img className="header__options-theme" src={JSON.parse(localStorage.getItem('theme')) === 'dark' ? darkTheme : lightTheme}
                        alt="" onClick={ChangeTheme} />
                    <span className="header__options-language">lang</span>
                </div>
                <ul className="header__nav">
                    {
                        headerNav.map((element, index) => (
                            <li key={index} className={`${index === active ? 'active' : ''}`} style={{ fontSize: `${index > 2 ? "1.5rem" : '1.3rem'}` }} >
                                {index > 2 && Object.keys(account).length > 0 ?
                                    <a href={profileLink}>
                                        <img src={account.image} alt="No logo" className="accountLogo"></img>
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
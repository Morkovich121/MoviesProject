import { React, useEffect, useRef } from "react";

import { useLocation } from 'react-router-dom';
import './header.scss';
import Logo from  '../logo/Logo';

const headerNav = [
    {
        display: 'Home',
        path: '/'
    },
    {
        display: 'Movies',
        path: '/movie'
    },
    {
        display: 'TV Series',
        path: '/tv'
    },
]

const Header = () => {

    const { pathname } = useLocation();
    const headerRef = useRef(null);

    const active = headerNav.findIndex(e => e.path === pathname);

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <Logo/>
                <ul className="header__nav">
                    {
                        headerNav.map((element, index) => (
                            <li key={index} className={`${index === active ? 'active' : ''}`}>
                                <a href={element.path}>{element.display}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Header;
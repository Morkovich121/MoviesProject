import React from 'react'

import logo from '../../assets/tmovie.png';
import './logo.scss';

const Logo = () => {
    return (
        <div className="logo">
            <img src={logo} alt="" />
            <a href="/">tMovies</a>
        </div>
    )
}

export default Logo
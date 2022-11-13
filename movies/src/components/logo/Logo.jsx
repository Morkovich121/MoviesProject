import React from 'react'

import logo from '../../assets/logo.png';
import './logo.scss';

const Logo = () => {
    return (
        <div className="logo">
            <img src={logo} alt="" />
            <a href="/">MyMovies</a>
        </div>
    )
}

export default Logo
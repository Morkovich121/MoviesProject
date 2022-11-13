import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import Authorization from '../pages/authorization/Authorization';
import Profile from '../pages/profile/Profile';

const Routing = () => {
    return (
        <Routes>
            <Route
                path='/authorization'
                element={Authorization}
            />
            <Route
                path='/profile/:mail'
                element={Profile}
            />
            <Route
                path='/:category/search/:keyword'
                element={Catalog}
            />
            <Route
                path='/:category/:id'
                element={Detail}
            />
            <Route
                path='/:category'
                element={Catalog}
            />
            <Route
                path='/'
                exact
                element={Home}
            />
        </Routes>
    );
}

export default Routing;
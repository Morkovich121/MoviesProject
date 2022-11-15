import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './App.scss';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { ThemeConsumer } from "./theme-context";

import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Detail from './pages/detail/Detail';
import Authorization from './pages/authorization/Authorization';
import Profile from './pages/profile/Profile';



const App = () => {
  const renderMyComponent = theme => {
    return (
      <div className={`${theme === 'light' ? 'light-theme' : 'dark-theme'}`}>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/authorization'
              element={Object.keys(JSON.parse(localStorage.getItem('activeAccount'))).length === 0 ? <Authorization /> : <Navigate to="/" />}
            />
            <Route
              path='/profile/:id'
              element={<Profile />}
            />
            <Route
              path='/:category/search/:keyword'
              element={<Catalog />}
            />
            <Route
              path='/:category/genre/:id'
              element={<Catalog />}
            />
            <Route
              path='/:category/genre/:id/search/:keyword'
              element={<Catalog />}
            />
            <Route
              path='/:category/:id'
              element={<Detail />}
            />
            <Route
              path='/:category'
              element={<Catalog />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  };

  return <ThemeConsumer>{theme => renderMyComponent(theme)}</ThemeConsumer>;

}

export default App;

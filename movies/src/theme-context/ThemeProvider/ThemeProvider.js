import React from 'react';
import PropTypes from 'prop-types'

import { Provider } from '../context';
import { defaultTheme, themes } from '../constants';

const ThemeProvider = ({ theme, children }) => {
    return <Provider value={theme}>{children}</Provider>;
}

ThemeProvider.propTypes = {
    theme: PropTypes.oneOf(themes),
    children: PropTypes.node
};

ThemeProvider.defaultProps = {
    theme: defaultTheme
};

export { ThemeProvider };
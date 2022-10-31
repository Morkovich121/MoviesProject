import React from 'react';
import PropTypes from 'prop-types'

import './page-header.scss';

import bg from '../../assets/footer-bg.jpg';

const PageHeader = props => {
    return (
        <div className='page-header' style={{ background: `url(${bg})` }}>
            <h2>{props.children}</h2>
        </div>
    )
}

PageHeader.propTypes = {
    children: PropTypes.string
}

export default PageHeader
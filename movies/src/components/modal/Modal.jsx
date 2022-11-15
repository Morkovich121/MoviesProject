import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import './modal.scss';


const Modal = props => {

    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(props.active);
    }, [props.active])
    return (
        <div
            id={props.id}
            className={`modal ${active ? 'active' : ""}`}
        >
            {props.children}
        </div>
    )
}

export const ModalContent = props => {

    const contentRef = useRef(null);
    const closeModal = () => {
        contentRef.current.parentNode.classList.remove('active');
        if (props.onClose) props.onClose();
    }

    return (
        <div ref={contentRef} className="modal__content">
            {props.children}
            <div className="modal__content__close" onClick={closeModal}>
                <i className="bx bx-x"></i>
            </div>
        </div>
    )
}

Modal.propTypes = {
    active: PropTypes.bool,
    id: PropTypes.string,
    children: PropTypes.object
}

ModalContent.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.object,
}

export default Modal
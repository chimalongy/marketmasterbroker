// Modal.js
import React from 'react';
import '../styles/modal.css';

const Modal = ({ show, onClose, imageSrc }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <div className="modal-content">
                   
                    {imageSrc}
                </div>
            </div>
        </div>
    );
};

export default Modal;

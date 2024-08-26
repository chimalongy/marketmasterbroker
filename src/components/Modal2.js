// Modal.js
import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import "../styles/Modal2.css"

const Modal = ({ showModal, closeModal, children }) => {
  const animation = useSpring({
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0)` : `translateY(-100%)`,
  });

  return (
    <div className={`modal ${showModal ? 'show' : ''}`}>
      <animated.div style={animation} className="modal-content">
        <button onClick={closeModal} className="close-button">X</button>
        {children}
      </animated.div>
    </div>
  );
};

export default Modal;

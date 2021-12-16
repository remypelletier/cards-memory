import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

const Modal = (props) => {
    
    const { openState, title, description, children } = props;
    const [ isOpen, setIsOpen ] = openState;
    
    const [ el, setEl ] = useState(document.createElement('div'));
    
    useEffect(() => {
        modalRoot.appendChild(el);
        
        return () => {
            modalRoot.removeChild(el);
        }
    }, []);

    const renderChildren = () => {
        if (isOpen) {
            return <div className="z-10 fixed inset-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-10 -z-10"></div>
                <div className="relative w-1/2 p-2 rounded-xl shadow-md bg-white p-4">
                    <h3 className="text-2xl font-bold">{title}</h3>
                    <p className="pt-1 text-gray-600">{description}</p>
                    {children}
                </div>
            </div>
        }
    }
    
    return ReactDOM.createPortal(
        renderChildren(),
        el
    )
}
    
export default Modal;

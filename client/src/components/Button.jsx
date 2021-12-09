import React from "react";

const Button = (props) => {

    const { children, className, onClick: handleClick, type, name } = props;

    const types = [
        {
            warning: 'bg-red-600'
        }
    ];

    const chosenType = types.find(element => element[type]);
    const bgColor = chosenType === undefined ? 'bg-indigo-600' : chosenType[type];
    
    return (    
        <button onClick={handleClick} name={name} className={`p-2 px-8 text-white rounded-md ${bgColor} ${className}`}>
            { children }
        </button>
    );
}

export default Button;
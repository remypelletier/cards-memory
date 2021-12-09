import React from 'react';
    
const Layout = (props) => {
    return (
        <div className="flex flex-col h-full min-h-screen w-full pt-16 bg-gray-100">
            {props.children}
        </div>
    )
}

export default Layout;

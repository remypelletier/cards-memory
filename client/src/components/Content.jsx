import React from "react";

const Content = (props) => {

    const { children } = props;

    return (
        <main className="mx-auto w-full max-w-screen-xl h-full flex-grow pt-16 pb-24 px-4">
            {children}
        </main>
    )
}

export default Content;

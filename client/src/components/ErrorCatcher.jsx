import React from "react";
import Button from "./Button";

const ErrorCatcher = (props) => {

    const { error, children } = props;

    return (
        error ? (
        <div className="text-center">
            <img className="m-auto" src="/img/error.png" alt="" />
            <h2 className="text-4xl font-semibold mb-2">{`Oops, an error ${error.status} has occurred`}</h2>
            <p className="text-xl text-gray-600 mb-4">Please, refresh your browser or try later</p>
            <Button>Come back Home</Button>
        </div>
        ) : children
    )
}

export default ErrorCatcher;

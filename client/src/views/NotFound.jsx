import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const NotFound = () => {
    return (
        <div className="text-center">
            <img className="m-auto" src="/img/error.png" alt="Error illustration" />
            <h2 className="text-4xl font-semibold mb-2">{`Oops, an error 404 has occurred`}</h2>
            <p className="text-xl text-gray-600 mb-4">Please, refresh your browser or try later</p>
            <Link to="/"><Button>Come back Home</Button></Link> 
        </div>
    )
}

export default NotFound;

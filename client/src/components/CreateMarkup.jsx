import React from 'react';

const CreateMarkup = (props) => {

    const { children } = props;

    return <div className="markup" dangerouslySetInnerHTML={{__html: children}}></div>
}

export default CreateMarkup;

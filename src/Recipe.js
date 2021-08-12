import React from 'react';

const Recipe = ({title, description, image}) => {
    return(
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
            <img src={image} alt="" />
        </div>
    );
}

export default Recipe
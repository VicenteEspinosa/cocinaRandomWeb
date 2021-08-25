import React from 'react';
import style from './RandomRecipe.module.css';
import { Link } from 'react-router-dom';


const DisplayRandom = (recipe) => {

    return(
        <div className={style.app}>
             <Link style={{ textDecoration: 'none' }} to={`/receta/${recipe.recipe.id}`}>
            <h1 className={style.name}>{recipe.recipe.name}</h1>
            <img className={style.image} src={recipe.recipe.image} alt="" />
            </Link>
        </div>
    );
};

export default DisplayRandom;
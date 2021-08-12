import React from 'react';
import style from './recipe.module.css';

const Recipe = ({title, description, image, ingredients, categories, links}) => {

    return(
        <div className={style.recipe}>
            <h1>{title}</h1>
            <p>{description}</p>
            <img className={style.image} src={image} alt="" />
            <ol className="ingredient-container">
                {ingredients.map(ingredient => (
                    <li key={ingredient.id}>{ingredient.name}</li>
                ))}
            </ol>
            <ol className="category-container">
                {categories.map(category => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ol>
            <ol className="link-container">
                {links.map(link => (
                    <a key={link} href={link}>{link}</a>
                ))}
            </ol>
        </div>
    );
};

export default Recipe
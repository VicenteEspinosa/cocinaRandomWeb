import React from 'react';
import style from '../recipe.module.css';
import { Link } from 'react-router-dom';

const Recipe = ({id, title, description, image, ingredients, categories, links}) => {

    return(
        <div className={style.recipe}>
            <Link style={{ textDecoration: 'none' }} to={`/receta/${id}`}>
            <h1 className={style.title}>{title}</h1>
            <img className={style.image} src={image} alt="" />
            </Link>
            <p className={style.ingredientsTitle}>Ingredientes:</p>
            <ol className={style.ingredient}>
                {ingredients.map(ingredient => (
                    <li key={ingredient.id}>{ingredient.name}</li>
                ))}
            </ol>
            <ol className="category-container">
                {categories.map(category => (
                    <li className={style.category} style={{background: category.color}} key={category.id}>{category.name}</li>
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
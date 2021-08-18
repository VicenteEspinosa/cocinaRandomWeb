import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import '../App.css';
import style from '../oneRecipe.module.css';
import * as ReactBootStrap from 'react-bootstrap';

const OneRecipe = ({ match }) => {

    const [loading, setLoading] = useState(false);

    const URL = "https://cocina-random-backend.herokuapp.com";
    // const URL = "http://127.0.0.1:8000"


    useEffect(() => {
        fetchRecipe();
    }, []);

    const [recipe, setRecipe] = useState({links:[], categories:[], ingredients:[]})


    const fetchRecipe = async () => {
        const fetchItem = await fetch(`${URL}/recipe/${match.params.id}`);
        const item = await fetchItem.json();
        setRecipe(item)
        setLoading(true)
    }

    return(
        <div className={style.general}>
            {loading ? (null): (
            <ReactBootStrap.Spinner className={style.spinner} animation="border" />
            )}
            <ol className={style.orderRecipe}>
                <div className={style.column}>
                    <img className={style.image} src={recipe.image} alt="" />
                    <ol className={style.categories}>
                        {recipe.categories.map(category=>(
                            <li className={style.category} style={{background: category.color}} key={category.id}>{category.name}</li>
                        ))}
                    </ol>
                </div>
                <div className={style.column}>
                    <h1>{recipe.name}</h1>
                    <p>{recipe.description}</p>
                    <ul className={style.ingrdients}>
                        {recipe.ingredients.map(ingredient=>(
                        <li key={ingredient.id}>{ingredient.name}</li>
                        ))}
                    </ul>
                    {recipe.links.map(link=>(
                    <a key={link} href={link}>{link}</a>
                    ))}
                </div>
            </ol>
        </div>
    );
}

export default OneRecipe;
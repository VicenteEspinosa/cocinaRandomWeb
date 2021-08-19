import React, {useEffect, useState} from 'react';
import style from './RandomRecipe.module.css';
import DisplayRandom from './DisplayRandom';
import * as ReactBootStrap from 'react-bootstrap';



const RandomRecipe = () => {

    const [recipe, setRecipe] = useState({});
    const [lastId, setlastId] = useState(0);
    const [loading, setLoading] = useState(true);



    const URL = "https://cocina-random-backend.herokuapp.com";
    // const URL = "http://127.0.0.1:8000"

    useEffect(() => {
        fetchRecipe();
    }, []);

    const fetchRecipe = async () => {
        setLoading(false)
        const fetchItem = await fetch(`${URL}/recipe_random/?last=${lastId}`);
        setLoading(true)
        const item = await fetchItem.json();
        setRecipe(item)
        setlastId(item.id)
    }


    return(
        <div className={style.app}>
                  {loading ? (
                      <DisplayRandom
                      key={recipe.id}
                      recipe={recipe}
                  />
                  ): (
        <ReactBootStrap.Spinner className={style.spinner} animation="border" />
      )}
            <div className={style.container}>
                <div className={style.verticalcenter}>
                    <button className={style.button} onClick={fetchRecipe}> Escoger otra!</button>
                </div>
            </div>
        </div>
    );
};

export default RandomRecipe;
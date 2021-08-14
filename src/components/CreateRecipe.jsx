import React, {useEffect, useState} from 'react';
import '../App.css';
import style from '../createRecipe.module.css';
import Creatable from 'react-select/creatable';

const CreateRecipe = () => {
    
    const URL = "https://cocina-random-backend.herokuapp.com";

    const getCategories = async () => {
        const categories_response = await fetch(`${URL}/categories`);
        const categories_data = await categories_response.json();
        setCategories(categories_data);
    };

    const getIngredients = async () => {
        const ingredients_response = await fetch(`${URL}/ingredients`);
        const ingredients_data = await ingredients_response.json();
        setIngredients(ingredients_data);
    };

    // var setCategoriesQ = (selected) => {
    //     var categories = [];
    //     {selected.map(category=>(
    //         categories.push(category.value)
    //     ))}
    //     setQueryCategories(categories);
    //     }

    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    // const [query_categories, setQueryCategories] = useState([]);

    useEffect(() => {
        getCategories();
        getIngredients();
        }, [])

    const HandleChange= (field, value) => {
        switch(field) {
            case 'categories':
                setSelectedCategories(value)
                break
            case 'ingredients':
                setSelectedIngredients(value)
                break
            default:
                break
        }
    }

  return(
    
    <form className={style.Form}>
        <fieldset>
            <label className={style.label}>
                <p>Nombre de la receta</p>
                <input className={style.input} placeholder="Nombre" name="name"></input>
            </label>

            <label className={style.label}>
                <p>Descripción/Comentarios de la receta</p>
                <textarea className={style.inputDescripcion} type="textarea" placeholder="Descripción" name="description"></textarea>
            </label>

            <label className={style.label}>
                <p>Link</p>
                <input className={style.input} placeholder="Link" name="link"></input>
            </label>

            <label className={style.label}>
                <p>Ingediente/s</p>
                <Creatable
                    isClearable={true}
                    isMulti={true}
                    components={
                        {DropdownIndicator: null}
                    }
                    onChange={(value) => HandleChange('ingredients', value)}
                    options={ingredients}
                    value={selectedIngredients}

                />
            </label>

            <label className={style.label}>
                <p>Categoría/s</p>
                <Creatable
                    isClearable={false}
                    isMulti={true}
                    components={
                        {DropdownIndicator: null}
                    }
                    onChange={(value) => HandleChange('categories', value)}
                    options={categories}
                    value={selectedCategories}

                />

                
            </label>

        </fieldset>
    </form>

  );
}

export default CreateRecipe;

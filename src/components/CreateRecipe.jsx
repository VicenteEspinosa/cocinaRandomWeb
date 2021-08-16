import React, {useEffect, useState, useRef} from 'react';
import '../App.css';
import style from '../createRecipe.module.css';
import Select from 'react-select/';
import Creatable from 'react-select/creatable';
import { Redirect } from "react-router-dom";

const CreateRecipe = () => {

    const URL = "https://cocina-random-backend.herokuapp.com";
    // const URL = "http://127.0.0.1:8000"

    
    const [postId, setPostId] = useState(null);
    const [postData, setPostData] = useState(null);
    
    // Valores formulario
    const [query_name, updateName] = useState("");
    const [query_description, updateDescription] = useState("");
    const [query_link, updateLink] = useState("");
    const [query_picture, updatePicture] = useState("");

    // Valores extra para el POST
    const [query_categories, setQueryCategories] = useState([]);
    const [query_ingredients, setQueryIngredients] = useState([]);
    const [query_new, setQueryNew] = useState([]);
    
    // Actualizar valores formulario
    const setQueryName = e => {
        updateName(e.target.value);
    };
    const setQueryDescription = e => {
        updateDescription(e.target.value);
    };
    const setQueryLink = e => {
        updateLink(e.target.value);
    };
    const setQueryPicture = e => {
        updatePicture(e.target.value);
    };

    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);



    useEffect(() => {
        setCategoriesQ(selectedCategories);
    }, [selectedCategories])

    useEffect(() => {
        setIngredientsQ(selectedIngredients);
    }, [selectedIngredients])
    
    
    
    const postRecipe = e => {
        e.preventDefault();
        setPostData(
            {
                "name": query_name,
                "description": query_description,
                "categories": query_categories,
                "image": query_picture,
                "ingredients": query_ingredients,
                "links": [query_link],
                "new": query_new
            })
        }
        
        
        const firstUpdate = useRef(true);

        // useEffect que no se corre en el renderizado
        useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        };
        fetch((`${URL}/recipes/`), requestOptions)
            .then(response => response.json())
            .then(data => setPostId(data.id))
            .then(window.location.reload());
    }, [postData]);

    

    const getCategories = async () => {
        const categories_response = await fetch(`${URL}/categories/`);
        const categories_data = await categories_response.json();
        setCategories(categories_data);
    };

    const getIngredients = async () => {
        const ingredients_response = await fetch(`${URL}/ingredients/`);
        const ingredients_data = await ingredients_response.json();
        setIngredients(ingredients_data);
    };

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          borderBottom: '1px dotted pink',
          color: state.isSelected ? 'red' : 'blue',
          padding: 20,
        }),}

    var setCategoriesQ = (selected) => {
        var categories = [];
        {selected.map(category=>(
            categories.push(category.value)
        ))}
        setQueryCategories(categories);
    };

    var setIngredientsQ = (selected) => {
        var ingredients = [];
        var new_ingredients = [];
        var index = 0;
        while (index < selected.length){
            if (selected[index].__isNew__){
                new_ingredients.push(selected[index].value);
            }
            else {
                ingredients.push(selected[index].value);
            }
            index++;
        }
        setQueryIngredients(ingredients);
        setQueryNew(new_ingredients);
    };

    const [categories, setCategories] = useState([]); // Data del dropdown
    const [ingredients, setIngredients] = useState([]); // Data del dropdown

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
                <input className={style.input} placeholder="*Nombre*" name="name" value={query_name} onChange={setQueryName}></input>
            </label>

            <label className={style.label}>
                <p>Descripción/Comentarios de la receta</p>
                <textarea className={style.inputDescripcion} type="textarea" placeholder="*Descripción*" name="description" value={query_description} onChange={setQueryDescription}></textarea>
            </label>

            <label className={style.label}>
                <p>Link foto</p>
                <input className={style.input} placeholder="*Foto*" name="picture" value={query_picture} onChange={setQueryPicture}></input>
            </label>

            <label className={style.label}>
                <p>Link extra</p>
                <input className={style.input} placeholder="Link" name="link" value={query_link} onChange={setQueryLink}></input>
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
                <Select
                    isClearable={true}
                    isMulti={true}
                    components={
                        {DropdownIndicator: null}
                    }
                    onChange={(value) => HandleChange('categories', value)}
                    options={categories}
                    value={selectedCategories}
                    styles={customStyles}
                />
            </label>

            <label className={style.label}>
            <div className={style.buttonHolder}>
                <button onClick={postRecipe} className={style.button} type="submit">Crear</button>
            </div>
            </label>
        </fieldset>
    </form>

  );
}

export default CreateRecipe;

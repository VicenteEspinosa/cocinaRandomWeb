import React, {useEffect, useState, useRef} from 'react';
import '../../App.css';
import style from './createRecipe.module.css';
import Select from 'react-select/';
import Creatable from 'react-select/creatable';
import { useHistory } from 'react-router';

const CreateRecipe = () => {

    const URL = "https://cocina-random-backend.herokuapp.com";
    //const URL = "http://127.0.0.1:8000"

    let history = useHistory();
    
    // const [postId, setPostId] = useState(null);
    const [postData, setPostData] = useState({"name": "", "description": "", "file": null});

    const [newId, setNewId] = useState(null);

    
    // Valores formulario
    const [query_name, updateName] = useState("");
    const [query_description, updateDescription] = useState("");
    const [query_link, updateLink] = useState("");
    const [file, setFile] = useState(null);

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

    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);



    useEffect(() => {
        setCategoriesQ(selectedCategories);
    }, [selectedCategories])


    const firstUpdate2 = useRef(true);

    useEffect(() => {
        if (firstUpdate2.current) {
            firstUpdate2.current = false;
            return;
        }
        if (newId != null) {
            history.push(`/receta/${newId}`)
        }
        return
    }, [newId]);

    useEffect(() => {
        setIngredientsQ(selectedIngredients);
    }, [selectedIngredients])
    
    const onFileChange = async (e) => {
        const file_original = e.target.files[0];
        if (file_original != undefined) {
            const file_base64 = await convertBase64(file_original);
            setFile(file_base64);
        }
        else {
            setFile(null);
        }
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    
    const postRecipe = e => {
        e.preventDefault();
        setPostData(
            {
                "name": query_name,
                "description": query_description,
                "categories": query_categories,
                "image": "https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e.jpg",
                "ingredients": query_ingredients,
                "links": [query_link],
                "new": query_new,
                "file": file
            })
        }
        
        
        const firstUpdate = useRef(true);

        // useEffect que no se corre en el renderizado
        useEffect(() => {
            if (firstUpdate.current) {
                firstUpdate.current = false;
                return;
            }
            if (postData["name"] != "" && postData["description"] != "" && postData["file"] != null){
                sendRecipeData()
            }
            else {
                alert("Debes rellenar el nombre, descripcion y subir una foto como minimo!")
            }
        }, [postData]);

        const sendRecipeData = async () => {
            const settings = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData)
            };
            try {
                const fetchResponse = await fetch(`${URL}/recipes/`, settings);
                const data = await fetchResponse.json();
                if (fetchResponse.status < 400) {
                    setNewId(data.id);
                }
                return data;
            } catch (e) {
                return e;
            }
        }

    

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
                <p>Subir Foto</p>
                <input type="file" accept="image/png, image/gif, image/jpeg" onChange={(e) => {onFileChange(e)}}></input>
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

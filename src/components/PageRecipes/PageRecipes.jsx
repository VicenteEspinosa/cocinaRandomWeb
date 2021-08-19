import React from 'react';
import Recipe from './Recipe';
import '../../App.css';


const PageRecipe = (recipes) => {

    

    return (
        <div className="recipes">
        {recipes.recipes.map(recipe=>(
            <Recipe
                key={recipe.id}
                id={recipe.id}
                title={recipe.name}
                description={recipe.description}
                image={recipe.image}
                ingredients={recipe.ingredients}
                categories={recipe.categories}
                links={recipe.links}
            />
      ))}
        </div>
    );
}

export default PageRecipe;
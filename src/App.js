import React from 'react';
import DisplayRecipes from './components/DisplayRecipes';
import CreateRecipe from './components/CreateRecipe'
import OneRecipe from './components/OneRecipe'
import RandomRecipe from './components/RandomRecipe'
import Nav from './components/Nav'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {

  return(
    <Router>
      <Nav/>
    <Route path="/" exact component={DisplayRecipes} />
    <Route path="/receta" exact component={CreateRecipe} />
    <Route path="/receta/:id" component={OneRecipe} />
    <Route path="/aleatoria" component={RandomRecipe} />
    
    </Router>

  );
}

export default App;

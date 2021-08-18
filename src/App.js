import React from 'react';
import DisplayRecipes from './components/DisplayRecipes';
import CreateRecipe from './components/CreateRecipe'
import OneRecipe from './components/OneRecipe'
import Nav from './components/Nav'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {

  return(
    <Router>
      <Nav/>
    <Route path="/" exact component={DisplayRecipes} />
    <Route path="/receta" exact component={CreateRecipe} />
    <Route path="/receta/:id" component={OneRecipe} />
    
    </Router>

  );
}

export default App;
